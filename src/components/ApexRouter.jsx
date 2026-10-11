import { useId, useState } from 'react';
import { decideLead, basisFor, APEX_PRESETS, APEX_COUNTRIES, TIER_A_MIN, TIER_B_MIN } from '../lib/mechanisms';

const GATE_LABEL = { send: 'send', hold_for_approval: 'hold for approval', suppress: 'suppress', nurture: 'nurture' };
const BASIS_LABEL = { legitimate_interest: 'legitimate interest', consent_required: 'consent required', unknown: 'unknown' };
const EVIDENCE = [
  ['independent', 'Independent enrichment quotes'],
  ['prospect', 'Only prospect-written form fields'],
  ['none', 'None (every quote failed verification)'],
];

function Radios({ legend, name, value, options, onChange }) {
  return (
    <fieldset className="radios">
      <legend>{legend}</legend>
      {options.map(([v, label]) => (
        <label key={v}>
          <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
          <span>{label}</span>
        </label>
      ))}
    </fieldset>
  );
}

export default function ApexRouter() {
  const uid = useId();
  const [lead, setLead] = useState(APEX_PRESETS[0].lead);
  const set = (k) => (v) => setLead((l) => ({ ...l, [k]: v }));
  const d = decideLead(lead);
  const presetId = APEX_PRESETS.find((p) => JSON.stringify(p.lead) === JSON.stringify(lead))?.id;
  // Remount the result on every distinct decision so its entrance replays.
  const key = JSON.stringify(d);

  return (
    <section className="router" aria-labelledby={`${uid}-t`}>
      <header className="scene-head">
        <h3 id={`${uid}-t`} className="scene-title">Try the gate</h3>
        <p className="scene-label">A fictional lead. The rules are APEX-1’s, ported line for line from its code. Nothing is sent, and the basis table is not legal advice.</p>
      </header>

      <div className="presets" role="group" aria-label="Example leads">
        {APEX_PRESETS.map((p) => (
          <button key={p.id} type="button" className="chip-button" aria-pressed={presetId === p.id} onClick={() => setLead(p.lead)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="router-grid">
        <form className="router-form" onSubmit={(e) => e.preventDefault()}>
          <label className="check">
            <input type="checkbox" checked={lead.disqualified} onChange={(e) => set('disqualified')(e.target.checked)} />
            <span>Disqualifier hit (competitor, existing customer or suppression list)</span>
          </label>
          <div className="field">
            <label htmlFor={`${uid}-c`}>Lead’s country</label>
            <select id={`${uid}-c`} value={lead.country} onChange={(e) => set('country')(e.target.value)}>
              {APEX_COUNTRIES.map(([c, label]) => <option key={c || 'none'} value={c}>{label}</option>)}
            </select>
            <span className="hint">Lawful basis: {BASIS_LABEL[basisFor(lead.country)]}</span>
          </div>
          <div className="field">
            <label htmlFor={`${uid}-s`}>Model’s fit score: <output>{lead.score}</output></label>
            <input id={`${uid}-s`} type="range" min="0" max="100" step="5" value={lead.score}
              onChange={(e) => set('score')(Number(e.target.value))} disabled={lead.disqualified} />
            <span className="hint">Tier A from {TIER_A_MIN}, B from {TIER_B_MIN}. Code computes the score from the model’s four dimension scores.</span>
          </div>
          <Radios legend="Model’s self-reported confidence" name={`${uid}-conf`} value={lead.confidence}
            options={[['high', 'High'], ['medium', 'Medium'], ['low', 'Low']]} onChange={set('confidence')} />
          <Radios legend="Evidence that survived quote verification" name={`${uid}-ev`} value={lead.evidence}
            options={EVIDENCE} onChange={set('evidence')} />
        </form>

        <div className="router-result" id={`${uid}-r`} tabIndex={-1} aria-live="polite">
          <p className="result-caption">Decision written back as <code>ai_gate</code></p>
          <p key={key} className="gate-result" data-gate={d.gate}>{GATE_LABEL[d.gate]}</p>
          <p className="result-meta">
            Tier {d.tier} · confidence {d.confidence} · {d.modelCalled ? 'model called once' : 'no model call, zero tokens'}
          </p>
          <ol key={`t-${key}`} className="trail" aria-label="Rules applied, in order">
            {d.trail.map((t, i) => (
              <li key={i} style={{ '--i': i }}><strong>{t.rule}</strong><span>{t.effect}</span></li>
            ))}
          </ol>
        </div>

        {/* Narrow screens only: the full result sits above the form, so keep the decision in view while editing. */}
        <div className="router-summary">
          <span><span className="visually-hidden">Decision: </span><strong data-gate={d.gate}>{GATE_LABEL[d.gate]}</strong></span>
          <button type="button" className="chip-button" onClick={() => {
            const r = document.getElementById(`${uid}-r`);
            r.scrollIntoView({ block: 'start' });
            r.focus({ preventScroll: true });
          }}>Show why<span aria-hidden="true"> ↑</span></button>
        </div>
      </div>
    </section>
  );
}
