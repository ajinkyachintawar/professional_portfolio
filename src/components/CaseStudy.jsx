import Flow from './Flow';
import EvidenceGate from './EvidenceGate';
import ApexRouter from './ApexRouter';

const DEMOS = { adversarialci: () => <EvidenceGate showLink={false} />, 'apex-1': ApexRouter };
import { ProjectStatus, ExternalLink } from './bits';
import { projects, projectById, skillById } from '../content';
import { projectHref } from '../lib/route';

function GateTable({ gate }) {
  return (
    <div className="table-wrap" role="region" aria-label="Gate table" tabIndex={0}>
      <table className="gate-table">
        <caption>{gate.caption}</caption>
        <thead>
          <tr><th scope="col">Basis \ tier</th>{gate.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
        </thead>
        <tbody>
          {gate.rows.map(([basis, ...cells]) => (
            <tr key={basis}>
              <th scope="row">{basis}</th>
              {cells.map((c, i) => <td key={i} data-gate={c}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ id, title, children }) {
  return (
    <section className="cs-block" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}

export default function CaseStudy({ id }) {
  const p = projectById[id];
  if (!p) {
    return (
      <div className="case-study">
        <h1 id="case-title" tabIndex={-1}>Project not found</h1>
        <p>There is no project at this address. <a href="#projects">See all projects</a>.</p>
      </div>
    );
  }
  const Demo = DEMOS[p.id];
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="case-study" aria-labelledby="case-title">
      <a className="back-link" href="#projects"><span aria-hidden="true">← </span>All projects</a>

      <header className="cs-header">
        <h1 id="case-title" tabIndex={-1} className="vt-title">{p.name}</h1>
        <p className="cs-tagline">{p.tagline}</p>
        <div className="meta-row">
          <ProjectStatus status={p.status} />
          <span className="meta">{p.context}</span>
        </div>
        <p className="cs-summary">{p.summary}</p>
        {p.links.length > 0 && (
          <div className="actions">
            {p.links.map((l, n) => (
              <ExternalLink key={l.href} href={l.href} className={n === 0 ? 'button button-primary' : 'button'}>
                {l.label}<span aria-hidden="true"> ↗</span>
              </ExternalLink>
            ))}
          </div>
        )}
        {p.linksNote && <p className="note">{p.linksNote}</p>}
      </header>

      <div className="cs-body">
        <div className="cs-pair">
          <Block id="cs-problem" title="What I wanted to solve"><p>{p.problem}</p></Block>
          <Block id="cs-audience" title="Who it’s for"><p>{p.audience}</p></Block>
        </div>


        {p.highlight && (
          <section className="highlight" aria-labelledby="cs-highlight">
            <h2 id="cs-highlight">{p.highlight.title}</h2>
            <p>{p.highlight.body}</p>
          </section>
        )}

        <Block id="cs-built" title="What I built">
          <p className="role">{p.role}</p>
          {p.built && <ul className="bullets">{p.built.map((b) => <li key={b}>{b}</li>)}</ul>}
        </Block>

        <Block id="cs-tradeoff" title="A decision along the way">
          <p className="tradeoff-title">{p.tradeoff.title}</p>
          <p>{p.tradeoff.body}</p>
        </Block>

        {Demo && <Block id="cs-demo-title" title="Try it for yourself">
          <p>{p.id === 'adversarialci' ? 'Watch a sample comparison go wrong, then see how the checks catch it. The companies are fictional.' : 'Change the example lead and see why the decision changes. This is a simulation; it sends nothing.'}</p>
          <div className="cs-demo"><Demo /></div>
        </Block>}

        <details className="technical-details">
          <summary>Go deeper: how it works and what I tested</summary>
          <div className="technical-content">
        <Block id="cs-how" title="How it works">
          <Flow steps={p.flow} detail label={`${p.name} pipeline, step by step`} />
          {p.gate && <GateTable gate={p.gate} />}
        </Block>
        <Block id="cs-evidence" title="What I tested">
          {p.evidence.length ? (<>
            <ul className="evidence">
              {p.evidence.map((e) => (
                <li key={e.text}>
                  <span className="evidence-metric">{e.metric}</span>
                  <span className="evidence-text">{e.text}</span>
                  {e.limit && <span className="evidence-limit">Scope: {e.limit}</span>}
                </li>
              ))}
            </ul>
            <p className="note">These results come from the project’s recorded tests. The sample sizes and limits matter when reading them.</p>
          </>) : (
            <p className="note">I haven’t published a measured evaluation for this project yet.</p>
          )}
        </Block>

          </div>
        </details>

        <Block id="cs-limits" title="Where it stands">
          <p><ProjectStatus status={p.status} /></p>
          <ul className="bullets">{p.limits.map((l) => <li key={l}>{l}</li>)}</ul>
        </Block>

        <Block id="cs-stack" title="Tools and skills">
          <ul className="tags" aria-label="Stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          <p className="skills-line">
            Also used: {' '}
            {p.skills.map((s, n) => (
              <span key={s}>
                <a href={`#skill-${s}`}>{skillById[s].name}</a>{n < p.skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </Block>
      </div>

      <nav className="cs-pager" aria-label="More projects">
        <a href={projectHref(prev.id)}><span className="pager-dir">Previous</span>{prev.name}</a>
        <a href={projectHref(next.id)}><span className="pager-dir">Next</span>{next.name}</a>
      </nav>
    </article>
  );
}
