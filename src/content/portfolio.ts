// ================================================================
// PORTFOLIO CONTENT — EDIT THIS FILE TO UPDATE YOUR SITE
// ================================================================
// This is the single source of truth for every section of the site.
// Change names, copy, links, and image URLs here. Add or remove
// items in the arrays. The site rebuilds automatically.
//
// IMAGES: drop a photo file into the /public folder, then reference
// it here with a leading slash, e.g. portrait: "/portrait.jpg"
// Leave any image "" to show a soft placeholder instead.
// ----------------------------------------------------------------

export const site = {
  name: "Audie T. Isbell",
  role: "IMC Professional \u00b7 Writer \u00b7 Photographer",
  seoTitle: "Audie T. Isbell \u2014 Portfolio",
  seoDescription:
    "Marketing communications, writing, and photography by Audie T. Isbell \u2014 an AAF Gold Award\u2013winning IMC graduate based in Fort Worth, TX.",
};

export const intro = {
  eyebrow: "Portfolio",
  heading: "Works of Audie T. Isbell",
  body: [
    "I am a recent college graduate from Harding University. I have earned a bachelor's degree in IMC and am looking forward to starting my career here in DFW. I enjoy reading, writing, photography and constantly learning about the world.",
    "This site is an archive of past works, from academic assignments to passion projects. I enjoy keeping this digital space up to date and hope you enjoy.",
  ],
  // Add your photo to /public, then set this to "/portrait.jpg"
  portrait: "/portrait.jpg",
};

// ---------------- WRITINGS ----------------
// Each writing gets its own page at /writings/<slug>.
// `body` is an array of paragraphs.
export type Writing = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string[];
};

export const writings: Writing[] = [
  {
    slug: "ai-literacy-human-skills",
    title: "AI Literacy & the Skills AI Can't Replace",
    date: "May 2026",
    category: "Research",
    excerpt:
      "A survey of 28 communication students on how AI is reshaping their academic work — and which human skills they believe it can never replace. Grounded in Postman's Media Ecology.",
    body: [
      "Abstract",
      "As artificial intelligence becomes embedded in the academic lives of college students around the world, questions arise about what this integration is doing to the students who use it. This study is grounded in Neil Postman's Media Ecology framework, which frames AI not only as a tool but as a force reshaping how communication is practiced and learned. This study examines communication students' AI usage habits, perceptions of AI literacy needs, and identification of irreplaceable human skills. A self-administered quantitative survey was distributed to communication students at Harding University in Searcy, Arkansas, yielding a sample group of 28 respondents. Results indicate that the overwhelming majority of participants are active AI users, with at least 79% reporting at least occasional use for academic purposes. Of those, 28.6% reported a measurable reduction in their critical thinking ability, which is a pattern consistent with prior research on cognitive offloading. Empathy emerged as the most widely recognized irreplaceable human skill, selected by 85.7% of respondents, followed closely by relationship building and nonverbal communication at 78.6% each. Taking into account these findings, they suggest that AI integration is not merely reshaping academic efficiency but is actively altering how students understand their own value and personal identity as communicators.",
      "Introduction",
      "The farther that we journey down the rabbit hole of Generative AI progress, the more the need arises for the question: what is the role of humans in a world that is increasingly run by their own creation? This literature review aims to examine research surrounding AI literacy, student and worker perceptions of AI, the path of modern critical thinking, and the economic reality of the present-day workforce that today's communication students are about to enter. Taking all of these topics together, it raises two questions: Is there a relationship between communication students' views on human-only skills and the needs of AI education? And what specific aspects of communication remain irreplaceable by AI? These questions draw on Neil Postman's work in the communication theory of Media Ecology. This theory establishes that the arrival of AI, like television, is not merely a development in technology but is a fundamental shift in the media environment that is actively shaping the way that we perceive, use, and interact with information.",
      "Literature Review",
      "Theoretical Framework: Media Ecology and the AI Ecosystem",
      "Studies that aim to determine which communication skills AI cannot replace must first explain why this question has merit. Postman's (2000) framework regarding Media Ecology helps to provide that explanation. In his keynote speech to the Media Ecology Association convention in 2000, Postman defined media ecology as how media functions as an environment, and not solely as a tool that humans pick up and put down as needed, but as surroundings that influence perception, shape thoughts, and eventually change what it means to communicate at all. Using a metaphor based within biology, Postman, along with his NYU colleagues, argued that a medium is a technology from which a culture grows, which then gives form to politics, social organization, and a structure of thinking. To study media ecology is to study what a medium does to us, not only what we do to it.",
      "Postman (2000) organized the questions of media ecology into four areas: what a medium does to rational thought, to a democratic process, to access to meaningful information, and to our moral sense. The urgency of all four of these questions grows as AI advances daily. If AI is doing the reasoning that students used to do for themselves, what happens to the capacity for critical thinking and rational thought over time? If AI is producing the communication content that professionals used to craft, what then happens to the authenticity and the relational depth that can only be communicated from human to human? Postman (2000) argued that technologies simply do not add to human life but instead restructure it. The printing press did not add to humans' oral tradition; it displaced it instead. The question this research asks is whether AI is in the process of displacing the communication capacities that define the profession that communication students are training to enter.",
      "When students at Harding University are asked to identify the skills that they believe are irreplaceable and to reflect on what their curriculum needs to protect, Postman would say that they are being asked to describe the balance of their own media environment, depending on how much AI is influencing their personal environment. These next four topics—AI literacy, critical thinking, student perceptions, and workforce preparation—are all possible changes to the communication landscape shift that is touched on by the Media Ecology theory.",
      "What AI Literacy Actually Means",
      "Before we can tackle the problem of AI literacy, we have to decide what it even means. Long and Magerko (2020) were among the first to define AI literacy in a peer-reviewed context. AI literacy was defined as \"a set of competencies that enables individuals to critically evaluate AI technologies; communicate and collaborate effectively with AI; and use AI as a tool online, at home, and in the workplace\" (Long and Magerko, 2020). Building on that foundation, Ng et al. (2021) summarized the early arguments around AI literacy into a four-part framework: knowing and understanding AI, using and applying AI, evaluating and creating AI, and engaging with the ethics of AI. The framework does not treat AI literacy as a purely technical aspect due to the ethical variables. The ethical section shows that ethics have the same level of influence as the ability to use the tool. Ng et al. (2021) acknowledged that the field was still in the growing stages with no consensual definition in place just yet. The core inclusion of ethics is significant: it suggests that being fluent in AI requires more than just operational skill but requires the capacity to determine what the AI environment is doing to us.",
      "What Ng et al. (2021) established was able to be replicated in university settings. Brown et al. (2025) studied how faculty and students in higher education actually think and use AI tools, determining how both groups viewed AI literacy and how literacy correlated with use in practice. Students tended to overestimate their own competency while underestimating the critical labor required to use AI well. Mansoor et al. (2024) showed this pattern on a national scale and found gaps in AI literacy among university students, primarily those without technical academic backgrounds. This gap is directly relevant to the research; communication students may believe they are prepared for an AI-integrated workforce because the human-specific skills that will distinguish them have not been uncovered or identified yet.",
      "Cognitive Offloading and the Decline of Critical Thinking",
      "One of the most important threads in recent literature is the role that self-efficacy plays in how students engage with AI. Self-efficacy is the user's confidence to complete and understand a certain task. Acosta-Enriquez et al. (2025) found that students' confidence in their academic abilities influences AI dependence through academic stress, critical thinking capacity, and performance expectations. The students who believe in their own ability to problem solve tend not to dump problems off to AI, while students who are stressed and uncertain tend to lean into AI dependence in ways that undercut their confidence further. These actions build upon each other: if a student never practices critical thinking and working through the complexity of human communication themselves, their belief in their ability erodes, which strengthens AI dependence, which erodes their belief further.",
      "The dynamic of self-efficacy connects to a survey done by Lee et al. (2025), who surveyed 319 knowledge workers on how generative AI affects critical thinking in professional settings and found that confidence in one's own abilities is associated with more critical evaluation of AI outputs. Gerlich (2025) extended this finding from a behavioral standpoint, conducting a study with 666 participants and finding that frequent usage of AI was consistently negatively correlated with critical thinking ability, which coincides with cognitive offloading behavior. Younger participants were both the heaviest AI users and the lowest scorers on critical thinking assessments. Together, these studies show the type of environment restructuring that Postman's (2000) Media Ecology theory predicts. The medium is not assisting thought; it is redistributing it.",
      "Perceptions and Skill Loss",
      "The literature not only offers data on the effects of AI on students, but also shows how students perceive and respond to it. Thomson et al. (2024), in Frontiers of Artificial Intelligence, surveyed students on AI's impact on their education and career preparation; findings showed that students were not naive about the tradeoffs. Many expressed concern that over-reliance on AI would cost them the sense of accomplishment and confidence that comes from doing their own work. At the same time, students largely saw AI as something they needed to engage with rather than avoid.",
      "Jisc (2025) captured this tension at scale in their annual student perceptions report, drawing on discussion groups and survey data from over 1,200 respondents. Students expressed consistent concern about the atrophy of their skills, especially writing, research, and communication tasks, and the erosion of independent work. Critical thinking, creativity, and communication were repeated concerns. Jisc (2025) also showed that students want to be partners in shaping how AI is integrated into their education rather than having policies handed down to them.",
      "Reality of the Workforce",
      "The concern about AI and the preservation of human skill extends well beyond the academic literature. VanDerziel (2024), writing in Inside Higher Ed, reported on findings from the National Association of Colleges and Employers that AI literacy has become a concrete criterion for hiring, with a significant majority of hiring leaders indicating they would not consider candidates who lack AI skills. AI literacy is transitioning to become a professional survival skill. This workforce literature also makes the case that students who can do nothing but use AI tools will be swept aside, because what employers need is people who can bring judgment, empathy, and connection to AI-assisted work.",
      "Stratton (2025) reported on global research across 2,500 full-time workers in 22 countries, finding that a strong majority believe AI will increase rather than eliminate the value of uniquely human skills: empathy, ethical judgement, relationship building, and interpersonal communication. Oschinski et al. (2024) identified a significant gap in how workforce training programs develop soft skills at Georgetown University's Center for Security and Emerging Technology, raising questions about whether AI-powered simulations of interpersonal communication can substitute for the learning that happens through genuine human interaction.",
      "Synthesis",
      "Reading these works together, a consistent picture emerges: AI literacy goes well beyond just knowing how to use a tool (Long and Magerko, 2020; Ng et al., 2021; Brown et al., 2025). The psychological relationship between students and AI is shaped by confidence and insecurity in ways that stack upon each other as time passes. Less confidence leads to more dependence, which leads to less skill development, which leads to less confidence, which is then offloaded to technology again (Acosta-Enriquez et al. 2025; Lee et al. 2025). The consequence of these actions, cognitive offloading, is eroding critical thinking in the population that uses AI the heaviest (Gerlich, 2025). Students are aware of this risk and seem to be expressing genuine concern about losing the skills they deem essential (Thomson et al., 2024; Jisc, 2025). The labor market is already simultaneously demanding AI literacy while demanding the skills of human connection that AI cannot replicate yet (VanDerziel, 2024; Stratton, 2025; Oschinski et al., 2024). The national evidence from Mansoor et al. (2024) further confirms that this is not only a local problem but a global pattern across higher education.",
      "Postman (2000) argued that the whole point of media ecology is to further our understanding of how we stand as human beings in this life that we live. Through the Media Ecology lens, this research is not just a study of student behavior or hiring qualifications; it paints a picture of a media environment that is in the process of restructuring human communication. This study asks communication students at Harding University to look directly at what they believe is irreplaceable about their own communication, and to tell us, through their own perceptions, what needs to be protected.",
      "Research Questions",
      "1. What specific aspects of communication do students identify as irreplaceable by AI?\n2. Is there a relationship between students' identification of human-only skills and their perceived need for AI literacy education?",
      "Methodology",
      "Survey methodology was used to gather data to provide answers and additional insights related to the research questions. Previous studies have used surveys to assess the relationship between AI usage, student perceptions, and communication skill development in higher education settings (Brown et al., 2025; Mansoor et al., 2024). According to Fowler (2014), survey methodology allows researchers to tap into the minds of participants in a more focused way. By offering the survey online through Google Forms, the researcher was able to more easily distribute the survey, offer participants added convenience, collect data more efficiently, and analyze results with greater ease.",
      "The population of interest is communication students currently enrolled at Harding University in Searcy, Arkansas. The survey collected participants' AI usage habits, perceptions of AI literacy needs, identification of human-irreplaceable communication skills, self-efficacy in communication, and demographic information, and was estimated to take five to eight minutes. All materials were approved by the Institutional Review Board of Harding University prior to recruitment. Participation was completely voluntary, and respondents could withdraw at any time without penalty.",
      "Participants were recruited through a mass email distributed to communication students at Harding University. The survey link directed participants to a self-administered, anonymous questionnaire hosted on Google Forms. No personally identifying information was collected. Distribution was limited to enrolled students in the university's communication department, and survey data were stored on password-protected devices accessible only to the principal investigator.",
      "The questionnaire measured several key variables drawn from the theoretical framework and literature review: AI literacy (using the competency dimensions of Ng et al., 2021); cognitive offloading tendencies (Gerlich, 2025); identification of irreplaceable communication skills (empathy, relationship building, ethical judgment, interpersonal authenticity; Stratton, 2025; Oschinski et al., 2024); academic self-efficacy (Acosta-Enriquez et al., 2025); and demographics.",
      "The full survey (N = 28) produced eight sets of results, summarized and interpreted in the discussion that follows; the complete data tables appear in the original paper.",
      "Discussion",
      "This study found that the overwhelming majority of Communication students at Harding University are active AI users, and a meaningful proportion recognized a decline in their own critical thinking as a result of offloading that process to AI. Nearly all respondents believe that empathy, relationship building, and nonverbal communication are skills that AI cannot fully replicate. Together, these findings suggest that AI integration into the academic process is not a matter of convenience or efficiency but is actively reshaping how students perceive their own learning identities and the value of irreplaceable human skills.",
      "One striking finding is the clarity with which students identified what they believe AI cannot do. 85% selected empathy as irreplaceable. One respondent wrote: \"I think it is empathy/being human. God has made us so unique that no matter how hard anyone tries, there is no replacing us and who we are... This flows out in how we communicate as we touch people's hearts and minds in a way only we can.\" Another offered a one-word answer: \"soul.\" These responses show that students are not purely anti-technology but pro-human.",
      "This pattern fits the Media Ecology framework (Postman, 2000): a medium does not only add to human life but restructures it. One response stated, \"At Harding, I think a Gen-Ed class about how to properly use AI would be a good start, and one for professors as well because they are not on the same page.\" While 39.3% noticed no change in their critical thinking, 28.6% reported a self-perceived reduction—giving concrete grounding to what Gerlich (2025) found at scale. Only one respondent felt fully prepared to work alongside AI professionally, exposing a curriculum gap that mirrors Mansoor et al. (2024).",
      "Implications",
      "These findings suggest that the human skills students value most—empathy, relational depth, ethical judgement, and nonverbal awareness—may play a more significant role in future professional survival than is presently realized. Since 53.6% of this sample believe human communication skills will increase in value as AI advances (consistent with Stratton, 2025; VanDerziel, 2024), communication programs need to protect and nurture those skills. Students are not calling for AI-free classrooms; they are asking to be partners in how AI is integrated (Jisc, 2025). Ng et al. (2021) showed AI literacy includes the capacity for ethical interaction, not just operational fluency—and these students seem to understand that already.",
      "Limitations",
      "The sample of 28 respondents is small and drawn from a single major at a single institution (response rate ~44%). Harding University's distinct religious and cultural identity may not be representative, so findings cannot be generalized without replication across larger, more diverse institutions. The study also relies entirely on self-reported data, which is subject to self-report bias and the limits of introspection.",
      "Future Research",
      "Future work could replicate the study across a larger, more diverse, cross-institutional sample; lengthen the study window to track changes in perception and use over time (testing the confidence-dependence cycle of Acosta-Enriquez et al., 2025); and study the effectiveness of AI literacy curricula designed to cultivate the human skills students identified.",
      "Conclusion",
      "This research advances understanding of how communication students perceive and navigate an academic environment shaped by generative AI. Students are neither blind nor passive to this shift—they recognize what AI cannot recreate. The most common irreplaceable skills named were empathy, relationship building, and nonverbal communication. Despite limitations in sample size and possible self-report bias, the study serves as a starting point for future research and highlights the irreplaceable human attributes students believe are worth protecting in the workplaces they are preparing to enter.",
    ],
  },
  {
    slug: "co-cultural-theory",
    title: "Recent Developments in Co-Cultural Theory",
    date: "November 2025",
    category: "Research",
    excerpt:
      "A review of two decades of Co-Cultural Theory research — how marginalized groups communicate within dominant structures, where the framework has been extended, and where it breaks down.",
    body: [
      "Introduction",
      "Mark Orbe's (1998) Co-Cultural Theory (CCT) offers an integral framework for understanding how marginalized groups communicate within dominant social structures. Rooted in muted group and standpoint theories, CCT explores how individuals from non-dominant groups, based on their race, gender, sexuality, or other identities, develop unique communication strategies to navigate the systems of power that loom overhead. While Orbe's work has established nine communication orientations, ranging from nonassertive assimilation to aggressive separation, subsequent research has expanded, refined, and at times challenged the theory's scope. Over the past two decades, scholars have applied CCT across diverse contexts such as cross-national, gendered, digital, and intercultural, helping reveal its adaptability as well as its limitations. This paper examines what researchers have found through their contemporary applications of Co-Cultural Theory, emphasizing how marginalized individuals negotiate identity and power within dominant social structures. Drawing on recent empirical and interpretive research, this review considers how many scholars have been able to extend Orbe's framework beyond U.S.-centric assumptions and questions the value and boundaries of dominance and marginality in the global communication landscape.",
      "Overview and Core Assumptions",
      "Orbe's theory asserts that the communication between dominant and nondominant groups is shaped by three components: preferred outcomes, communication approaches, and situational context. These factors interact to form strategies that individuals use to navigate interactions with members of the dominant culture. The preferred outcomes area encompasses assimilation (seeking to eliminate cultural differences), accommodation (managing co-existence with the dominant culture), and separation (resisting dominant structures). Communication approaches range from nonassertive (avoiding confrontation) to assertive (directly expressing one's perspective) to aggressive (applying tactics with force). Finally, situational context includes factors such as the perceived costs and rewards of particular strategies, the ability to communicate as an individual, and the specific field of experience in which the interaction takes place.",
      "Orbe and Roberts (2012) later emphasized that CCT's strength lies in its flexibility, its ability to adapt across racial, gendered, and cultural boundaries. Yet its original framework primarily reflected African American experiences within U.S. society. The theory emerged from phenomenological interviews with African American men and women who described their daily navigation of predominantly white academic and professional spaces. This methodological grounding provided rich qualitative data but also raised questions about the theory's applicability to other marginalized populations and cultural areas. Further research was done to test CCT's universality. Scholars such as Han and Groves Price (2018) extended it into cross-cultural contexts, while Blair and Liu (2025) explored its relevance to transracial adoptees negotiating their bicultural identity. These studies reaffirm the theory's foundational insight: co-cultural information is not static but relational, fluid, and deeply tied to perceived power dynamics.",
      "Identity Negotiation and Assimilation Strategies",
      "One major area of CCT application involves identity negotiation and assimilation. Blair and Liu's (2025) study of transracial Chinese adoptees in the United States highlights how co-cultural strategies operate within family and cultural identity development. Through in-depth interviews with 23 adult Chinese adoptees raised in predominantly white families, the researchers found that participants employed what they termed \"selective accommodation\", strategically choosing which aspects of Chinese culture to embrace while maintaining connection to their adoptive families' cultural norms. Participants described complex negotiations around physical appearance, language learning, cultural celebrations, and even romantic relationships. Many reported using nonassertive assimilation strategies during childhood and adolescence to avoid standing out, but shifting toward more assertive accommodation in adulthood as they sought to reclaim their cultural heritage. Their research supports Orbe's (1998) premise that communicative behavior is guided by perceived costs and benefits, but it also revealed how identity negotiation occurs within intimate, rather than strictly societal contexts.",
      "Matsunaga and Torigoe (2008) offer another perspective, applying CCT to Korean minorities in Japan. Their qualitative study of 156 Korean residents in Tokyo and Osaka examined how cultural values influenced the selection of co-cultural strategies. Their findings emphasize the tension between collective harmony and individual assertion, values central to Japanese society that complicate the assimilation-resistance at the heart of Orbe's model. Korean participants reported high use of nonassertive assimilation strategies, particularly in professional settings, where maintaining *wa* (group harmony) took precedence over asserting ethnic identity. However, within Korean community spaces and family contexts, separation strategies were more common. The study demonstrates that co-cultural strategies are not merely responses to dominant power but are also constrained by localized cultural norms. In this sense, CCT gains explanatory power when combined with frameworks such as face-negotiation theory or cultural adaptation theory. Together, these works suggest that identity negotiation in co-cultural communication is shaped not only by systematic dominance but also by interpersonal and cultural nuances.",
      "Communication Strategies in Response to Discrimination",
      "Research has also expanded CCT's application to examine responses to prejudice and discrimination. Jun (2021) analyzed how Asian Americans employed co-cultural strategies during the COVID-19 pandemic when facing heightened xenophobia. Using a mixed method approach combining survey data from 312 participants and follow-up interviews with 28 of these individuals, the researchers were able to document dramatic shifts in strategy use as anti-Asian discrimination intensified. Participants rotated between nonassertive accommodation, such as ignoring microaggressions or avoiding public spaces, as well as assertive advocacy through digital activism on platforms such as Twitter (X) or Instagram. Many respondents described a breaking point where accumulated incidents of discrimination prompted a shift from avoidance to confrontation. Their findings reinforce Orbe's (1998) notion that strategy selection depends on situational context, power perception, and communicative competence. Importantly, digital platforms offered marginalized voices new spaces for resistance, extending CCT into mediated communication environments where collective action could be mobilized more rapidly than in face-to-face contexts.",
      "Similarly, Orbe (2010) refined his original typology of discriminatory acts, verbal, nonverbal, and environmental, highlighting how marginalized individuals recognize and respond to systemic exclusion. Through focus groups with diverse co-cultural group members, he identified patterns in how discrimination is perceived and categorized. Verbal discrimination included overt slurs but also more subtle forms like patronizing speech or being repeatedly interrupted. Nonverbal discrimination encompassed physical avoidance, hostile facial expressions, and a lack of representation in organizational materials. His later empirical research underscored that co-cultural practices, while often adaptive, can lead to emotional exhaustion when power structures remain unchallenged. Participants described the psychological toll of constantly monitoring their communication, code-switching between cultural contexts, and managing others' reactions to their identity. Collectively, these studies affirm that CCT continues to serve as a diagnostic tool for understanding how discrimination shapes communicative choices, even as those choices evolve with new media and social conditions.",
      "Intersectional and Gendered Contexts",
      "Another area of theoretical growth within CCT involves its intersection with gender and professional identity. Herakova (2012) examined male nurses navigating a traditionally female-dominated field, revealing how gender reversal creates unique co-cultural tensions. Through narrative interviews with 8 male nurses across different specializations, she found that these men engage in both assimilation and accommodation strategies, balancing masculine self-presentation with the empathetic communication norms that are expected in nursing. Participants describe consciously adjusting their communication styles when interacting with female colleagues, patients who expected female nurses, and family members who questioned their career choice. Some employed the assimilation strategy of \"emphasizing commonalities\" by focusing on shared professional goals rather than gender differences. Others used the accommodation strategy \"communicating self\" by openly discussing their motivations for entering nursing and challenging gender stereotypes. This study extends CCT beyond its racialized origins, emphasizing the theory's versatility across identity dimensions.",
      "Ramírez-Sánchez (2008) applied the theory to the Afro-Punk community, a subculture within a marginalized racial group, to explore how intra-group hierarchies shape identity expression. Through ethnographic observation at Afro-Punk festivals and interviews with 20 community members, she documented how Black punk musicians and fans navigated authenticity expectations from both white punk communities and mainstream Black culture. Participants described being accused of \"acting white\" by some Black peers while simultaneously experiencing racism within predominantly white punk spaces. This dual marginalization required complex communicative maneuvering. Her findings highlight that co-cultural negotiation occurs not only between dominant and marginalized groups but also within marginalized communities themselves. By exposing these layered dynamics, CCT gains depth as a model for examining how intersecting identities influence communicative strategies and power negotiations.",
      "Global and Cultural Extensions",
      "Recent global applications of CCT demonstrate its adaptability to diverse sociocultural environments. Han and Groves Price (2018) investigated multicultural families in Korea, integrating Bourdieu's concept of cultural capital with co-cultural strategies. Their study of 18 immigrant women married to Korean men revealed how participants leveraged different forms of capital to gain legitimacy within patriarchal family structures. Women with higher educational credentials or professional skills employed more assertive accommodation strategies, using their cultural capital to negotiate more egalitarian relationships. Those with limited Korean language proficiency or economic resources relied more heavily on nonassertive assimilation, conforming to traditional gender roles to maintain family harmony. Their findings reveal that immigrant wives in patriarchal societies navigate communication barriers by leveraging linguistic and social capital to gain legitimacy. The study not only validates Orbe's emphasis on agency but also introduces new dimensions—economic, linguistic, and institutional—that extend CCT's explanatory range. These international adaptations show how the theory travels across cultures but also expose its limitations. Concepts like individualism and assertiveness, central to Western frameworks, may not resonate in collectivist societies where harmony and indirectness are valued. As such, scholars argue that CCT must evolve into a more culturally relevant model, incorporating indigenous communication norms and broader conceptions of power that extend beyond Western binaries.",
      "Across these studies, several key themes emerge. First, researchers agree that CCT remains a powerful framework for analyzing how marginalized individuals navigate systems of power. The theory's three-dimensional model provides a systematic way to categorize and understand the diverse strategies employed by nondominant groups. However, they also point out areas where the theory's original U.S.-centric assumptions need revision. For instance, while Orbe (1998) emphasized individual agency, newer work suggests that communal and familial contexts also drive strategy selection (Han & Groves Price, 2018; Blair & Liu, 2025). Moreover, CCT's tripartite model preferred outcome, approach, and context may oversimplify the nonlinear, intersectional nature of identity negotiation. Critics have also noted that CCT can unintentionally reify the very hierarchies it seeks to dismantle by continually defining marginalized identities in opposition to dominant ones. Integrating intersectional theory (Crenshaw, 1991) and postcolonial perspectives could mitigate this limitation, allowing for a more fluid understanding of power and identity. Future research might also draw from digital communication theory to examine how social media enables new forms of collective co-cultural resistance beyond individual strategy selection. Overall, recent empirical research suggests that while CCT's foundations remain solid, its contemporary relevance depends on the elasticity of the theory, its ability to adapt to evolving contexts, revolving identities, and globalized power structures. The accumulation of cross-cultural applications demonstrates both the theory's robust conceptual core and the need for continued refinement to account for diverse cultural logics and power configurations.",
      "Conclusion",
      "In response to the driving question, what have researchers found using Co-Cultural Theory? The evidence shows that CCT continues to offer a robust yet flexible framework for exploring power and communication among marginalized groups. Studies spanning cultural identity, gender, digital media, and global adaptation all affirm the theory's enduring utility. The expanded applications reveal that co-cultural communication strategies are more context-dependent, intersectional, and culturally variable than the original framework suggested. Yet, they also reveal that the field is shifting toward a more nuanced understanding of co-cultural dynamics, one that values intersectionality, cultural context, and systemic critique. Ultimately, Co-Cultural Theory's evolution reflects the broader transformation of communication scholarship itself: a movement from fixed trains of thought toward fluid, intersectional, and globally conscious approaches. As researchers continue to refine and challenge Orbe's framework, CCT remains not only a theory of communication but a living, adaptive lens for understanding the voices that persist and transform within structures of power.",
    ],
  },
];

// ---------------- PHOTOGRAPHY ----------------
// Add photos to /public, then set src to "/yourphoto.jpg".
// Leave src as "" to render a soft placeholder tile.
export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "tall" | "wide" | "square";
};

export const photography: Photo[] = [
  { src: "/rome-spanish-steps.jpg", alt: "View down the street from the Spanish Steps, Rome", caption: "Spanish Steps, Rome, Italy", aspect: "tall" },
  { src: "/hillside-houses.jpg", alt: "Colorful houses on a wooded hillside above a lake", caption: "Lake Zurich, Switzerland", aspect: "wide" },
  { src: "/autumn-walk.jpg", alt: "Two figures walking a wooded path toward a lake", caption: "Walk in the NorthEast", aspect: "wide" },
  { src: "/red-ensign-sunset.jpg", alt: "A red ensign flag backlit at sunset", caption: "Last light", aspect: "wide" },
  { src: "/sculpture-eoa.jpg", alt: "Red triceratops sculpture on painted letter blocks", caption: "Rockwell's legos", aspect: "wide" },
  { src: "/cowboy-stage.jpg", alt: "Performer in a cowboy hat on stage in colored light", caption: "Steelbirds show", aspect: "wide" },
  { src: "/morning-hills.jpg", alt: "Rolling hills at first light with trees in the foreground", caption: "New England", aspect: "wide" },
  { src: "/above-the-clouds.jpg", alt: "A hiker resting above a sea of clouds at sunrise", caption: "Mt. Elbert summit hike", aspect: "wide" },
  { src: "/barn-session.jpg", alt: "Drummer performing in a barn, black and white", caption: "Steelbirds show", aspect: "wide" },
  { src: "/bee-goldenrod.jpg", alt: "A bumblebee on yellow goldenrod", caption: "Alpine wildflowers", aspect: "wide" },
  { src: "/ridge-dawn.jpg", alt: "Hikers ascending a mountain ridge at dawn", caption: "Mt. Princeton", aspect: "wide" },
  { src: "/graduation.jpg", alt: "Three graduates inside an Inspired Purpose frame", caption: "Harding University Graduation", aspect: "wide" },
  { src: "/concert-crowd.jpg", alt: "Band performing to a crowd with raised hands, black and white", caption: "Outdoor concert", aspect: "wide" },
];

// ---------------- LINKED WORKS ----------------
export type LinkedWork = {
  title: string;
  client: string;
  year: string;
  role: string;
  summary: string;
  href: string;
  image?: string;
};

export const linkedWorks: LinkedWork[] = [
  {
    title: "EZ Caddie \u2014 Advertising Plan & Market Research",
    client: "EZ Caddie",
    year: "2025", // TODO: confirm the year
    role: "Advertising strategy, market research",
    summary:
      "A full advertising plan and market research project for EZ Caddie \u2014 audience and competitive analysis, positioning, and a media strategy, built out as a campaign deck.",
    href: "https://canva.link/jgjbhgbr75p1s2t",
    image: "",
  },

  // ---- Parked until you have public links; uncomment + add href to use ----
  // {
  //   title: "AAF Gold Award Campaign",
  //   client: "Pivot Creative Studios",
  //   year: "2025",
  //   role: "Creative direction, photo & video",
  //   summary: "Photo & video for a campaign that won an AAF Gold Award (2025), plus Silver and Honorable Mention (2026).",
  //   href: "#",
  //   image: "",
  // },
  // {
  //   title: "Radio Advertising Packages",
  //   client: "Pivot Creative Studios",
  //   year: "2024-2026",
  //   role: "Account management",
  //   summary: "Developed and sold advertising and pricing packages to local KVHU radio.",
  //   href: "#",
  //   image: "",
  // },
  // {
  //   title: "Consumer App Market Research",
  //   client: "Vista 14",
  //   year: "2024",
  //   role: "Marketing intern",
  //   summary: "Competitive landscape and user-base research for a consumer mobile app concept.",
  //   href: "#",
  //   image: "",
  // },
  // {
  //   title: "Live Broadcast Production",
  //   client: "HU16 - Searcy, AR",
  //   year: "2023",
  //   role: "Broadcaster",
  //   summary: "Cameras, audio board, teleprompter, and newsroom floor management for live productions.",
  //   href: "#",
  //   image: "",
  // },
];

// ---------------- CONTACT ----------------
export const contact = {
  heading: "Let's talk.",
  body:
    "Open to marketing and communications roles in DFW \u2014 plus commissions, collaborations, or a note about something you read here.",
  email: "audieisbell@gmail.com",
  links: [
    { label: "Email", href: "mailto:audieisbell@gmail.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
    { label: "Instagram", href: "https://instagram.com/yourhandle" },
  ],
};
