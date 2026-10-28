-- =====================================================================
-- Leaderboard security hardening (Sonar Dive + Curio)
-- =====================================================================
-- Run ONCE in Supabase → SQL Editor, AFTER the site update that ships with
-- this file is live (the new Sonar Dive page reads the board through
-- sonar_board(); the old page would lose its leaderboard once player IDs
-- are hidden below).
--
-- What it does — all safe to re-run:
--   1. Visitors (the public "anon" key) can only ADD rows — never edit or
--      delete anyone's score, name, find, or report.
--   2. Rejects impossible data: scores above the game's maximum, overlong
--      names/notes, posts for days that aren't today.
--   3. Hides every player's ID from the public Sonar Dive board, so one
--      player can't post or rename as another.
-- It does NOT drop or rewrite your existing policies or data. Constraints
-- are added NOT VALID, so existing rows are left alone and only new posts
-- are checked.
-- =====================================================================

begin;

-- ---------- 1. Insert-only for the public key ----------
-- Removing the UPDATE/DELETE rights blocks edits no matter what policies say.
-- (Row-level security is NOT switched on here: on a table without an insert
-- policy that would block every new post. Instead you get a warning below.)
do $$
declare t text;
begin
  foreach t in array array['sonar_scores','curio_finds','curio_reports'] loop
    if to_regclass('public.' || t) is not null then
      execute format('revoke update, delete, truncate on public.%I from anon, authenticated', t);
      if not (select relrowsecurity from pg_class where oid = ('public.' || t)::regclass) then
        raise warning 'Row level security is OFF on %. Turn it on in Table Editor and add an INSERT policy for anon.', t;
      end if;
    end if;
  end loop;
end $$;

-- ---------- 2. Sonar Dive: reject impossible scores ----------
-- A daily dive is 7 prompts worth at most 100 points each = 700.
do $$
begin
  if to_regclass('public.sonar_scores') is not null then
    if not exists (select 1 from pg_constraint where conname = 'sonar_scores_score_range') then
      alter table public.sonar_scores
        add constraint sonar_scores_score_range check (score >= 0 and score <= 700) not valid;
    end if;
    if not exists (select 1 from pg_constraint where conname = 'sonar_scores_name_len') then
      alter table public.sonar_scores
        add constraint sonar_scores_name_len check (char_length(name) between 1 and 24) not valid;
    end if;
    if not exists (select 1 from pg_constraint where conname = 'sonar_scores_log_len') then
      alter table public.sonar_scores
        add constraint sonar_scores_log_len
        check (log is null or (jsonb_typeof(log::jsonb) = 'array' and jsonb_array_length(log::jsonb) <= 7)) not valid;
    end if;
  end if;
end $$;

-- Only today's dive (±1 day for time zones) can be posted.
create or replace function public.sonar_scores_guard() returns trigger
language plpgsql as $$
declare today int := floor(extract(epoch from (now() - timestamptz '2026-10-19 00:00:00+00')) / 86400)::int + 1;
begin
  if new.day < today - 1 or new.day > today + 1 then
    raise exception 'sonar_scores: day % is not today (%)', new.day, today;
  end if;
  return new;
end $$;

do $$
begin
  if to_regclass('public.sonar_scores') is not null then
    drop trigger if exists sonar_scores_guard on public.sonar_scores;
    create trigger sonar_scores_guard before insert on public.sonar_scores
      for each row execute function public.sonar_scores_guard();
  end if;
end $$;

-- ---------- 3. Sonar Dive: hide player IDs ----------
-- Public board without IDs; the caller only learns which row is theirs.
create or replace function public.sonar_board(d int, me text)
returns table (name text, score int, log jsonb, created_at timestamptz, is_me boolean)
language sql stable security definer set search_path = public as $$
  select s.name::text, s.score::int, s.log::jsonb, s.created_at, (s.player_id::text = me) as is_me
  from public.sonar_scores s
  where s.day = d
  order by s.score desc, s.created_at asc
  limit 200
$$;
revoke all on function public.sonar_board(int, text) from public;
grant execute on function public.sonar_board(int, text) to anon, authenticated;

-- The public key may still read the board columns, but not player_id.
do $$
begin
  if to_regclass('public.sonar_scores') is not null then
    revoke select on public.sonar_scores from anon, authenticated;
    grant select (day, name, score, log, created_at) on public.sonar_scores to anon, authenticated;
  end if;
end $$;

-- ---------- 4. Curio: bound what can be posted ----------
do $$
begin
  if to_regclass('public.curio_finds') is not null then
    if not exists (select 1 from pg_constraint where conname = 'curio_finds_bounds') then
      alter table public.curio_finds add constraint curio_finds_bounds check (
        slot between 0 and 9
        and char_length(answer_key) between 1 and 80
        and est_pts between 0 and 1000
      ) not valid;
    end if;
  end if;
  if to_regclass('public.curio_reports') is not null then
    if not exists (select 1 from pg_constraint where conname = 'curio_reports_bounds') then
      alter table public.curio_reports add constraint curio_reports_bounds check (
        (answer is null or char_length(answer) <= 80)
        and (note is null or char_length(note) <= 500)
        and (prompt is null or char_length(prompt) <= 300)
      ) not valid;
    end if;
  end if;
end $$;

commit;

-- ---------- Check it worked (optional) ----------
-- Should list only INSERT/SELECT-type grants for anon on these tables:
--   select table_name, privilege_type from information_schema.role_table_grants
--   where grantee = 'anon' and table_name in ('sonar_scores','curio_finds','curio_reports');
