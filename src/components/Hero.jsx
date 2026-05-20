export default function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <p className="section-tag">Portfolio / Dublin, Ireland</p>
      <h1>I build agentic systems that hold up against real questions.</h1>

      <p className="meta">Ajinkya Chintawar &nbsp;·&nbsp; Data Analyst &amp; AI Builder</p>

      <p>
        Data analyst and AI builder working across Python, SQL and the orchestration layer
        above them. I design multi-agent pipelines with explicit contracts, analytics work
        that earns its place next to operations, and the small unglamorous infrastructure
        that keeps both of them honest.
      </p>

      <p>
        The work I enjoy most lives in the joins: an evaluation harness that catches a
        regression before a stakeholder does, a human checkpoint placed where the cost of
        a wrong call actually goes up, a tool surface narrow enough that a model can use
        it without a paragraph of prompting.
      </p>

      <ul className="hero-bullets">
        <li>Multi-agent competitive intelligence, evaluated and published</li>
        <li>Event-driven analytics pipelines on GCP &amp; n8n</li>
        <li>MCP tool servers for live, real-world data</li>
      </ul>

      <div className="links">
        <a href="#projects">View Projects →</a>
        <a href="#contact">Get in Touch →</a>
      </div>
    </section>
  );
}
