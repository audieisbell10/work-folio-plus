import { useState, type FormEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { unlockGallery } from "../lib/client-gallery";

// Shown instead of a gallery until the visitor enters the gallery password.
export function GalleryLock() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong" | "not-set">("idle");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!password) return;
    setState("checking");
    try {
      const result = await unlockGallery({ data: password });
      if (result.ok) {
        setPassword("");
        await router.invalidate();
        return;
      }
      setState(result.reason);
    } catch {
      setState("wrong");
    }
  }

  return (
    <div className="mt-16 max-w-sm">
      <form onSubmit={submit} className="rounded-sm border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium">
          <Lock className="size-4" aria-hidden />
          This gallery is private
        </div>
        <label htmlFor="gallery-password" className="text-sm text-muted-foreground">
          Enter the password you were sent with your gallery link.
        </label>
        <input
          id="gallery-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={state === "checking" || !password}
          className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-70"
        >
          {state === "checking" ? "Checking…" : "Open gallery"}
        </button>
        <p role="status" className="mt-3 min-h-5 text-sm text-destructive">
          {state === "wrong" && "That password didn't work. Check the message you were sent."}
          {state === "not-set" && "Galleries aren't open yet. Please check back soon."}
        </p>
      </form>
    </div>
  );
}
