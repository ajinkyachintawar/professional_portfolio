const KINDS = {
  data: { label: 'Data', meaning: 'Sources, retrieval and stored records' },
  model: { label: 'Model', meaning: 'An LLM proposes: extraction, judgement, drafting' },
  code: { label: 'Code', meaning: 'Deterministic checks that make no model calls' },
  human: { label: 'Person', meaning: 'A human decides or approves' },
  output: { label: 'Result', meaning: 'What leaves the system' },
};

// Authored 16px glyphs, 1.5 stroke, one per step kind.
const GLYPHS = {
  data: <><ellipse cx="8" cy="4" rx="5" ry="2" /><path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4M3 8c0 1.1 2.2 2 5 2s5-.9 5-2" /></>,
  model: <path d="M8 1.5c.5 3.2 2.3 5 5.5 5.5-3.2.5-5 2.3-5.5 5.5-.5-3.2-2.3-5-5.5-5.5C5.7 6.5 7.5 4.7 8 1.5Z" />,
  code: <><rect x="2" y="2" width="12" height="12" rx="3" /><path d="m5.2 8.2 1.9 1.9 3.7-4" /></>,
  human: <><circle cx="8" cy="5" r="2.6" /><path d="M2.8 14c.6-2.8 2.6-4.3 5.2-4.3s4.6 1.5 5.2 4.3" /></>,
  output: <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />,
};

export function KindIcon({ kind }) {
  return (
    <svg className="kind-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {GLYPHS[kind]}
    </svg>
  );
}

export default function Flow({ steps, detail = false, label }) {
  return (
    <ol className={detail ? 'flow flow-detail' : 'flow flow-compact'} aria-label={label}>
      {steps.map((s) => (
        <li key={s.label} className="step" data-kind={s.kind}>
          <span className="step-kind">
            <KindIcon kind={s.kind} />
            {KINDS[s.kind].label}
          </span>
          <span className="step-label">{s.label}</span>
          {detail && <p className="step-note">{s.note}</p>}
        </li>
      ))}
    </ol>
  );
}

export function FlowKey() {
  return (
    <dl className="flow-key">
      {Object.entries(KINDS).map(([kind, k]) => (
        <div key={kind} className="key-row" data-kind={kind}>
          <dt><span className="step-kind"><KindIcon kind={kind} />{k.label}</span></dt>
          <dd>{k.meaning}</dd>
        </div>
      ))}
    </dl>
  );
}
