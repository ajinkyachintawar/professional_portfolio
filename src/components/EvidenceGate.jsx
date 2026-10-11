import { useEffect, useRef, useState } from 'react';
import { KindIcon } from './Flow';
import { resolveClaims, recomputeConfidence, checkVerdict, GATE_SAMPLE as S } from '../lib/mechanisms';
import { prefersReducedMotion, onReducedMotion, useInView } from '../lib/motion';
import { projectHref } from '../lib/route';

// Every number and message below is computed by the ported rules, not typed in.
const resolved = resolveClaims(S.claims, S.chunks);
const dropped = resolved.filter((c) => !c.kept).length;
const { perDimension, winner: declared, judgeConfidence } = S.judged;
const recomputed = recomputeConfidence(perDimension, declared);
const failures = checkVerdict({ perDimension, winner: declared, confidence: recomputed });
const finalWinner = S.reasked.winner;
const finalConfidence = recomputeConfidence(perDimension, finalWinner);
const finalFailures = checkVerdict({ perDimension, winner: finalWinner, confidence: finalConfidence });
const short = (v) => v.replace('Vendor ', '');

const STAGES = [
  { kind: 'model', title: 'Claims extracted', text: `The model proposes ${S.claims.length} claims, each citing evidence IDs.` },
  { kind: 'code', title: 'Citation gate', text: `Code drops every claim whose IDs do not all resolve to that vendor’s stored chunks: ${dropped} of ${S.claims.length} are dropped. No model call.` },
  { kind: 'model', title: 'Judge rules', text: `Per dimension: ${perDimension.map((d) => `${d.dimension} → ${short(d.winner)}`).join(', ')}. The judge declares ${declared}, ${judgeConfidence}% confident.` },
  { kind: 'code', title: 'Confidence recomputed', text: `The judge’s ${judgeConfidence} is discarded. ${declared} won ${perDimension.filter((d) => d.winner === declared).length} of ${perDimension.length} dimensions, so ${recomputed}.` },
  { kind: 'code', title: 'Consistency check fires', text: `${failures[0]}. The verdict is not accepted.` },
  { kind: 'model', title: 'Re-asked once', text: `The failure is quoted back to the judge. Here it returns ${finalWinner} at ${finalConfidence}% and every check passes. A second failure would be saved, flagged inconsistent.` },
];
const LAST = STAGES.length - 1;
const GATE = 1, JUDGE = 2, RECOMPUTE = 3, CHECK = 4, REASK = 5;

export default function EvidenceGate({ showLink = true }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  // Reduced motion: no autoplay; start on the finished state, which carries the whole explanation.
  const [step, setStep] = useState(() => (prefersReducedMotion() ? LAST : 0));
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const running = playing && step < LAST;

  // Reduced motion switched on mid-run: stop timed progression and show the finished
  // state, which carries the whole explanation. Manual stepping still works.
  useEffect(() => onReducedMotion(() => { setPlaying(false); setStep(LAST); }), []);

  useEffect(() => {
    if (!running || !inView) return; // off-screen: the timer simply is not scheduled
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1600 : 2200);
    return () => clearTimeout(t);
  }, [running, inView, step]);

  // Under reduced motion, Play/Replay shows the finished state instead of animating through it.
  const play = () => {
    if (prefersReducedMotion()) { setStep(LAST); return; }
    if (step >= LAST) setStep(0);
    setPlaying(true);
  };
  const next = () => { setPlaying(false); setStep((s) => Math.min(s + 1, LAST)); };
  const restart = () => { setPlaying(false); setStep(0); };

  return (
    <figure className="gate-scene" ref={ref} data-step={step} aria-labelledby="gate-scene-title">
      <figcaption className="scene-head">
        <span id="gate-scene-title" className="scene-title">AdversarialCI: the evidence gate</span>
        <span className="scene-label">Sample run · fictional vendors · real rules ported from the project</span>
      </figcaption>

      <ul className="claims" aria-label="Claims">
        {resolved.map((c, i) => {
          const state = step < GATE ? 'idle' : c.kept ? 'kept' : 'dropped';
          return (
            <li key={c.id} className="claim" data-state={state} style={{ '--i': i }}>
              <span className="vendor" data-vendor={short(c.company)} aria-label={c.company}>{short(c.company)}</span>
              <span className="claim-body">
                <span className="claim-text"><span className="claim-dim">{c.dimension}</span> {c.text}</span>
                {state === 'dropped' && <span className="claim-reason">Dropped: {c.reason}</span>}
              </span>
              <span className="claim-ids">
                {c.ids.length ? c.ids.map((id) => <code key={id}>{id}</code>) : <code className="none">None</code>}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="verdict" data-visible={step >= JUDGE}>
        <ul className="dims" aria-label="Per-dimension winners">
          {perDimension.map((d) => (
            <li key={d.dimension}><span>{d.dimension}</span><span className="vendor" data-vendor={short(d.winner)}>{short(d.winner)}</span></li>
          ))}
        </ul>
        <div className="verdict-lines">
          <p className="verdict-line" data-struck={step >= CHECK}>
            Judge: <strong>{declared}</strong>{' '}
            <span className="conf">
              <s data-on={step >= RECOMPUTE}>{judgeConfidence}%</s>
              {step >= RECOMPUTE && <span className="conf-new"> {recomputed}%</span>}
            </span>
          </p>
          {step >= CHECK && <p className="verdict-fail">{failures[0]}</p>}
          {step >= REASK && (
            <p className="verdict-final">
              Re-ask: <strong>{finalWinner}</strong> {finalConfidence}% · {finalFailures.length ? 'still inconsistent' : 'checks pass'}
            </p>
          )}
        </div>
      </div>

      <ol className="stages" aria-label="Stages">
        {STAGES.map((s, i) => (
          <li key={s.title} data-kind={s.kind} data-state={i < step ? 'done' : i === step ? 'current' : 'todo'}
            aria-current={i === step ? 'step' : undefined}>
            <span className="step-kind"><KindIcon kind={s.kind} />{s.title}</span>
          </li>
        ))}
      </ol>
      <p className="narration" aria-live="polite">{STAGES[step].text}</p>

      <div className="scene-controls">
        {/* One element per control, and aria-disabled rather than disabled, so keyboard focus never drops to the page. */}
        <button type="button" className="button" onClick={running ? () => setPlaying(false) : play}>
          {running ? 'Pause' : step >= LAST ? 'Replay' : 'Play'}
        </button>
        <button type="button" className="button" onClick={next} aria-disabled={step >= LAST}>Next step</button>
        <button type="button" className="button" onClick={restart} aria-disabled={step === 0 && !running}>Restart</button>
        {showLink && <a className="text-link scene-link" href={projectHref('adversarialci')}>How the real system works<span aria-hidden="true"> →</span></a>}
      </div>
    </figure>
  );
}
