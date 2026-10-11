// Public portfolio copy. Factual sources remain in docs/content-ledger.md.

export const profile = {
  "name": "Ajinkya Chintawar",
  "role": "AI engineer and data analyst",
  "statement": "I like turning “could this work?” into something I can try.",
  "summary": "I’m an AI engineer and data analyst in Dublin. I build across AI, data and the web, following questions that seem worth exploring and working through the messy parts along the way.",
  "location": "Dublin, Ireland"
};

export const contact = [
  {
    "id": "email",
    "label": "Email",
    "handle": "ajinkyachintawar12@gmail.com",
    "href": "mailto:ajinkyachintawar12@gmail.com"
  },
  {
    "id": "github",
    "label": "GitHub",
    "handle": "github.com/ajinkyachintawar",
    "href": "https://github.com/ajinkyachintawar"
  },
  {
    "id": "linkedin",
    "label": "LinkedIn",
    "handle": "linkedin.com/in/ajinkya-chintawar",
    "href": "https://www.linkedin.com/in/ajinkya-chintawar/"
  }
];

export const about = {
  "paragraphs": [
    "I’m curious about the gap between an interesting idea and something people can use. That takes me in a few directions: comparing software, making sense of housing data, or building a personal beauty consultant.",
    "I enjoy the part where a project stops behaving as expected. A search finds the wrong page. An AI contradicts its own answer. Two datasets refuse to line up. Figuring out why is often where the most useful work starts.",
    "I have an MSc in Data Analytics with First Class Honours. Some of these projects are my own experiments; others came from hackathons and team challenges. Each one has given me a different problem to get my hands on."
  ]
};

export const featuredIds = [
  "adversarialci",
  "groundwork",
  "apex-1",
  "painsignal"
];

export const projects = [
  {
    "id": "adversarialci",
    "name": "AdversarialCI",
    "tagline": "Compare software. See the evidence behind the recommendation.",
    "summary": "Choosing between software tools means digging through pricing pages, documentation and competing claims. I built AdversarialCI to bring those sources together and let AI agents argue both sides before recommending a vendor.",
    "status": {
      "kind": "live",
      "label": "Live app"
    },
    "context": "Independent research · 2026",
    "role": "I designed and built the system, from collecting sources to the web app, and wrote a research preprint about it.",
    "links": [
      {
        "label": "Live app",
        "href": "https://adversarialci-platform.vercel.app/"
      },
      {
        "label": "Source code",
        "href": "https://github.com/ajinkyachintawar/adversarialci-platform"
      },
      {
        "label": "Preprint (DOI)",
        "href": "https://doi.org/10.14293/PR2199.003028.v1"
      }
    ],
    "problem": "An AI comparison can sound convincing even when it gets the details wrong. I wanted to make the reasoning easier to inspect: where did each claim come from, and does the final recommendation follow from it?",
    "audience": "People choosing software, sales teams researching competitors, and analysts comparing products.",
    "flow": [
      {
        "kind": "data",
        "label": "Retrieve evidence",
        "note": "Per company and dimension, from MongoDB Atlas Vector Search. A company filter runs before the vector search, so cross-vendor contamination is impossible by construction."
      },
      {
        "kind": "model",
        "label": "Extract claims",
        "note": "The model emits structured claims, each citing evidence IDs."
      },
      {
        "kind": "code",
        "label": "Citation gate",
        "note": "Zero LLM calls. Every evidence ID must resolve to a real stored chunk for that company, or the claim is dropped."
      },
      {
        "kind": "model",
        "label": "Debate and judge",
        "note": "Buyer mode runs two rounds: claim selection and attack, then rebuttal. A 70B judge then rules per dimension."
      },
      {
        "kind": "code",
        "label": "Recompute confidence",
        "note": "The judge’s own number is discarded: confidence = dimensions won by the winner ÷ total dimensions."
      },
      {
        "kind": "code",
        "label": "Consistency check",
        "note": "Cited IDs valid, declared winner actually won the most dimensions, confidence matches the formula, no duplicated dimensions. On failure the model is re-asked once with the failure quoted back."
      },
      {
        "kind": "output",
        "label": "Verdict with sources",
        "note": "Persisted, and flagged inconsistent if it still fails."
      }
    ],
    "built": [
      "Built the live comparison app with a React frontend, FastAPI backend and LangGraph agents.",
      "Developed an experimental version that checks source references and catches contradictions in the final verdict.",
      "Created tests for finding relevant sources, checking citations and knowing when there is too little evidence to answer."
    ],
    "tradeoff": {
      "title": "A useful experiment is not automatically ready to go live.",
      "body": "The newer version takes 8–10 minutes to finish a comparison. A server restart can still interrupt it. I kept the live app on the earlier version until the longer runs can recover reliably."
    },
    "highlight": {
      "title": "The judge picked the wrong winner.",
      "body": "In one run, the AI chose Pinecone even though its own comparisons gave Weaviate more wins. A check I wrote caught the contradiction. That is the kind of mistake I want the system to expose before someone relies on its answer."
    },
    "evidence": [
      {
        "metric": "16 / 16",
        "text": "hit@1 on a 16-query golden retrieval set (MRR 1.0).",
        "limit": "The set covers MongoDB and Pinecone only."
      },
      {
        "metric": "83 / 83",
        "text": "extracted claims survived the citation gate, against a 0.90 pass bar.",
        "limit": "Three database companies in one vertical."
      },
      {
        "metric": "83.3% · 90%",
        "text": "answer rate on answerable questions, and correct abstention on unanswerable ones, from two separate hand-authored sets.",
        "limit": "Questions written by the builder. Real logged questions answer materially less often."
      },
      {
        "metric": "null",
        "text": "is reported when any test row errors, rather than calculating a rate from incomplete results.",
        "limit": null
      }
    ],
    "limits": [
      "Finding a cited source does not prove that the source supports the whole claim.",
      "The live app runs the earlier version. The newer checks described here are experimental.",
      "The confidence scores are not a measured probability of being right. I have not validated the recommendations against expert-labelled outcomes."
    ],
    "stack": [
      "Python",
      "FastAPI",
      "LangGraph",
      "Groq (Llama 3.1 8B / 3.3 70B)",
      "Gemini embeddings",
      "MongoDB Atlas Vector Search",
      "Pydantic",
      "React 19",
      "Docker"
    ],
    "skills": [
      "langgraph",
      "model-tiering",
      "vector-search",
      "citation-gates",
      "abstention",
      "eval-harnesses",
      "contamination",
      "fastapi",
      "react",
      "docker"
    ],
    "question": "Can AI make a recommendation you can actually check?"
  },
  {
    "id": "earshotci",
    "name": "EarshotCI",
    "tagline": "A second pair of ears for sales conversations.",
    "summary": "“They said their product is cheaper. Is that true?” EarshotCI lets a sales rep ask that question in Slack and get an answer backed by the competitor’s own pages. When it cannot find enough evidence, it says so.",
    "status": {
      "kind": "prototype",
      "label": "Working prototype"
    },
    "context": "Independent · 2026 · extends AdversarialCI",
    "role": "I built the Slack experience, the search planner and the tests using real questions.",
    "links": [],
    "linksNote": "The Slack prototype is not public yet.",
    "problem": "People do not ask questions the way search engines expect them to. They use half a sentence from a conversation. I worked on turning those messy questions into searches that find the right material.",
    "audience": "Sales reps who need to check a competitor’s claim during a deal.",
    "flow": [
      {
        "kind": "data",
        "label": "Question in Slack",
        "note": "Logged with source, competitor and outcome."
      },
      {
        "kind": "model",
        "label": "Query planner",
        "note": "One LLM call before retrieval writes short keyword sub-queries per company and flags comparisons."
      },
      {
        "kind": "data",
        "label": "Retrieve and merge",
        "note": "Each sub-query runs separately; results merge by content hash, keeping the best score."
      },
      {
        "kind": "code",
        "label": "Score floor",
        "note": "If nothing clears the retrieval floor, the request is refused before the answer is generated. The planner call has already run by then; only the planner-disabled baseline refuses with no model call at all."
      },
      {
        "kind": "model",
        "label": "Cited answer",
        "note": "The model must quote its sources verbatim."
      },
      {
        "kind": "code",
        "label": "Citation gate",
        "note": "Every quoted span must match its source chunk. An answer left with no surviving citation becomes a refusal."
      },
      {
        "kind": "output",
        "label": "evidence · none · error",
        "note": "A provider outage is reported as an error, never as “no evidence”."
      }
    ],
    "built": [
      "Connected Slack to a source-backed question-answering service.",
      "Reviewed 28 real questions to separate wrong answers, bad citations and unnecessary refusals.",
      "Added a planning step that breaks a question into searches, then compared it with the original approach."
    ],
    "tradeoff": {
      "title": "First, find out why it is failing.",
      "body": "My first attempt changed the wrong part of the system. Looking at the failed questions showed that search needed attention. I kept the checks that prevent unsupported answers and changed how the system looks for evidence instead."
    },
    "highlight": {
      "title": "An improvement still had a weak spot.",
      "body": "One pricing question worked four times out of four before the planner, but only twice in six runs afterwards. I kept that result in the write-up. It tells me where the next fix belongs."
    },
    "evidence": [
      {
        "metric": "3/9 → 5–6/9",
        "text": "cross-vendor real questions answered: baseline 3/9 in all three runs, planner 5/9 or 6/9 across three runs.",
        "limit": "Nine questions. Same day, same corpus, exact control."
      },
      {
        "metric": "1 regression",
        "text": "a previously reliable question became unreliable with the planner.",
        "limit": null
      },
      {
        "metric": "temp 0.1",
        "text": "The same question with the same retrieval score returned both an answer and a refusal on repeated attempts.",
        "limit": null
      }
    ],
    "limits": [
      "The comparison tests use small question sets from one user.",
      "Answers can vary between runs, and the pricing-question regression is still open."
    ],
    "stack": [
      "Python",
      "FastAPI",
      "Slack Events API",
      "Groq",
      "MongoDB Atlas Vector Search"
    ],
    "skills": [
      "query-planning",
      "citation-gates",
      "abstention",
      "eval-harnesses",
      "regression-reporting"
    ],
    "question": "What if a sales rep could check a claim without leaving Slack?"
  },
  {
    "id": "painsignal",
    "name": "PainSignal",
    "tagline": "Find the frustrated developer. Help solve the actual problem.",
    "summary": "Developers often explain exactly what is broken in a GitHub issue or a public discussion. PainSignal finds those complaints, looks for relevant documentation and drafts a useful reply for someone to review.",
    "status": {
      "kind": "deployed",
      "label": "Hackathon demo"
    },
    "context": "Cursor Hackathon Dublin · July 2026 · team of three",
    "role": "I built the product end to end for a Dublin hackathon. Charan and Divya were my teammates.",
    "links": [
      {
        "label": "Live demo",
        "href": "https://painsignal.netlify.app/"
      },
      {
        "label": "Source code",
        "href": "https://github.com/ajinkyachintawar/painsignal"
      }
    ],
    "problem": "A useful response starts with understanding what someone is stuck on. I wanted to connect the complaint to the documentation that could help, before asking AI to write a reply.",
    "audience": "Developer-tool teams looking for people they can genuinely help.",
    "flow": [
      {
        "kind": "data",
        "label": "Detect complaints",
        "note": "GitHub’s Issues API for the configured organisation; Exa search scoped to Reddit and Hacker News. Runs hourly as a scheduled function."
      },
      {
        "kind": "model",
        "label": "Triage",
        "note": "Is this a genuine, specific, unresolved complaint? The model’s self-reported confidence filters below 0.6. This is a rough filter, not measured accuracy."
      },
      {
        "kind": "data",
        "label": "Ground the diagnosis",
        "note": "Retrieves documentation and prior resolutions, filtering out the post itself and pages that extracted as boilerplate."
      },
      {
        "kind": "model",
        "label": "Diagnose and draft",
        "note": "Root cause, fix and a reply script, stating whether the diagnosis was actually grounded."
      },
      {
        "kind": "human",
        "label": "Request a video",
        "note": "Avatar video is metered, so it is generated only when a person asks."
      },
      {
        "kind": "human",
        "label": "Approve",
        "note": "Nothing is marked sent without an explicit approval. “Send” is simulated: nothing is posted publicly."
      }
    ],
    "built": [
      "Built a dashboard that gathers complaints from GitHub, Reddit and Hacker News.",
      "Connected each issue to relevant documentation before generating a diagnosis and reply.",
      "Added optional video replies and a review step. Sending is simulated in this build."
    ],
    "tradeoff": {
      "title": "A drafted reply should still be someone’s decision.",
      "body": "Posting automatically into a stranger’s conversation could turn a helpful tool into spam. I kept the review step and left real posting out of the hackathon build."
    },
    "highlight": {
      "title": "“Check your API key” was not enough.",
      "body": "For an ElevenLabs error in an n8n integration, the first answer offered generic API-key advice. After finding three independent reports of the same error, the system pointed to a likely wider authentication issue. Better sources changed the diagnosis."
    },
    "evidence": [
      {
        "metric": "Hourly",
        "text": "background scan via a Netlify Scheduled Function, plus an on-demand button running the same pipeline.",
        "limit": null
      },
      {
        "metric": "Async",
        "text": "video renders start with one call and are polled from the browser, because serverless functions cannot hold a multi-minute request.",
        "limit": null
      }
    ],
    "limits": [
      "Sending replies is simulated. The deployed demo does not post into public threads.",
      "The diagnosis depends on finding relevant sources. The tool marks when that search falls short.",
      "It currently searches GitHub, Reddit and Hacker News."
    ],
    "stack": [
      "Next.js",
      "Netlify Functions and Blobs",
      "Groq (Llama 3.3 70B)",
      "Exa",
      "GitHub REST API",
      "HeyGen",
      "node --test"
    ],
    "skills": [
      "grounding",
      "human-gates",
      "serverless-jobs",
      "nextjs",
      "js-testing"
    ],
    "question": "Could finding the right problem be a better start than sending another sales email?"
  },
  {
    "id": "ironsight",
    "name": "IRONsight",
    "tagline": "Workout data makes more sense when you know the exercise.",
    "summary": "A high heart rate during a heavy squat means something different from the same reading during a curl. IRONsight explores how exercise context could make wearable data more useful, with a live workout dashboard built on simulated readings.",
    "status": {
      "kind": "prototype",
      "label": "Prototype · simulated data"
    },
    "context": "Independent · 2026",
    "role": "I built the prototype, including the simulated sensor, analysis service and dashboard. The repository uses the working name IronInsight.",
    "links": [
      {
        "label": "Source code",
        "href": "https://github.com/ajinkyachintawar/ironinsight"
      }
    ],
    "problem": "A wrist sensor records signals, but those signals do not describe the whole workout. I wanted to explore what happens when you add the exercise, the set and the workload to the picture.",
    "audience": "People exploring how exercise tracking and wearable data could work together.",
    "flow": [
      {
        "kind": "data",
        "label": "Wearable adapter",
        "note": "One interface for every source. A mock adapter simulates exercise-specific physiology: a squat drives heart rate toward ~92% of max, a curl to ~66%."
      },
      {
        "kind": "data",
        "label": "Live stream",
        "note": "Heart rate, HRV, power and strain over a WebSocket at 2 Hz, with exercise and set events from the client."
      },
      {
        "kind": "code",
        "label": "Metric engines",
        "note": "Pure functions: “struggling” (high HR as power and HRV fall), “redline” (sustained HR above 95% of max), acute:chronic workload ratio."
      },
      {
        "kind": "output",
        "label": "Session analysis",
        "note": "Per-exercise peaks and power decay, a rest timer driven by measured recovery, a 0–100 session score, history and trends."
      }
    ],
    "built": [
      "Built a live dashboard for workout sessions and history.",
      "Streamed simulated readings over WebSockets and added rules for fatigue and unusual patterns.",
      "Kept the sensor connection separate so a real device could be added later."
    ],
    "tradeoff": {
      "title": "Start with a testable pipeline.",
      "body": "I did not have a physical wearable connected, so I built with simulated data. That let me test the live stream and dashboard without pretending the health predictions had been validated."
    },
    "highlight": null,
    "evidence": [],
    "limits": [
      "All sensor readings are simulated; I have not connected a physical wearable.",
      "The health and injury-risk ideas have not been validated.",
      "Saving individual sets and combining the risk signals are still in progress."
    ],
    "stack": [
      "Python",
      "FastAPI",
      "WebSockets",
      "SQLAlchemy",
      "Next.js",
      "TypeScript",
      "Recharts",
      "pytest"
    ],
    "skills": [
      "fastapi",
      "websockets",
      "adapter-boundaries",
      "nextjs",
      "python-testing"
    ],
    "question": "What is your wearable missing when it cannot see your workout?"
  },
  {
    "id": "glowup",
    "name": "GlowUp",
    "tagline": "A personal beauty consultant, in English or Marathi.",
    "summary": "GlowUp helps you explore makeup and hair looks for an occasion, with suggestions based on your preferences and steps to follow. I’m building it as a personal beauty consultant you can use on your phone, in English or Marathi.",
    "status": {
      "kind": "private",
      "label": "Private pilot"
    },
    "context": "Personal project · 2026",
    "role": "I shaped the product and directed the build, using AI coding tools and separate reviews to test each part.",
    "links": [],
    "linksNote": "This is a private project, so there is no public demo.",
    "problem": "There is plenty of beauty inspiration online. Turning a look into something you can actually do takes more guidance. I wanted to bring the consultation, product choices and practical steps into one place.",
    "audience": "People looking for makeup and hair guidance for an occasion, in English or Marathi.",
    "flow": [
      {
        "kind": "human",
        "label": "Consultation",
        "note": "Occasion, preferences and an optional photo, on a phone, in English or Marathi."
      },
      {
        "kind": "model",
        "label": "Advice provider",
        "note": "A fake provider is the default for consultations. Real Claude and OpenAI adapters sit behind an explicit switch and a server key; paid calls have run only in small, owner-approved trials."
      },
      {
        "kind": "code",
        "label": "Catalogue validation",
        "note": "An invented product, a product that does not belong to the look, or missing Marathi is rejected rather than silently corrected."
      },
      {
        "kind": "code",
        "label": "Spend limits",
        "note": "The server enforces spending limits. Paid trial runs set money aside first and stop when the cost is unknown."
      },
      {
        "kind": "output",
        "label": "Looks and history",
        "note": "Saved per enrolled phone. Users can reopen or delete sessions."
      }
    ],
    "built": [
      "Built the consultation flow, saved history and product checks.",
      "Added a private salon-kit inventory with photos, sign-in and shared access.",
      "Tested real AI suggestions in small, controlled trials with spending limits. The consultation is still in development."
    ],
    "tradeoff": {
      "title": "A suggestion has to work with the catalogue.",
      "body": "If the AI invents a product or puts it in a look where it does not belong, the app rejects the suggestion. I want those mistakes to be visible while I improve the experience."
    },
    "highlight": null,
    "evidence": [
      {
        "metric": "9 / 10",
        "text": "synthetic text-only requests passed catalogue validation in one owner-approved paid trial (28 September 2026). The tenth put a blush into a look that does not allow one, and was rejected by the validator.",
        "limit": "Ten synthetic requests, one model, one run. Advice quality and Marathi fluency were not scored."
      },
      {
        "metric": "154 + 183",
        "text": "backend and frontend tests passing at the 7 October 2026 review of the sign-in and hosting preparation.",
        "limit": "From the project’s review records; not re-run for this page."
      },
      {
        "metric": "Kit only",
        "text": "The one hosted part is a private, invite-only salon-kit inventory. Consultation routes are switched off on it.",
        "limit": "Live checks for sharing, recovery and backup were still in progress at the latest record (7 October 2026)."
      }
    ],
    "limits": [
      "The private salon-kit inventory is hosted. The AI consultation is not deployed and uses sample advice by default.",
      "Real AI suggestions have only been tested in small trials. A fluent reader still needs to review the Marathi.",
      "The project is not open to the public."
    ],
    "stack": [
      "React",
      "TypeScript",
      "Vite",
      "Vitest",
      "Python",
      "FastAPI",
      "pytest",
      "SQLite"
    ],
    "skills": [
      "structured-outputs",
      "spend-controls",
      "fastapi",
      "react",
      "python-testing",
      "js-testing",
      "staged-review"
    ],
    "question": "What would a personal beauty consultant on your phone look like?"
  },
  {
    "id": "eu-ai-act-agent",
    "name": "EU AI Act Agent",
    "tagline": "A starting point for understanding your AI system’s obligations.",
    "summary": "Describe an AI product and this agent prepares a draft risk classification, a checklist of relevant obligations and a documentation outline. It helps a team find its starting point for a review under the EU AI Act.",
    "status": {
      "kind": "live",
      "label": "Open source"
    },
    "context": "Independent · 2026",
    "role": "I built the agent, API, code scanner and developer integrations.",
    "links": [
      {
        "label": "Source code",
        "href": "https://github.com/ajinkyachintawar/eu-ai-act-compliance-agent"
      },
      {
        "label": "GitHub Marketplace",
        "href": "https://github.com/marketplace/actions/eu-ai-act-compliance-scanner"
      }
    ],
    "problem": "Before a team can ask good questions in a legal review, it needs to understand which parts of the regulation might apply. I built a tool that retrieves the relevant text and turns it into a draft to work through.",
    "audience": "Teams preparing to review an AI product. The output needs human and legal review; it is not compliance certification.",
    "flow": [
      {
        "kind": "data",
        "label": "Description",
        "note": "Free text about the AI system."
      },
      {
        "kind": "model",
        "label": "Extract fields",
        "note": "Plain text becomes a structured system description."
      },
      {
        "kind": "data",
        "label": "Retrieve articles",
        "note": "Top-8 chunks from the regulation, embedded with NVIDIA NIM and stored in Supabase pgvector."
      },
      {
        "kind": "model",
        "label": "Classify",
        "note": "Risk tier with confidence. High-risk systems branch to an Article 6 exception check."
      },
      {
        "kind": "model",
        "label": "Obligations",
        "note": "Each applicable article marked MET, NOT_MET or UNCLEAR."
      },
      {
        "kind": "output",
        "label": "Report and Annex IV draft",
        "note": "A structured report and a .docx documentation template."
      }
    ],
    "built": [
      "Connected the classification workflow to retrieved regulatory text.",
      "Added a source-code scanner and an exportable documentation draft.",
      "Made it available through an API, an MCP integration and a GitHub Action."
    ],
    "tradeoff": {
      "title": "Use different tools for different jobs.",
      "body": "The language model writes the draft, while a separate embedding service helps find relevant passages. I split those jobs so the search would work with the existing document index."
    },
    "highlight": null,
    "evidence": [],
    "limits": [
      "This prepares a draft for review. It does not certify compliance or replace legal advice.",
      "I have not published an accuracy evaluation of its classifications yet."
    ],
    "stack": [
      "Python",
      "FastAPI",
      "LangGraph",
      "Groq",
      "NVIDIA NIM",
      "Supabase pgvector",
      "fastmcp",
      "GitHub Actions"
    ],
    "skills": [
      "langgraph",
      "vector-search",
      "mcp",
      "fastapi",
      "ci-gates"
    ],
    "question": "Where does a team begin when a regulation is hundreds of pages long?"
  },
  {
    "id": "groundwork",
    "name": "Groundwork",
    "tagline": "Bring Ireland’s housing constraints into one place.",
    "summary": "Could a site support new homes? Groundwork brings together information about water capacity, planning, zoning and environmental restrictions to help explore that question. I worked on the data platform that makes those separate sources usable together.",
    "status": {
      "kind": "team",
      "label": "Team project"
    },
    "context": "TechIreland National AI Challenge 2026 · team of six",
    "role": "I owned the data work: collecting messy datasets, cleaning and joining them, and making them available for AI agents to query. My teammates covered the other product and engineering areas.",
    "links": [],
    "linksNote": "Private team repository. No public demo.",
    "problem": "Answering a simple question about a site can mean searching several public datasets that use different names and formats. My part was making those pieces fit so the rest of the team could build on them.",
    "audience": "People investigating potential housing sites in Ireland. It is an early research tool, not planning advice.",
    "flow": [
      {
        "kind": "data",
        "label": "Fetch",
        "note": "Every source downloaded into a dated, checksummed, resumable snapshot."
      },
      {
        "kind": "code",
        "label": "Clean and gate",
        "note": "Typed canonical tables and a QC report. Applicant names and addresses are never requested, and their absence is asserted on every run."
      },
      {
        "kind": "code",
        "label": "Join spatially",
        "note": "Planning points assigned to settlement polygons by point-in-polygon and joined to capacity status across 1,071 settlements."
      },
      {
        "kind": "model",
        "label": "Extract unit counts",
        "note": "Three deterministic tiers first; an LLM only for the tail they cannot read."
      },
      {
        "kind": "data",
        "label": "Load and refresh",
        "note": "Postgres and PostGIS, refreshed by a nightly delta with a watermark."
      },
      {
        "kind": "output",
        "label": "Site verdict",
        "note": "Constraint checklist, precedents and a printable dossier in the site agent."
      }
    ],
    "built": [
      "Built the data collection, cleaning and quality checks.",
      "Matched settlement names across sources and prepared the database for updates.",
      "Built and tested a method for extracting housing-unit counts from planning records.",
      "Removed flood data when its licence did not fit the intended product."
    ],
    "tradeoff": {
      "title": "Useful data still needs permission to be used.",
      "body": "A flood dataset would have added valuable context, but its licence did not fit the commercial product. I removed it from the agent’s tools, and teammates removed it from the rest of the pipeline."
    },
    "highlight": {
      "title": "Good progress, with more work to do.",
      "body": "The unit-count extractor reached 90.2% accuracy on 164 labelled examples. Our target was 95%. That gap matters when other parts of the product depend on the data, so it stayed on the list of things to improve."
    },
    "evidence": [
      {
        "metric": "90.2%",
        "text": "unit-extraction accuracy on hand-labelled records, 95% CI 84.7–93.9%, below the 95% target.",
        "limit": "n = 164 answered records."
      },
      {
        "metric": "1,071",
        "text": "settlements in the water-capacity registers joined to settlement boundaries.",
        "limit": "Capacity statuses change; every output shows its data vintage."
      }
    ],
    "limits": [
      "This is an early exploration, not planning advice.",
      "The proof-of-concept page shows a scripted walkthrough. A teammate built the live agent separately.",
      "Restrictions on using and republishing water-capacity data remain unresolved."
    ],
    "stack": [
      "Python",
      "pandas",
      "PyArrow",
      "PostGIS",
      "Supabase Postgres",
      "Vertex AI"
    ],
    "skills": [
      "pipelines",
      "geospatial",
      "postgres",
      "entity-resolution",
      "eval-harnesses",
      "pii-licensing",
      "sql"
    ],
    "question": "The housing data exists. Can we make it useful together?"
  },
  {
    "id": "apex-1",
    "name": "APEX-1",
    "tagline": "A checkpoint before an automated sales email goes out.",
    "summary": "Finding a promising customer does not mean an email should be sent. APEX-1 checks the lead, the available evidence and the project’s country rules, then routes the result to send, hold, suppress or nurture. The hackathon build runs without sending by default.",
    "status": {
      "kind": "prototype",
      "label": "Hackathon prototype"
    },
    "context": "GTM Agents hackathon, Dublin · August 2026 · team of two",
    "role": "I built the decision logic, evidence checks and evaluation tools. Neel was my teammate and hosts the repository.",
    "links": [
      {
        "label": "Source code",
        "href": "https://github.com/Neel09apr/apex-1"
      }
    ],
    "problem": "An AI can rate a lead highly without having a good reason. I worked on keeping the final sending decision in code, with a review path when the evidence or permission is uncertain.",
    "audience": "Small sales teams experimenting with automated outreach across different markets.",
    "flow": [
      {
        "kind": "data",
        "label": "Lead record",
        "note": "Third-party data, fenced as data, never instructions."
      },
      {
        "kind": "code",
        "label": "Disqualifiers",
        "note": "Competitors, customers and suppression hits stop here, at zero tokens."
      },
      {
        "kind": "model",
        "label": "Fit and timing",
        "note": "Four dimension scores. Each evidence entry carries a claim, a verbatim quote, a source and whether it supports the claim."
      },
      {
        "kind": "code",
        "label": "Verify quotes",
        "note": "A quote found in no field is dropped with its claim. Survivors are re-attributed to the field they were really found in."
      },
      {
        "kind": "code",
        "label": "Trust checks",
        "note": "A send-grade score must rest on at least one surviving quote, and not on prospect-written fields alone. Otherwise, confidence is forced low."
      },
      {
        "kind": "code",
        "label": "The gate",
        "note": "Lawful basis dominates tier. Low confidence holds, whatever the tier."
      },
      {
        "kind": "human",
        "label": "Hold queue",
        "note": "Anything uncertain waits for a person instead of guessing."
      }
    ],
    "gate": {
      "caption": "The gate, high-confidence case. Rows are lawful basis; columns are fit tier.",
      "columns": [
        "A",
        "B",
        "C",
        "Disqualified"
      ],
      "rows": [
        [
          "Legitimate interest",
          "send",
          "send",
          "nurture",
          "suppress"
        ],
        [
          "Consent required",
          "hold",
          "hold",
          "hold",
          "suppress"
        ],
        [
          "Unknown",
          "hold",
          "hold",
          "hold",
          "suppress"
        ],
        [
          "Blocked",
          "suppress",
          "suppress",
          "suppress",
          "suppress"
        ]
      ]
    },
    "built": [
      "Built rules for excluding leads, checking country policy and deciding what happens next.",
      "Checked that the model’s supporting quotes actually appear in the source record.",
      "Tested the rules against missing evidence and a deliberately manipulated AI response."
    ],
    "tradeoff": {
      "title": "Being too cautious can break the tool too.",
      "body": "An early rule distrusted any answer that cited a prospect’s form. That also caught good leads whose job title came from the same form. I changed the rule to ask whether independent evidence backed the answer, instead of rejecting it for containing one form field."
    },
    "highlight": {
      "title": "What if the AI follows a malicious instruction?",
      "body": "I tested a response that gave a planted lead perfect scores and a forged source label. The code still put it on hold. The model could suggest a score, but it could not bypass the final rules."
    },
    "evidence": [
      {
        "metric": "92% vs 42%",
        "text": "tier agreement against hand-written labels, versus a headcount baseline, on the first live run.",
        "limit": "12 synthetic leads; labels are the team’s judgement, not outcomes."
      },
      {
        "metric": "100%",
        "text": "injection resistance and provenance coverage on the same run, for $0.0103 total.",
        "limit": "One run."
      },
      {
        "metric": "10 / 10",
        "text": "deterministic gates pass offline with no keys and no network.",
        "limit": null
      }
    ],
    "limits": [
      "The build does not send by default. The connection that writes decisions back to Unify is not verified.",
      "The suppression-list integration is still a placeholder.",
      "The country rules need review before real outreach; they are not legal advice."
    ],
    "stack": [
      "Python",
      "OpenAI structured outputs",
      "FastAPI",
      "Unify",
      "n8n"
    ],
    "skills": [
      "structured-outputs",
      "citation-gates",
      "injection-defence",
      "human-gates",
      "eval-harnesses",
      "contamination",
      "spend-controls",
      "fastapi"
    ],
    "question": "Should this email go out, or should someone take a look first?"
  }
];

export const skillGroups = [
  {
    "title": "Agents and LLM systems",
    "skills": [
      {
        "id": "langgraph",
        "name": "LangGraph"
      },
      {
        "id": "structured-outputs",
        "name": "Structured outputs"
      },
      {
        "id": "query-planning",
        "name": "Query planning"
      },
      {
        "id": "model-tiering",
        "name": "Model selection"
      },
      {
        "id": "mcp",
        "name": "MCP"
      }
    ]
  },
  {
    "title": "Retrieval and evidence",
    "skills": [
      {
        "id": "vector-search",
        "name": "Vector search"
      },
      {
        "id": "citation-gates",
        "name": "Citation checking"
      },
      {
        "id": "abstention",
        "name": "Answer validation"
      },
      {
        "id": "grounding",
        "name": "Retrieval-augmented generation (RAG)"
      }
    ]
  },
  {
    "title": "Evaluation and reliability",
    "skills": [
      {
        "id": "eval-harnesses",
        "name": "AI evaluation"
      },
      {
        "id": "contamination",
        "name": "Evaluation data quality"
      },
      {
        "id": "regression-reporting",
        "name": "Regression testing"
      }
    ]
  },
  {
    "title": "Data engineering",
    "skills": [
      {
        "id": "pipelines",
        "name": "Data pipelines"
      },
      {
        "id": "geospatial",
        "name": "Geospatial analysis"
      },
      {
        "id": "postgres",
        "name": "Postgres and PostGIS"
      },
      {
        "id": "sql",
        "name": "SQL"
      },
      {
        "id": "entity-resolution",
        "name": "Entity matching"
      }
    ]
  },
  {
    "title": "Backend and frontend",
    "skills": [
      {
        "id": "fastapi",
        "name": "Python · FastAPI"
      },
      {
        "id": "websockets",
        "name": "WebSockets"
      },
      {
        "id": "serverless-jobs",
        "name": "Background jobs"
      },
      {
        "id": "react",
        "name": "React"
      },
      {
        "id": "nextjs",
        "name": "Next.js and TypeScript"
      },
      {
        "id": "adapter-boundaries",
        "name": "API integration"
      },
      {
        "id": "docker",
        "name": "Docker"
      }
    ]
  },
  {
    "title": "Safety, testing and delivery",
    "skills": [
      {
        "id": "human-gates",
        "name": "Human review workflows"
      },
      {
        "id": "injection-defence",
        "name": "Prompt-injection defence"
      },
      {
        "id": "pii-licensing",
        "name": "Data privacy and licensing"
      },
      {
        "id": "spend-controls",
        "name": "API cost controls"
      },
      {
        "id": "python-testing",
        "name": "pytest"
      },
      {
        "id": "js-testing",
        "name": "Vitest and node --test"
      },
      {
        "id": "ci-gates",
        "name": "GitHub Actions"
      },
      {
        "id": "staged-review",
        "name": "AI-assisted development"
      }
    ]
  }
];

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));
export const skillById = Object.fromEntries(skillGroups.flatMap((g) => g.skills).map((s) => [s.id, s]));
