const skills = [
  { cat: 'Languages', items: 'Python, SQL, R' },
  { cat: 'BI & Analytics', items: 'Power BI, BigQuery, Airflow' },
  { cat: 'AI & Agents', items: 'LangChain, n8n, MCP, MongoDB Atlas' },
  { cat: 'Cloud & Infra', items: 'GCP, Docker, FastAPI, Dagster' },
];

export default function Skills() {
  return (
    <section id="skills" data-screen-label="05 Skills">
      <span className="section-label"><span className="num">04</span>Toolbox</span>
      <h2>Tools I reach for often.</h2>

      <dl className="skills-grid">
        {skills.map(({ cat, items }) => (
          <div key={cat} className="skill-cat">
            <dt>{cat}</dt>
            <dd>{items}</dd>
          </div>
        ))}
      </dl>

      <p className="kicker">
        The toolkit changes; the habit doesn't. Pick the thing the team can maintain on
        a Tuesday afternoon when I'm not in the room.
      </p>
    </section>
  );
}
