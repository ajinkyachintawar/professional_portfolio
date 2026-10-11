// Run: npm test. Expected values come from the source projects' own rules.
import assert from 'node:assert/strict';
import { resolveClaims, recomputeConfidence, checkVerdict, GATE_SAMPLE, apexDecide, APEX_PRESETS, decideLead, basisFor } from './mechanisms.js';

// AdversarialCI gate: no ids, unknown id, and another company's id all drop.
const r = resolveClaims(GATE_SAMPLE.claims, GATE_SAMPLE.chunks);
assert.deepEqual(r.filter((c) => c.kept).map((c) => c.id), [1, 3, 5, 7]);
assert.match(r[1].reason, /a9 is not a stored chunk/);
assert.match(r[3].reason, /a1 is a Vendor A chunk/);
assert.equal(r[5].reason, 'Cites no evidence');
assert.equal(resolveClaims([{ company: 'Vendor A', ids: ['a1', 'a9'] }], GATE_SAMPLE.chunks)[0].kept, false, 'all ids must resolve');

// Confidence recompute and the consistency check.
const { perDimension, winner } = GATE_SAMPLE.judged;
assert.equal(recomputeConfidence(perDimension, 'Vendor A'), 33);
assert.equal(recomputeConfidence(perDimension, 'Vendor B'), 67);
const fails = checkVerdict({ perDimension, winner, confidence: recomputeConfidence(perDimension, winner) });
assert.equal(fails.length, 1);
assert.match(fails[0], /Vendor A does not win the most dimensions/);
assert.deepEqual(checkVerdict({ perDimension, winner: 'Vendor B', confidence: 67 }), []);
assert.equal(checkVerdict({ perDimension, winner: 'Vendor B', confidence: 80 }).length, 1, 'stated confidence must match formula');
assert.deepEqual(checkVerdict({ perDimension: [{ dimension: 'x', winner: 'A' }, { dimension: 'y', winner: 'B' }], winner: 'B', confidence: 50 }), [], 'ties allowed');

// APEX-1 gate table, high confidence (README §2).
const lead = (o) => apexDecide({ disqualified: false, basis: 'legitimate_interest', score: 85, confidence: 'high', evidence: 'independent', ...o });
const table = {
  legitimate_interest: ['send', 'send', 'nurture'],
  consent_required: ['hold_for_approval', 'hold_for_approval', 'hold_for_approval'],
  unknown: ['hold_for_approval', 'hold_for_approval', 'hold_for_approval'],
  blocked: ['suppress', 'suppress', 'suppress'],
};
for (const [basis, gates] of Object.entries(table)) {
  [85, 50, 20].forEach((score, i) => assert.equal(lead({ basis, score }).gate, gates[i], `${basis} @ ${score}`));
}
// Disqualified: suppress with no model call.
const dq = decideLead(APEX_PRESETS[3].lead);
assert.equal(dq.gate, 'suppress'); assert.equal(dq.modelCalled, false);
// Trust checks: prospect-only or no surviving evidence on a send-grade score → low → hold.
assert.equal(lead({ evidence: 'prospect', score: 100 }).gate, 'hold_for_approval');
assert.equal(lead({ evidence: 'prospect', score: 100 }).tier, 'B');
assert.equal(lead({ evidence: 'none', score: 60 }).gate, 'hold_for_approval');
assert.equal(lead({ evidence: 'none', score: 60 }).tier, 'C');
// Below send grade, the trust checks do not apply.
assert.equal(lead({ evidence: 'none', score: 30 }).gate, 'nurture');
// Model's own low confidence also holds; basis still dominates.
assert.equal(lead({ confidence: 'low' }).gate, 'hold_for_approval');
assert.equal(lead({ confidence: 'low', basis: 'blocked' }).gate, 'suppress');
assert.equal(basisFor('DE'), 'consent_required'); assert.equal(basisFor(''), 'unknown'); assert.equal(basisFor('JP'), 'unknown');
// Boundaries.
assert.equal(lead({ score: 70 }).tier, 'A'); assert.equal(lead({ score: 69 }).tier, 'B');
assert.equal(lead({ score: 45 }).tier, 'B'); assert.equal(lead({ score: 44 }).gate, 'nurture');
// Presets resolve as their labels claim.
assert.deepEqual(APEX_PRESETS.map((p) => decideLead(p.lead).gate), ['send', 'hold_for_approval', 'hold_for_approval', 'suppress']);

console.log('mechanism checks passed');
