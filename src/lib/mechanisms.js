// Ports of two deterministic layers, kept faithful to the source so the demos
// reproduce real decisions on fictional input. Provenance: docs/content-ledger.md.

// ---------------------------------------------------------------------------
// AdversarialCI: claims/gate.py resolve_claims() and heads/consistency.py _check_buyer()

// A claim survives only if it cites something and every cited id is a stored chunk
// for that claim's company. Zero model calls.
export function resolveClaims(claims, chunksByCompany) {
  return claims.map((c) => {
    const own = chunksByCompany[c.company] || {};
    if (!c.ids.length) return { ...c, kept: false, reason: 'Cites no evidence' };
    const missing = c.ids.find((id) => !(id in own));
    if (missing) {
      const owner = Object.keys(chunksByCompany).find((co) => missing in chunksByCompany[co]);
      return { ...c, kept: false, reason: owner ? `${missing} is a ${owner} chunk, not ${c.company}’s` : `${missing} is not a stored chunk` };
    }
    return { ...c, kept: true, reason: 'Every cited id resolves' };
  });
}

// The judge's own confidence is discarded: round(100 × dims won by the declared winner / dims).
export function recomputeConfidence(perDimension, winner) {
  const won = perDimension.filter((d) => d.winner === winner).length;
  return Math.round((100 * won) / perDimension.length);
}

// Ties allowed: the declared winner must be one of the companies with the most wins.
export function checkVerdict({ perDimension, winner, confidence }) {
  const failures = [];
  const dims = perDimension.map((d) => d.dimension);
  if (new Set(dims).size !== dims.length) failures.push('Duplicated dimensions');
  const wins = {};
  for (const d of perDimension) wins[d.winner] = (wins[d.winner] || 0) + 1;
  const max = Math.max(...Object.values(wins));
  const top = Object.keys(wins).filter((c) => wins[c] === max);
  if (!top.includes(winner)) {
    const tally = Object.entries(wins).map(([c, n]) => `${c} ${n}`).join(', ');
    failures.push(`${winner} does not win the most dimensions (${tally})`);
  }
  const expected = recomputeConfidence(perDimension, winner);
  if (confidence !== expected) failures.push(`Confidence ${confidence} ≠ ${expected}`);
  return failures;
}

// Fictional sample, written for this page. The shape follows the project; the content does not.
export const GATE_SAMPLE = {
  chunks: {
    'Vendor A': { a1: 'pricing page', a4: 'docs: scaling' },
    'Vendor B': { b2: 'pricing page', b4: 'docs: serverless', b6: 'support page' },
  },
  claims: [
    { id: 1, company: 'Vendor A', dimension: 'Pricing', text: 'Free tier holds about 1M vectors', ids: ['a1'] },
    { id: 2, company: 'Vendor A', dimension: 'Scale', text: 'Storage scales automatically', ids: ['a9'] },
    { id: 3, company: 'Vendor B', dimension: 'Pricing', text: 'Billed per read unit', ids: ['b2'] },
    { id: 4, company: 'Vendor B', dimension: 'Support', text: 'SOC 2 report on request', ids: ['a1'] },
    { id: 5, company: 'Vendor B', dimension: 'Scale', text: 'Serverless tier available', ids: ['b4'] },
    { id: 6, company: 'Vendor A', dimension: 'Support', text: 'Dedicated support engineer', ids: [] },
    { id: 7, company: 'Vendor B', dimension: 'Support', text: '24/7 support on paid plans', ids: ['b6'] },
  ],
  // What a judge might return from the surviving claims: including the real failure
  // mode the project caught: declaring a winner it did not support.
  judged: {
    perDimension: [
      { dimension: 'Pricing', winner: 'Vendor A' },
      { dimension: 'Scale', winner: 'Vendor B' },
      { dimension: 'Support', winner: 'Vendor B' },
    ],
    winner: 'Vendor A',
    judgeConfidence: 80,
  },
  reasked: { winner: 'Vendor B' },
};

// ---------------------------------------------------------------------------
// APEX-1: agent.py validate() trust checks, tier_and_action() and gate()

// agent.py OUTREACH_BASIS, abridged to the rows the demo offers. Unlisted or empty → unknown.
const OUTREACH_BASIS = { IE: 'legitimate_interest', GB: 'legitimate_interest', DE: 'consent_required', FR: 'consent_required' };
export const basisFor = (country) => OUTREACH_BASIS[country] || 'unknown';
export const APEX_COUNTRIES = [
  ['IE', 'Ireland'], ['GB', 'United Kingdom'], ['DE', 'Germany'], ['FR', 'France'],
  ['JP', 'Japan (not in the table)'], ['', 'No country (enrichment empty)'],
];

export const TIER_A_MIN = 70;
export const TIER_B_MIN = 45;

export function apexDecide({ disqualified, basis, score, confidence, evidence }) {
  const trail = [];
  if (disqualified) {
    trail.push({ rule: 'Disqualifier hit', effect: 'Basis set to blocked. The model is never called: zero tokens.' });
    trail.push({ rule: 'Gate: basis is blocked', effect: 'suppress' });
    return { gate: 'suppress', tier: 'disqualified', confidence: 'high', modelCalled: false, trail };
  }

  let conf = confidence;
  const sendGrade = score >= TIER_B_MIN;
  if (evidence === 'prospect' && sendGrade) {
    conf = 'low';
    trail.push({ rule: 'Every surviving quote is prospect-written', effect: 'Send-grade score with no independent corroboration: confidence forced to low.' });
  }
  if (evidence === 'none' && sendGrade) {
    conf = 'low';
    trail.push({ rule: 'No quote survived verification', effect: 'A send-grade score must rest on at least one real quote: confidence forced to low.' });
  }

  let tier;
  if (conf === 'low') {
    tier = score < TIER_A_MIN ? 'C' : 'B';
    trail.push({ rule: 'Low confidence', effect: `Tier capped at ${tier}; recommended action is human review.` });
  } else {
    tier = score >= TIER_A_MIN ? 'A' : score >= TIER_B_MIN ? 'B' : 'C';
    trail.push({ rule: `Score ${score}`, effect: `Tier ${tier} (A ≥ ${TIER_A_MIN}, B ≥ ${TIER_B_MIN}).` });
  }

  let gate;
  if (basis === 'blocked') {
    gate = 'suppress';
    trail.push({ rule: 'Gate: basis is blocked', effect: 'suppress: decided no, permanently.' });
  } else if (basis === 'consent_required' || basis === 'unknown') {
    gate = 'hold_for_approval';
    trail.push({ rule: `Gate: basis is ${basis === 'unknown' ? 'unknown' : 'consent required'}`, effect: 'hold: basis dominates tier.' });
  } else if (conf === 'low') {
    gate = 'hold_for_approval';
    trail.push({ rule: 'Gate: low confidence', effect: 'hold, whatever the tier says.' });
  } else {
    gate = tier === 'A' || tier === 'B' ? 'send' : 'nurture';
    trail.push({ rule: `Gate: legitimate interest, tier ${tier}`, effect: gate });
  }
  return { gate, tier, confidence: conf, modelCalled: true, trail };
}

export const APEX_PRESETS = [
  { id: 'fit', label: 'Strong fit in Ireland', lead: { disqualified: false, country: 'IE', score: 85, confidence: 'high', evidence: 'independent' } },
  { id: 'consent', label: 'Same lead in Germany', lead: { disqualified: false, country: 'DE', score: 85, confidence: 'high', evidence: 'independent' } },
  { id: 'injection', label: 'Injected form text', lead: { disqualified: false, country: 'IE', score: 100, confidence: 'high', evidence: 'prospect' } },
  { id: 'competitor', label: 'A competitor', lead: { disqualified: true, country: 'IE', score: 90, confidence: 'high', evidence: 'independent' } },
];

export const decideLead = (lead) => apexDecide({ ...lead, basis: basisFor(lead.country) });
