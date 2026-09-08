/* Fetch — scoring engine (pure functions, no DOM)
   Scores are derived from stated preferences — nothing is random.
   Weighted lifestyle fit → curve → explicit health/structure penalties. */

const BASE_WEIGHTS = {
  coat: 0.20, temperament: 0.17, health: 0.15, barking: 0.12, exercise: 0.10,
  training: 0.09, size: 0.07, travel: 0.06, alone: 0.04
};

const BRUSH_VAL = { rare: 1.0, weekly: 0.8, often: 0.55, daily: 0.3 };
const GROOM_VAL = { none: 1.0, occasional: 0.85, regular: 0.55 };
const EX_TARGET = { chill: 45, balanced: 75, active: 115 };
const SIZE_BAND = { small: [2, 7], smallmed: [5, 15], medium: [10, 22], flex: [2, 26] };

function prefWeights(prefs) {
  const w = Object.assign({}, BASE_WEIGHTS);
  const mul = {
    coat: { minimal: 1, some: 0.55, any: 0.2 }[prefs.coat],
    barking: { quiet: 1, some: 0.55, any: 0.2 }[prefs.barking],
    training: { important: 1, nice: 0.6, any: 0.25 }[prefs.training],
    travel: { very: 1.35, important: 1, not: 0.3 }[prefs.travel],
    alone: { needs: 1.3, home: 0.45, flex: 0.85 }[prefs.alone]
  };
  for (const k in mul) w[k] *= mul[k];
  const sum = Object.values(w).reduce((a, b) => a + b, 0);
  for (const k in w) w[k] /= sum;
  return w;
}

function coatComp(f, prefs) {
  const exp = {
    low: { b: 0.6, g: 0.5 },
    ok: { b: 0.5, g: 0.1 },
    any: { b: 0.2, g: 0.05 }
  }[prefs.grooming];
  return f.shed *
    Math.pow(BRUSH_VAL[f.brush], exp.b) *
    Math.pow(GROOM_VAL[f.groom], exp.g);
}

function exerciseComp(mins, prefs) {
  const target = EX_TARGET[prefs.exercise];
  return Math.max(0.2, 1 - Math.abs(mins - target) / 75);
}

function sizeComp(breed, prefs) {
  const [lo, hi] = SIZE_BAND[prefs.size];
  const mid = (breed.kg[0] + breed.kg[1]) / 2;
  let band = 1;
  if (mid < lo) band = Math.max(0, 1 - (lo - mid) / 12);
  if (mid > hi) band = Math.max(0, 1 - (mid - hi) / 12);
  return 0.55 * band + 0.45 * (breed.facts.apartment / 5);
}

function computeScore(breed, prefs) {
  const f = breed.facts;
  const w = prefWeights(prefs);
  const comps = {
    coat: coatComp(f, prefs),
    temperament: (f.calm + f.affection) / 10,
    health: f.health / 5,
    barking: f.quiet / 5,
    exercise: exerciseComp(f.exercise, prefs),
    training: f.train / 5,
    size: sizeComp(breed, prefs),
    travel: f.travel / 5,
    alone: f.alone / 5
  };
  let raw = 0;
  for (const k in comps) raw += w[k] * comps[k];
  let pct = Math.round(100 * Math.pow(raw, 0.7));
  const penalties = [];
  for (const flag of breed.flags || []) {
    const info = FLAG_INFO[flag];
    if (info && info.pts) penalties.push({ flag, label: info.label, pts: info.pts });
  }
  pct += penalties.reduce((a, p) => a + p.pts, 0);
  pct = Math.max(15, Math.min(97, pct));
  return { pct, comps, weights: w, penalties, raw };
}

/* ---- Scenario refinements ----
   answers: {rain, velcro, groomer, offleash, barky} for ONE player.
   Returns map breedId -> {delta, notes[]} for that player. */
function scenarioDeltas(answers, breeds) {
  const out = {};
  for (const b of breeds) {
    const f = b.facts, flags = b.flags || [];
    let d = 0; const notes = [];
    if (answers.rain === 'A') {
      if (f.exercise <= 60) { d += 2; notes.push('fits couch-weekend energy'); }
      if (f.exercise >= 95) { d -= 4; notes.push('needs outings whatever the weather'); }
    } else if (answers.rain === 'B') {
      if (f.exercise >= 90) { d += 2; notes.push('matches all-weather ambitions'); }
      if (f.exercise <= 50) { d -= 2; notes.push('less adventure appetite than you'); }
    }
    if (flags.includes('velcro')) {
      if (answers.velcro === 'love') { d += 2; notes.push('velcro tendencies welcomed'); }
      if (answers.velcro === 'no') { d -= 5; notes.push('too clingy for your taste'); }
    }
    if (f.groom === 'regular') {
      if (answers.groomer === 'love') { d += 3; notes.push('groomer routine accepted'); }
      if (answers.groomer === 'ok') { d -= 1; }
      if (answers.groomer === 'no') { d -= 6; notes.push('grooming schedule rejected'); }
    } else if (f.groom === 'occasional' && answers.groomer === 'no') { d -= 2; }
    if (flags.includes('offleash')) {
      if (answers.offleash === 'ok') { d -= 2; }
      if (answers.offleash === 'no') { d -= 7; notes.push('leash-bound life is a deal-breaker'); }
    }
    if (f.quiet <= 2) {
      if (answers.barky === 'ok') { d -= 3; }
      if (answers.barky === 'no') { d -= 7; notes.push('too vocal for the hallway rule'); }
    } else if (f.quiet <= 3) {
      if (answers.barky === 'ok') { d -= 1; }
      if (answers.barky === 'no') { d -= 3; }
    }
    out[b.id] = { delta: d, notes };
  }
  return out;
}

/* Average two players' deltas (equal vote), clamp to [-12, +5]. */
function combinedRefinement(perPlayer, breedId) {
  const list = perPlayer.filter(Boolean).map(m => m[breedId]).filter(Boolean);
  if (!list.length) return { delta: 0, notes: [] };
  let delta = list.reduce((a, x) => a + x.delta, 0) / list.length;
  delta = Math.max(-12, Math.min(5, Math.round(delta)));
  const notes = [...new Set(list.flatMap(x => x.notes))];
  return { delta, notes };
}

function refinedPct(breed, prefs, perPlayerDeltas) {
  const base = computeScore(breed, prefs).pct;
  const ref = combinedRefinement(perPlayerDeltas || [], breed.id);
  return { base, delta: ref.delta, pct: Math.max(15, Math.min(97, base + ref.delta)), notes: ref.notes };
}

/* ---- Rescue profile ---- */
function rescueProfileBreed(onIds) {
  const on = id => onIds.includes(id);
  const f = {
    shed: on('shortcoat') ? (on('lowshed') ? 0.88 : 0.8) : (on('lowshed') ? 0.7 : 0.55),
    brush: on('shortcoat') ? 'rare' : 'weekly',
    groom: 'none',
    exercise: on('energy') ? 70 : 85,
    calm: Math.min(4.75, 3 + (on('calm') ? 1.5 : 0) + (on('age') ? 0.25 : 0)),
    affection: on('friendly') ? 4.5 : 4,
    quiet: on('quiet') ? 4.25 : 3,
    train: Math.min(4.5, 3.5 + (on('housetrained') ? 0.5 : 0) + (on('age') ? 0.25 : 0)),
    apartment: Math.min(4.75, 3.5 + (on('apartment') ? 1 : 0) + (on('housetrained') ? 0.25 : 0)),
    travel: on('travel') ? 4.25 : 3,
    alone: on('alone') ? 4.25 : 3,
    health: on('health') ? 4.25 : 3.5
  };
  return {
    id: 'rescueprofile', name: 'Your rescue profile', de: 'Euer Wunsch-Tierheimhund',
    weight: on('size') ? '7–15 kg' : '5–25 kg', kg: on('size') ? [7, 15] : [5, 25],
    facts: f, flags: [],
    cost: '€85–125', puppyDiff: 'None — adult by definition.',
    rescueDE: 'This is the search filter for Tierheim Nürnberg & foster rescues.'
  };
}

/* ---- Pattern analysis: only claims supported by actual swipes ---- */
function patternAnalysis(state, breeds) {
  const [pA, pB] = state.players;
  const likedBy = p => breeds.filter(b => state.swipes[p.key][b.id] === true);
  const passedBy = p => breeds.filter(b => state.swipes[p.key][b.id] === false);
  const lA = likedBy(pA), lB = likedBy(pB);
  const sentences = [];
  if (!lA.length || !lB.length) {
    sentences.push(`Not much overlap to analyse yet — ${!lA.length ? pA.name : pB.name} was ruthless with the ❤️ button.`);
    return sentences;
  }
  const avg = (list, fn) => list.reduce((a, b) => a + fn(b), 0) / list.length;
  const both = [...lA, ...lB];

  // Shared coat preference
  const shortShare = avg(both, b => b.facts.shed >= 0.78 ? 1 : 0);
  const fluffLikes = both.filter(b => b.facts.brush === 'daily' || b.facts.brush === 'often').length;
  if (shortShare >= 0.7 && fluffLikes <= Math.round(both.length * 0.25)) {
    sentences.push('You both consistently chose easy-coat, low-hair dogs — the fluffy companions barely stood a chance.');
  }
  // Quiet preference
  if (avg(lA, b => b.facts.quiet) >= 3.8 && avg(lB, b => b.facts.quiet) >= 3.8) {
    sentences.push('Quiet dogs clearly win with both of you; the confirmed barkers collected most of the ✕s.');
  }
  // Calm indoors
  if (avg(both, b => b.facts.calm) >= 4.1) {
    sentences.push('“Can switch off indoors” looks non-negotiable — your favourites are all professional relaxers.');
  }
  // Size divergence
  const wA = avg(lA, b => (b.kg[0] + b.kg[1]) / 2);
  const wB = avg(lB, b => (b.kg[0] + b.kg[1]) / 2);
  if (Math.abs(wA - wB) >= 3.5) {
    const bigger = wA > wB ? pA.name : pB.name;
    const smaller = wA > wB ? pB.name : pA.name;
    sentences.push(`${bigger} leans toward slightly bigger dogs (avg ~${Math.round(Math.max(wA, wB))} kg), while ${smaller} is more open to the small companions (avg ~${Math.round(Math.min(wA, wB))} kg).`);
  }
  // Energy divergence
  const eA = avg(lA, b => b.facts.exercise), eB = avg(lB, b => b.facts.exercise);
  if (Math.abs(eA - eB) >= 15) {
    const sporty = eA > eB ? pA.name : pB.name;
    sentences.push(`${sporty} said yes to the more athletic profiles noticeably more often.`);
  }
  // Agreement rate
  const decided = breeds.filter(b => state.swipes[pA.key][b.id] !== undefined && state.swipes[pB.key][b.id] !== undefined);
  const agreed = decided.filter(b => state.swipes[pA.key][b.id] === state.swipes[pB.key][b.id]);
  if (decided.length) {
    const rate = Math.round(100 * agreed.length / decided.length);
    sentences.push(`Overall you agreed on ${agreed.length} of ${decided.length} dogs (${rate}%) — ${rate >= 70 ? 'you’re basically shopping with one brain.' : rate >= 50 ? 'plenty of common ground, with a few healthy debates ahead.' : 'the almost-matches list is where your real conversation starts.'}`);
  }
  return sentences;
}

function exerciseLabel(mins) { return `~${mins} min/day`; }
function shedLabel(s) {
  return s >= 0.9 ? 'Minimal' : s >= 0.78 ? 'Low' : s >= 0.6 ? 'Moderate' : 'Noticeable';
}
function brushLabel(b) {
  return { rare: 'Rarely — a wipe now and then', weekly: 'Weekly', often: 'Several times a week', daily: 'Daily' }[b];
}
function groomLabel(g) {
  return { none: 'Never needed', occasional: 'A few times a year', regular: 'Every 6–8 weeks' }[g];
}

if (typeof module !== 'undefined') {
  module.exports = { BASE_WEIGHTS, computeScore, scenarioDeltas, combinedRefinement, refinedPct,
    rescueProfileBreed, patternAnalysis, prefWeights, exerciseLabel, shedLabel, brushLabel, groomLabel };
  // FLAG_INFO comes from data.js in the browser; wire it for node:
  global.FLAG_INFO = require('./data.js').FLAG_INFO;
}
