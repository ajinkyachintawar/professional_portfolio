export default function HowIWork() {
  return (
    <section id="how" className="how" data-screen-label="04 How I Work">
      <span className="section-label"><span className="num">03</span>How I Work</span>
      <h2>Habits from sitting next to the operation.</h2>
      <p style={{ maxWidth: '54ch', color: 'var(--ink-soft)', marginBottom: '40px' }}>
        Before the models, before the dashboards, three habits that survived contact with
        real users, real budgets and a real shift rota.
      </p>

      <div className="habit">
        <h3>Analytics-first</h3>
        <p>
          I start with the question, then the dataset, then the metric. Models come last,
          and only after I can describe the answer I'd accept and the answer I wouldn't.
          Most of the leverage in any project is in the hour spent disagreeing about what
          to measure, and I'd rather lose that hour at the start than ten of them at the end.
        </p>
      </div>

      <div className="habit">
        <h3>Agentic orchestration</h3>
        <p>
          I treat agents the way I treat coworkers: give them a narrow job, an honest set
          of tools, and a way to escalate when they're stuck. Big monolithic prompts are a
          smell. The interesting design work is in the seams: who hands off to whom, and
          what the receipt looks like when they do.
        </p>
      </div>

      <div className="habit">
        <h3>Shipping under constraint</h3>
        <p>
          I'd rather have a small, working version next week than a polished plan next month.
          Constraint is a feature: the budget, the latency target, the one analyst who has to
          maintain it after I'm gone. Designs that ignore those constraints are decoration;
          designs that absorb them tend to age well.
        </p>
      </div>

      <p className="closing">
        The operational background is the analytics background. Numbers behave when the
        system around them behaves; I try to design both.
      </p>
    </section>
  );
}
