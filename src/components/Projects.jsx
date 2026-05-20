function FlowStrip({ steps }) {
  return (
    <div className="flow-strip">
      {steps.map(({ num, label }) => (
        <div key={num} className="fs-step">
          <span className="fs-num">{num}</span>
          <span className="fs-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function StackChips({ items }) {
  return (
    <ul className="stack-chips">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function Evidence({ items }) {
  return (
    <ul className="evidence">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section" data-screen-label="03 Projects">
      <span className="section-label"><span className="num">02</span>Selected Projects</span>
      <h2>Work that says more than a résumé bullet.</h2>
      <p style={{ maxWidth: '54ch', color: 'var(--ink-soft)', marginBottom: '8px' }}>
        Four projects, ordered by what they show. The first is the lede — the project
        I'd point to first — and gets the full essay treatment. The other three are
        shorter; they fill in how I think about orchestration, tooling and applied ML.
      </p>

      <div className="projects">

        {/* 01 — AdversarialCI */}
        <article className="project">
          <span className="status" data-state="published">Published · ScienceOpen preprint</span>
          <span className="tag-label">Featured build / Multi-agent benchmark, 87.9% accuracy</span>
          <div className="project-head">
            <h3>AdversarialCI<span className="sub">Multi-agent competitive intelligence</span></h3>
            <span className="project-num">01 / 04</span>
          </div>
          <p className="descriptor">
            A multi-agent system that argues with itself before it speaks. Researcher proposes,
            adversary attacks, synthesiser settles, evaluated at 87.9% accuracy on a benchmark
            I built alongside it.
          </p>
          <div className="project-meta">
            <span className="pill">Multi-agent CI</span>
            <span className="sep" />
            <a href="https://adversarialci-platform.vercel.app/" target="_blank" rel="noopener noreferrer">Live platform ↗</a>
            <a href="https://github.com/ajinkyachintawar/adversarialci-platform" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://deepwiki.com/ajinkyachintawar/adversarialci-platform" target="_blank" rel="noopener noreferrer">Chat with repo ↗</a>
            <a href="https://www.scienceopen.com/hosted-document?doi=10.14293/PR2199.003028.v1" target="_blank" rel="noopener noreferrer">ScienceOpen preprint</a>
          </div>
          <div className="body">
            <h4 className="sub-h">Problem</h4>
            <p>
              Competitive intelligence is usually one analyst, one tab, one bias. The output
              reads like a press release a week late, and the failure modes (a confident wrong
              claim, a missed signal) only show up once a stakeholder has acted on it. I wanted
              a system that argued with itself before it spoke.
            </p>

            <h4 className="sub-h">Approach</h4>
            <p>
              A three-agent setup with explicit roles: a Researcher gathers and proposes claims;
              an Adversary attacks each claim with the strongest counter it can find; a Synthesiser
              holds the receipts and writes the final answer. No agent talks to another agent directly.
            </p>

            <h4 className="sub-h">Architecture</h4>
            <p>
              Coordination is mediated through a shared JSON state acting as the single source
              of truth, with an event log behind it. Each agent reads from the state, takes a
              single action, and writes the result back; the orchestrator decides what runs next.
              Every transition is recordable and replayable.
            </p>

            <h4 className="sub-h">Technical decisions</h4>
            <ol className="decisions">
              <li>Built the evaluation harness before the model. The benchmark told me when a change was real and when it was noise; no improvement got merged without it.</li>
              <li>No direct agent-to-agent calls. All coordination flows through the shared state, so every claim has an audit trail and a replay path.</li>
              <li>Separated retrieval from reasoning. The Researcher fetches; the Synthesiser argues. Mixing the two was the single biggest source of confident wrong answers in early versions.</li>
              <li>Cited outputs only. The final answer carries the claim, the counter and the chosen resolution, so a reader can disagree with the synthesis without re-running the system.</li>
            </ol>

            <h4 className="sub-h">Stack</h4>
            <StackChips items={['Python', 'LangChain', 'MongoDB Atlas', 'FastAPI', 'OpenAI', 'Claude API', 'pytest']} />

            <figure className="pull-quote">
              The harness was the actual product.
              <span className="pq-attr">On building AdversarialCI</span>
            </figure>

            <h4 className="sub-h">Outcome</h4>
            <p>
              87.9% accuracy on the held-out test set. The harness was the actual product:
              it told me when a change was real and when it was noise. Methodology, ablations
              and limitations are spelled out in the preprint.
            </p>

            <h4 className="sub-h">What it shows</h4>
            <p>
              I can take a research question, build the evaluation before the model, and ship
              the writeup. Most of the work was deciding what to measure.
            </p>

            <h4 className="sub-h">System flow</h4>
            <FlowStrip steps={[
              { num: '01', label: 'Question' },
              { num: '02', label: 'Researcher' },
              { num: '03', label: 'Adversary' },
              { num: '04', label: 'Synthesiser' },
              { num: '05', label: 'Cited report' },
            ]} />

            <h4 className="sub-h">Evidence</h4>
            <Evidence items={[
              'ScienceOpen preprint with methodology, ablations and limitations',
              '87.9% accuracy on a held-out benchmark built for the system',
              'Shared-state architecture, no direct agent-to-agent calls',
              'Reproducible evaluation harness checked in alongside the code',
            ]} />
          </div>
        </article>

        {/* 02 — Smartbox Pipeline */}
        <article className="project short">
          <span className="status" data-state="production">In production</span>
          <span className="tag-label">Production workflow / Content automation with HITL</span>
          <div className="project-head">
            <h3>Smartbox Pipeline<span className="sub">16-node n8n content automation</span></h3>
            <span className="project-num">02 / 04</span>
          </div>
          <p className="descriptor">
            An orchestrated content workflow with one deliberate human checkpoint, placed at
            the moment the cost of a wrong call actually goes up.
          </p>
          <div className="project-meta">
            <span className="pill">Orchestration</span>
            <span className="sep" />
            <span className="pill">Human-in-the-Loop</span>
          </div>
          <div className="body">
            <p>
              A content workflow that ran on tabs and Slack messages with every step working
              but the seams between them failing. The fix was sixteen nodes in n8n, Llama on
              Groq for the cheap fast turns, and one deliberate Human-in-the-Loop gate placed
              at the moment the cost of a wrong call goes up. The gate isn't a bottleneck;
              it's the only place a person needs to look.
            </p>
            <h4 className="sub-h">Stack</h4>
            <StackChips items={['n8n', 'Groq', 'Llama 3', 'Google Sheets', 'Slack', 'Webhooks']} />
            <h4 className="sub-h">Evidence</h4>
            <Evidence items={[
              '16 nodes, one human gate, zero direct agent-to-agent calls',
              'Structured JSON between every step; replayable execution log',
              'Slack-native notifications for the gate; nothing new to learn',
            ]} />
          </div>
        </article>

        {/* 03 — ireland-grocery-mcp */}
        <article className="project short">
          <span className="status" data-state="open-source">Open source</span>
          <span className="tag-label">Open source / Tooling for agents</span>
          <div className="project-head">
            <h3>ireland-grocery-mcp<span className="sub">MCP server for live grocery cart automation</span></h3>
            <span className="project-num">03 / 04</span>
          </div>
          <p className="descriptor">
            A small, honest set of MCP tools that lets an LLM fill an Irish grocery basket
            the way a person would, not the way a scraper does.
          </p>
          <div className="project-meta">
            <span className="pill">MCP server</span>
            <span className="sep" />
            <a href="https://github.com/ajinkyachintawar/ireland-grocery-mcp" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://deepwiki.com/ajinkyachintawar/ireland-grocery-mcp" target="_blank" rel="noopener noreferrer">Chat with repo ↗</a>
          </div>
          <div className="body">
            <p>
              Live grocery prices in Ireland are scattered across three or four retailers with
              hostile interfaces. I wanted an LLM to be able to fill a basket the way a person
              would, without dumping HTML on the model. The answer was a four-verb MCP tool
              surface (search, add, swap, total) backed by isolated Playwright sessions behind
              a FastAPI shell. Retailers change their markup weekly; the tool contracts don't.
            </p>
            <h4 className="sub-h">Stack</h4>
            <StackChips items={['Python', 'FastAPI', 'Playwright', 'MCP', 'Docker', 'asyncio']} />
            <h4 className="sub-h">Evidence</h4>
            <Evidence items={[
              'Four-verb tool surface: search, add, swap, total',
              'Per-retailer Playwright sessions, isolated and restartable',
              'Works with any MCP-aware client out of the box',
            ]} />
          </div>
        </article>

        {/* 04 — Wellbore Geology */}
        <article className="project short">
          <span className="status" data-state="competition">Kaggle · Top ≈ 2%</span>
          <span className="tag-label">Competition / Top-tier finish</span>
          <div className="project-head">
            <h3>Wellbore Geology<span className="sub">Kaggle ensemble, LB 10.728, rank ≈ 32</span></h3>
            <span className="project-num">04 / 04</span>
          </div>
          <p className="descriptor">
            A LightGBM / XGBoost / CatBoost ensemble for predicting geological properties
            from messy wellbore data. Most of the work was in the cross-validation, not the stack.
          </p>
          <div className="project-meta">
            <span className="pill">Applied ML</span>
            <span className="sep" />
            <span className="pill">Top ≈ 2%</span>
          </div>
          <div className="body">
            <p>
              A standard gradient-boosted ensemble of three complementary boosters, blended
              on out-of-fold predictions, not the test set. The work that moved the score
              wasn't the stack; it was three weeks of tightening cross-validation so I could
              trust an improvement when I saw one. The final submission was the one CV had
              been pointing to for a week.
            </p>
            <h4 className="sub-h">Stack</h4>
            <StackChips items={['Python', 'LightGBM', 'XGBoost', 'CatBoost', 'scikit-learn', 'pandas']} />
            <h4 className="sub-h">Evidence</h4>
            <Evidence items={[
              'Three-model gradient-boosted blend on out-of-fold predictions',
              'Tightened cross-validation as the actual scoring lever',
              'LB 10.728, finish rank ≈ 32 (top ≈ 2%)',
            ]} />
          </div>
        </article>

      </div>

      <p className="kicker">
        Four projects, four ways of asking the same question: how do you build something
        that survives contact with a real user, a real budget, and a real shift rota.
      </p>
    </section>
  );
}
