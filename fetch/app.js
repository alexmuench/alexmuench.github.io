/* Fetch — find the dog that fits your life. Two-player breed matching, pass-and-play. */
'use strict';

/* ---------- constants ---------- */
const PUPPY_IDS = ['aussie','basenji','beagle','bolognese','border','boston','cavalier','chihuahua',
  'cirneco','cocker','corgi','dachshund','dsf','ett','frenchie','golden','gpinscher','husky','iggy',
  'labrador','maltese','manchester','minipoodle','pug','rescue','schnauzer','shiba','shihtzu','toypoodle','whippet'];
const STORE_KEY = 'fetch-v1';

const I = {
  heart: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21c-.4 0-.8-.14-1.1-.42C6.6 16.9 2.5 13.3 2.5 9.3 2.5 6.4 4.8 4 7.6 4c1.7 0 3.3.86 4.4 2.24C13.1 4.86 14.7 4 16.4 4c2.8 0 5.1 2.4 5.1 5.3 0 4-4.1 7.6-8.4 11.28-.3.28-.7.42-1.1.42Z"/></svg>',
  x: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  undo: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/></svg>',
  dots: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>',
  up: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14l6-6 6 6"/></svg>',
  back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  chev: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'
};

/* ---------- state ---------- */
const defaultPrefs = () => Object.fromEntries(PREF_SCHEMA.map(p => [p.id, p.def]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

let S = load() || freshState();

function freshState() {
  return {
    phase: 'welcome', turn: 0,
    players: [{ key: 'p1', name: '' }, { key: 'p2', name: '' }],
    prefs: defaultPrefs(), deckChoice: 'quick',
    orders: null, idx: 0,
    swipes: { p1: {}, p2: {} }, history: { p1: [], p2: [] },
    scenarios: { p1: null, p2: null },
    duelPairs: null, duels: { p1: null, p2: null },
    ranks: { p1: null, p2: null },
    rescueOn: null,
    puppyMode: {}
  };
}
function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {} }
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s && s.players && s.phase) return s;
  } catch (e) {}
  return null;
}
function resetAll() { S = freshState(); save(); closeSheet(true); render(); }

/* ---------- helpers ---------- */
const app = document.getElementById('app');
const byId = id => BREEDS.find(b => b.id === id);
const deckBreeds = () => (S.deckChoice === 'full' ? BREEDS : BREEDS.filter(b => QUICK_DECK.includes(b.id)));
const player = () => S.players[S.turn];
const dn = p => p.name || (p.key === 'p1' ? 'Player 1' : 'Player 2');
const other = () => S.players[1 - S.turn];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const scoreOf = b => computeScore(b, S.prefs);
const deltasList = () => [S.scenarios.p1, S.scenarios.p2].filter(Boolean).map(a => scenarioDeltas(a, BREEDS));
const refined = b => refinedPct(b, S.prefs, deltasList());
const scenariosDone = () => S.scenarios.p1 && S.scenarios.p2;
const duelsDone = () => S.duels.p1 && S.duels.p2;
const imgSrc = (b, puppy) => (puppy && PUPPY_IDS.includes(b.id)) ? `img/puppy/${b.id}.jpg` : `img/${b.id}.jpg`;

function mutualMatches() {
  return BREEDS.filter(b => S.swipes.p1[b.id] === true && S.swipes.p2[b.id] === true)
    .sort((a, b) => refined(b).pct - refined(a).pct);
}
function almostMatches() {
  return BREEDS.filter(b => (S.swipes.p1[b.id] === true) !== (S.swipes.p2[b.id] === true)
    && (S.swipes.p1[b.id] === true || S.swipes.p2[b.id] === true))
    .sort((a, b) => refined(b).pct - refined(a).pct);
}
function finalists() {
  let list = mutualMatches();
  if (list.length < 3) {
    for (const b of almostMatches()) { if (list.length >= 3) break; if (!list.includes(b)) list.push(b); }
  }
  list = list.slice(0, 5);
  if (S.rescueOn) {
    const prof = rescueProfileBreed(S.rescueOn);
    prof._profile = true;
    list = list.filter(b => true).concat([prof]);
  }
  return list;
}
function toast(msg) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 2600);
}
function topbar(opts = {}) {
  return `<div class="topbar">
    ${opts.back ? `<button class="iconbtn" data-act="${opts.back}" aria-label="Back">${I.back}</button>` : ''}
    ${opts.center || '<span class="spacer"></span>'}
    ${opts.noMenu ? '' : `<button class="iconbtn" data-act="menu" aria-label="Menu">${I.dots}</button>`}
  </div>`;
}
function bindCommon() {
  app.querySelectorAll('[data-act]').forEach(el => {
    el.addEventListener('click', () => act(el.dataset.act, el.dataset));
  });
}
function act(name, data) {
  const fn = ACTIONS[name];
  if (fn) fn(data);
}

/* label maps */
const quietLabel = q => q >= 4.8 ? 'Nearly silent' : q >= 4.2 ? 'Very quiet' : q >= 3.6 ? 'Quiet' : q >= 3 ? 'Moderate' : q >= 2.4 ? 'Vocal' : 'Barky';
const trainLabel = t => t >= 4.8 ? 'Effortless' : t >= 4 ? 'Very trainable' : t >= 3.4 ? 'Willing' : t >= 2.8 ? 'Semi-independent' : t >= 2.2 ? 'Stubborn charm' : 'On their terms';
const cuddleLabel = a => a >= 4.8 ? 'Professional' : a >= 4.2 ? 'Very affectionate' : a >= 3.6 ? 'Affectionate' : 'On their terms';
const aloneLabel = a => a >= 4 ? '3–4 h is fine' : a >= 3.4 ? 'Learns 2–3 h' : a >= 2.8 ? 'Needs practice' : 'Struggles alone';
const scaleLabel = v => v >= 4.6 ? 'Excellent' : v >= 4 ? 'Great' : v >= 3.4 ? 'Good' : v >= 2.8 ? 'Okay' : v >= 2.2 ? 'Tricky' : 'Hard';
const healthLabel = h => h >= 4.4 ? 'Very robust' : h >= 3.8 ? 'Robust' : h >= 3.2 ? 'Decent' : h >= 2.4 ? 'Known risks' : 'Serious breed risks';

function dotMeter(v) {
  let out = '<span class="dots">';
  for (let i = 1; i <= 5; i++) {
    out += `<i class="${v >= i ? 'f' : v >= i - 0.5 ? 'h' : ''}"></i>`;
  }
  return out + '</span>';
}

/* ---------- screens ---------- */
function render() {
  window.scrollTo(0, 0);
  const r = SCREENS[S.phase] || SCREENS.welcome;
  r();
  bindCommon();
  save();
}

const SCREENS = {};

SCREENS.welcome = () => {
  app.innerHTML = `
  <div class="screen welcome">
    <div>
      ${topbar({ noMenu: false })}
      <div class="welcome-hero">
        <div class="kicker">The two-player dog decision</div>
        <h1>Fetch</h1>
        <p class="sub">Find the dog that fits your life.</p>
      </div>
      <div class="welcome-art">
        <div class="polaroid" style="left:8%;transform:rotate(-5deg);top:8px"><img src="img/whippet.jpg" alt=""></div>
        <div class="polaroid" style="right:8%;transform:rotate(4deg);top:28px"><img src="img/rescue.jpg" alt=""></div>
      </div>
    </div>
    <div>
      <div class="players">
        <div class="player-row"><div class="avatar" id="av1">1</div><input id="name1" value="${esc(S.players[0].name)}" placeholder="Your name" maxlength="14" aria-label="Player 1 name"><span class="role">swipes first</span></div>
        <div class="player-row"><div class="avatar" id="av2">2</div><input id="name2" value="${esc(S.players[1].name)}" placeholder="Their name" maxlength="14" aria-label="Player 2 name"><span class="role">swipes second</span></div>
      </div>
      <button class="btn block" data-act="toPrefs">Set your preferences</button>
      <p class="note" style="text-align:center;margin-top:14px">Swipe separately · reveal where you match</p>
    </div>
  </div>`;
  const sync = () => {
    S.players[0].name = app.querySelector('#name1').value.trim();
    S.players[1].name = app.querySelector('#name2').value.trim();
    const n1 = S.players[0].name, n2 = S.players[1].name;
    app.querySelector('#av1').textContent = n1 ? n1[0].toUpperCase() : '1';
    app.querySelector('#av2').textContent = n2 ? n2[0].toUpperCase() : '2';
    save();
  };
  app.querySelector('#name1').addEventListener('input', sync);
  app.querySelector('#name2').addEventListener('input', sync);
  sync();
};

SCREENS.prefs = () => {
  app.innerHTML = `
  <div class="screen prefs">
    ${topbar({ back: 'toWelcome' })}
    <div class="kicker">Before you swipe</div>
    <h2>What matters to us</h2>
    <p class="note">These tune every compatibility score. Preset to sensible city-apartment defaults — adjust freely.</p>
    ${PREF_SCHEMA.map(g => `
      <div class="pref-group">
        <div class="pref-label">${g.label}</div>
        <div class="seg" data-pref="${g.id}">
          ${g.opts.map(o => `<button class="${S.prefs[g.id] === o.v ? 'on' : ''}" data-v="${o.v}">${o.label}</button>`).join('')}
        </div>
      </div>`).join('')}
    <div class="pref-group">
      <div class="pref-label">Deck<span class="note" style="font-weight:400">who’s in the game</span></div>
      <div class="seg" id="deckseg">
        <button class="${S.deckChoice === 'quick' ? 'on' : ''}" data-deck="quick">Curated · ${QUICK_DECK.length}</button>
        <button class="${S.deckChoice === 'full' ? 'on' : ''}" data-deck="full">Everyone · ${BREEDS.length}</button>
      </div>
    </div>
    <div class="prefs-footer">
      <button class="btn block" data-act="startSwiping">Start swiping</button>
    </div>
  </div>`;
  app.querySelectorAll('.seg[data-pref]').forEach(seg => {
    seg.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      S.prefs[seg.dataset.pref] = b.dataset.v;
      seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      save();
    });
  });
  const dseg = app.querySelector('#deckseg');
  dseg.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    S.deckChoice = b.dataset.deck;
    dseg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    save();
  });
};

SCREENS.handoff = () => {
  const p = player();
  const first = S.turn === 0;
  app.innerHTML = `
  <div class="screen handoff ${first ? '' : 'p2'}">
    <div class="big-avatar">${esc(dn(p)[0].toUpperCase())}</div>
    <div class="kicker">${first ? 'Player 1' : 'Pass the phone'}</div>
    <h2>${esc(dn(p))}, you’re up</h2>
    <p class="note">Swipe right on dogs you’d genuinely want to meet, left on the rest.
    ${first ? `${esc(dn(other()))} won’t see your answers.` : `No peeking at ${esc(dn(other()))}’s answers — the reveal comes after.`}</p>
    <button class="btn" data-act="beginTurn">I’m ${esc(dn(p))} — let’s go</button>
  </div>`;
};

SCREENS.swipe = () => {
  const p = player();
  const order = S.orders[p.key];
  const total = order.length;
  const done = S.idx >= total;
  if (done) { advanceAfterSwipes(); return; }
  const b = byId(order[S.idx]);
  const next = S.idx + 1 < total ? byId(order[S.idx + 1]) : null;
  const sc = scoreOf(b);
  const puppy = !!S.puppyMode[b.id];
  app.innerHTML = `
  <div class="screen swipe-screen">
    <div class="topbar">
      <span class="swipe-meta">${esc(dn(p))}</span>
      <div class="progress-track"><div class="progress-fill" style="width:${(S.idx / total) * 100}%"></div></div>
      <span class="swipe-meta">${S.idx + 1} / ${total}</span>
      <button class="iconbtn" data-act="menu" aria-label="Menu">${I.dots}</button>
    </div>
    <div class="deck">
      ${next ? cardHTML(next, scoreOf(next), false, true) : ''}
      ${cardHTML(b, sc, puppy, false)}
    </div>
    <div class="swipe-buttons">
      <button class="roundbtn no" data-swipe="no" aria-label="No">${I.x}</button>
      <button class="roundbtn undo" data-act="undo" aria-label="Undo" ${S.history[p.key].length ? '' : 'disabled'}>${I.undo}</button>
      <button class="roundbtn yes" data-swipe="yes" aria-label="Yes">${I.heart}</button>
    </div>
  </div>`;
  attachGestures(b);
  // preload next couple of images
  for (let k = 1; k <= 2; k++) {
    const nb = order[S.idx + k]; if (nb) { const im = new Image(); im.src = imgSrc(byId(nb), false); }
  }
};

function cardHTML(b, sc, puppy, under) {
  const hasPuppy = PUPPY_IDS.includes(b.id);
  return `
  <article class="dogcard ${under ? 'under' : 'top'}" data-id="${b.id}">
    <div class="photo">
      <img src="${imgSrc(b, puppy)}" alt="${esc(b.name)}" style="object-position:${b.pos || '50% 35%'}" draggable="false">
      <div class="photo-fade"></div>
      <div class="stamp yes">Yes</div>
      <div class="stamp no">No</div>
      ${!under && hasPuppy ? `<button class="puppy-toggle" data-act="togglePuppy" data-id="${b.id}">${puppy ? 'See adult' : 'See puppy'}</button>` : ''}
    </div>
    <div class="body">
      <div class="name-row"><h2>${esc(b.name)}</h2><span class="weight">${esc(b.weight)}</span></div>
      <div class="tag-row">${b.tags.map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div>
      <div class="line-row">
        <span class="pill match-pill">${sc.pct}% match</span>
        <p class="oneliner">“${esc(b.line)}”</p>
      </div>
      <div class="card-actions">
        <button class="textbtn" data-act="details" data-id="${b.id}">Pros &amp; cons ${I.up}</button>
        <span class="note">${exerciseLabel(b.facts.exercise)}</span>
      </div>
    </div>
  </article>`;
}

/* gesture engine */
function attachGestures(breed) {
  const card = app.querySelector('.dogcard.top');
  if (!card) return;
  const yes = card.querySelector('.stamp.yes');
  const no = card.querySelector('.stamp.no');
  let x0 = 0, y0 = 0, dx = 0, dy = 0, dragging = false, pid = null;

  const onDown = e => {
    if (e.target.closest('button')) return;
    dragging = true; pid = e.pointerId;
    x0 = e.clientX; y0 = e.clientY; dx = dy = 0;
    card.classList.remove('spring');
    try { card.setPointerCapture(pid); } catch (err) {}
  };
  const onMove = e => {
    if (!dragging || e.pointerId !== pid) return;
    dx = e.clientX - x0; dy = e.clientY - y0;
    card.style.transform = `translate(${dx}px, ${dy * 0.35}px) rotate(${dx * 0.055}deg)`;
    const p = Math.min(1, Math.abs(dx) / 90);
    yes.style.opacity = dx > 0 ? p : 0;
    no.style.opacity = dx < 0 ? p : 0;
  };
  const onUp = e => {
    if (!dragging || e.pointerId !== pid) return;
    dragging = false;
    if (Math.abs(dx) > 90) commitSwipe(dx > 0, dx, dy);
    else {
      card.classList.add('spring');
      card.style.transform = '';
      yes.style.opacity = no.style.opacity = 0;
    }
  };
  card.addEventListener('pointerdown', onDown);
  card.addEventListener('pointermove', onMove);
  card.addEventListener('pointerup', onUp);
  card.addEventListener('pointercancel', onUp);

  app.querySelectorAll('[data-swipe]').forEach(btn => {
    btn.addEventListener('click', () => commitSwipe(btn.dataset.swipe === 'yes', 0, 0));
  });

  function commitSwipe(liked, cdx, cdy) {
    const p = player();
    S.swipes[p.key][breed.id] = liked;
    S.history[p.key].push(breed.id);
    S.idx++;
    save();
    const fx = (liked ? 1 : -1) * (window.innerWidth + 220);
    card.classList.add('flyout');
    card.style.transform = `translate(${fx}px, ${(cdy || 0) * 0.6 - 30}px) rotate(${(liked ? 1 : -1) * 22}deg)`;
    card.style.opacity = '0';
    (liked ? yes : no).style.opacity = 1;
    setTimeout(render, 260);
  }
  window.onkeydown = e => {
    if (S.phase !== 'swipe') return;
    if (e.key === 'ArrowRight') commitSwipe(true, 0, 0);
    else if (e.key === 'ArrowLeft') commitSwipe(false, 0, 0);
    else if (e.key.toLowerCase() === 'u') act('undo');
  };
}

function advanceAfterSwipes() {
  if (S.turn === 0) { S.turn = 1; S.idx = 0; S.phase = 'handoff'; }
  else { S.phase = 'reveal'; }
  render();
}

SCREENS.reveal = () => {
  const n = mutualMatches().length;
  app.innerHTML = `
  <div class="screen reveal">
    <div class="kicker" style="margin-bottom:14px">The results are in</div>
    <h1>It’s a match <span class="heart-pop">❤️</span></h1>
    <p class="sub">${n
      ? `You both said yes to <b>${n} dog${n > 1 ? 's' : ''}</b>.<br>Let’s see who made the cut.`
      : 'No mutual yeses — but the almost-matches are where the conversation starts.'}</p>
    <button class="btn" data-act="toResults">Reveal our matches</button>
  </div>`;
};

SCREENS.results = () => {
  const mm = mutualMatches();
  const am = almostMatches();
  const [pA, pB] = S.players;
  const nA = dn(pA), nB = dn(pB);
  const pattern = patternAnalysis({ ...S, players: S.players.map(pl => ({ ...pl, name: dn(pl) })) }, deckBreeds());
  const refBadge = scenariosDone();
  app.innerHTML = `
  <div class="screen results">
    ${topbar({ center: '<span class="kicker" style="flex:1;text-align:center">Our results</span>', back: null })}
    <h2 class="screen-title">It’s a match ❤️</h2>
    <p class="note">Ranked by fit with your shared preferences${refBadge ? ' · refined by your scenario answers' : ''}.</p>
    <div class="stack" style="margin-top:16px">
      ${mm.length ? mm.map((b, i) => resultCard(b, i)).join('')
        : `<div class="panel"><p class="body-text" style="font-size:15px">No dog got a double yes. That’s useful data too — scroll down to the almost-matches and talk it out.</p></div>`}
    </div>

    ${am.length ? `
    <div class="panel">
      <h4>Almost matches</h4>
      ${am.map(b => {
        const aLiked = S.swipes.p1[b.id] === true;
        return `<div class="almost-row">
          <img class="thumb" src="${imgSrc(b, false)}" alt="" loading="lazy">
          <span class="nm">${esc(b.name)}</span>
          <span class="who">${esc(aLiked ? nA : nB)} ❤️ · ${esc(aLiked ? nB : nA)} ✕</span>
          <span class="pct2">${refined(b).pct}%</span>
        </div>`;
      }).join('')}
      <p class="note" style="margin-top:10px">One heart each — these deserve a conversation, not a burial.</p>
    </div>` : ''}

    ${pattern.length ? `
    <div class="panel">
      <h4>Your pattern</h4>
      <ul class="pattern-list" style="margin:0;padding:0">${pattern.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>` : ''}

    ${duelsDone() ? gutPanel() : ''}

    <div class="next-actions">
      <button class="action-row ${scenariosDone() ? 'done-row' : ''}" data-act="startScenarios">
        <span class="ico">☔️</span>
        <span class="t"><b>Round 2 · Lifestyle scenarios</b><span>Five quick reality checks that refine the ranking</span></span>
        ${scenariosDone() ? '<span class="badge-mini">Done</span>' : I.chev}
      </button>
      <button class="action-row ${duelsDone() ? 'done-row' : ''}" data-act="startDuels">
        <span class="ico">👀</span>
        <span class="t"><b>Round 3 · Gut check</b><span>Pick on instinct — no scores shown</span></span>
        ${duelsDone() ? '<span class="badge-mini">Done</span>' : I.chev}
      </button>
      <button class="action-row" data-act="toCompare">
        <span class="ico">📋</span>
        <span class="t"><b>Compare our finalists</b><span>Side-by-side details, then rank who to actually meet</span></span>
        ${I.chev}
      </button>
      <button class="action-row ${S.rescueOn ? 'done-row' : ''}" data-act="toRescue">
        <span class="ico">🏡</span>
        <span class="t"><b>Maybe not a breed at all?</b><span>Build your ideal rescue profile</span></span>
        ${S.rescueOn ? '<span class="badge-mini">Built</span>' : I.chev}
      </button>
    </div>
    <p class="fine-print" style="margin-top:24px">Breed traits describe tendencies, not guarantees. Health, breeder/rescue quality, socialisation, training and individual temperament matter enormously. This app narrows the conversation — it doesn’t predict an individual dog.</p>
  </div>`;
};

function resultCard(b, i) {
  const r = refined(b);
  const chip = r.delta ? `<span class="delta-chip ${r.delta > 0 ? 'up' : 'down'}">${r.delta > 0 ? '▲' : '▼'} ${Math.abs(r.delta)}</span>` : '';
  return `<button class="result-card" data-act="details" data-id="${b.id}" style="animation-delay:${i * 90}ms">
    <img class="thumb" src="${imgSrc(b, false)}" alt="" loading="lazy" style="object-position:${b.pos || '50% 35%'}">
    <span class="info">
      <span class="rank-line"><span class="rank-num">${i + 1}.</span><h3>${esc(b.name)}</h3><span class="pct">${r.pct}%</span></span>
      <p class="why"><b>Why:</b> ${esc(b.why)} ${chip}</p>
      <p class="watch"><b>Watch out:</b> ${esc(b.watch)}</p>
    </span>
  </button>`;
}

function gutPanel() {
  const counts = {};
  for (const pk of ['p1', 'p2']) {
    for (const winner of Object.values(S.duels[pk] || {})) counts[winner] = (counts[winner] || 0) + 1;
  }
  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (!ranked.length) return '';
  const topGut = byId(ranked[0][0]);
  const mm = mutualMatches();
  const topScore = mm[0] || deckBreeds().map(b => [b, refined(b).pct]).sort((a, b) => b[1] - a[1])[0][0];
  const aligned = topGut.id === topScore.id;
  return `<div class="panel">
    <h4>Gut check</h4>
    <div class="tag-row" style="margin-bottom:10px">
      ${ranked.map(([id, n]) => `<span class="pill">${esc(byId(id).name)} · ${n}</span>`).join('')}
    </div>
    <p class="note">${aligned
      ? `Your instincts and the numbers agree: <b>${esc(topGut.name)}</b> wins both ways. That’s about as clear as dog choosing gets.`
      : `Your gut leans <b>${esc(topGut.name)}</b> while the scoring favours <b>${esc(topScore.name)}</b>. Worth noticing — you’ll live with the dog, not the spreadsheet.`}</p>
  </div>`;
}

/* ---------- scenarios ---------- */
SCREENS.scnHandoff = () => {
  const p = player();
  app.innerHTML = `
  <div class="screen handoff ${S.turn ? 'p2' : ''}">
    <div class="big-avatar">${esc(dn(p)[0].toUpperCase())}</div>
    <div class="kicker">Round 2 · Lifestyle</div>
    <h2>${esc(dn(p))}’s turn</h2>
    <p class="note">Five everyday situations. Answer honestly — your combined answers nudge the rankings.</p>
    <button class="btn" data-act="beginScenarios">Start</button>
  </div>`;
};

SCREENS.scenario = () => {
  const p = player();
  const answers = S.scenarios[p.key] || {};
  const idx = SCENARIOS.findIndex(sc => !(sc.id in answers));
  if (idx === -1) { advanceScenario(); return; }
  const sc = SCENARIOS[idx];
  app.innerHTML = `
  <div class="screen">
    <div class="topbar">
      <span class="swipe-meta">${esc(dn(p))}</span>
      <div class="progress-track"><div class="progress-fill" style="width:${(idx / SCENARIOS.length) * 100}%"></div></div>
      <span class="swipe-meta">${idx + 1} / ${SCENARIOS.length}</span>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
      <div class="scenario-card">
        <div class="kicker">Scenario ${idx + 1}</div>
        <p class="q">${esc(sc.q)}</p>
        <div class="stack">
          ${sc.opts.map(o => `<button class="opt-btn" data-opt="${o.key}"><span class="oico">${o.icon}</span>${esc(o.label)}</button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
  app.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('sel');
      S.scenarios[p.key] = { ...(S.scenarios[p.key] || {}), [sc.id]: btn.dataset.opt };
      save();
      setTimeout(render, 260);
    });
  });
};

function advanceScenario() {
  if (S.turn === 0 && !S.scenarios.p2) { S.turn = 1; S.phase = 'scnHandoff'; }
  else { S.phase = 'results'; toast('Rankings refined by your answers'); }
  render();
}

/* ---------- visual duels ---------- */
function buildDuelPairs() {
  const likedSome = deckBreeds().filter(b => S.swipes.p1[b.id] === true || S.swipes.p2[b.id] === true);
  const pool = (likedSome.length >= 4 ? likedSome : deckBreeds())
    .sort((a, b) => refined(b).pct - refined(a).pct).slice(0, 8);
  const pairs = [];
  for (let i = 0; i + 1 < pool.length && pairs.length < 4; i += 2) pairs.push([pool[i].id, pool[i + 1].id]);
  return pairs;
}
SCREENS.duelHandoff = () => {
  const p = player();
  app.innerHTML = `
  <div class="screen handoff ${S.turn ? 'p2' : ''}">
    <div class="big-avatar">${esc(dn(p)[0].toUpperCase())}</div>
    <div class="kicker">Round 3 · Gut check</div>
    <h2>${esc(dn(p))}, trust your gut</h2>
    <p class="note">Two dogs at a time. Tap the one you instinctively want to bring home. No scores, no overthinking.</p>
    <button class="btn" data-act="beginDuels">Show me the dogs</button>
  </div>`;
};
SCREENS.duel = () => {
  const p = player();
  const picks = S.duels[p.key] || {};
  const idx = S.duelPairs.findIndex((_, i) => !(i in picks));
  if (idx === -1) { advanceDuel(); return; }
  const [ida, idb] = S.duelPairs[idx];
  const a = byId(ida), b = byId(idb);
  app.innerHTML = `
  <div class="screen" style="padding-bottom:calc(16px + env(safe-area-inset-bottom))">
    <div class="topbar">
      <span class="swipe-meta">${esc(dn(p))}</span>
      <div class="progress-track"><div class="progress-fill" style="width:${(idx / S.duelPairs.length) * 100}%"></div></div>
      <span class="swipe-meta">${idx + 1} / ${S.duelPairs.length}</span>
    </div>
    <p class="note" style="text-align:center;margin-bottom:12px">Which one do you instinctively want to bring home?</p>
    <div class="duel">
      <button class="duel-half" data-pick="${a.id}"><img src="${imgSrc(a, false)}" alt="${esc(a.name)}" style="object-position:${a.pos || '50% 35%'}"><span class="dname">${esc(a.name)}</span></button>
      <span class="duel-vs">or</span>
      <button class="duel-half" data-pick="${b.id}"><img src="${imgSrc(b, false)}" alt="${esc(b.name)}" style="object-position:${b.pos || '50% 35%'}"><span class="dname">${esc(b.name)}</span></button>
    </div>
  </div>`;
  app.querySelectorAll('[data-pick]').forEach(el => el.addEventListener('click', () => {
    S.duels[p.key] = { ...(S.duels[p.key] || {}), [idx]: el.dataset.pick };
    save();
    setTimeout(render, 180);
  }));
};
function advanceDuel() {
  if (S.turn === 0 && !S.duels.p2) { S.turn = 1; S.phase = 'duelHandoff'; }
  else { S.phase = 'results'; toast('Gut check recorded'); }
  render();
}

/* ---------- compare & rank ---------- */
SCREENS.compare = () => {
  const list = finalists();
  if (!list.length) { S.phase = 'results'; render(); return; }
  const rows = [
    ['Match', b => `<span class="pctcell">${b._profile ? computeScore(b, S.prefs).pct : refined(b).pct}%</span>`],
    ['Weight', b => esc(b.weight)],
    ['Shedding', b => shedLabel(b.facts.shed)],
    ['Grooming', b => groomLabel(b.facts.groom)],
    ['Exercise', b => exerciseLabel(b.facts.exercise)],
    ['Barking', b => quietLabel(b.facts.quiet)],
    ['Trainability', b => trainLabel(b.facts.train)],
    ['Cuddling', b => cuddleLabel(b.facts.affection)],
    ['Alone time', b => aloneLabel(b.facts.alone)],
    ['Travel', b => scaleLabel(b.facts.travel)],
    ['Apartment', b => scaleLabel(b.facts.apartment)],
    ['Health', b => healthLabel(b.facts.health)],
    ['Monthly cost', b => esc(b.cost)],
    ['Puppy phase', b => esc(b.puppyDiff)],
    ['Rescue in DE', b => esc(b.rescueDE)]
  ];
  app.innerHTML = `
  <div class="screen">
    ${topbar({ back: 'toResults', center: '<span class="kicker" style="flex:1;text-align:center">Finalists</span>' })}
    <h2 class="screen-title serif" style="font-size:28px">Compare our finalists</h2>
    <p class="note">${S.rescueOn ? 'Your rescue profile competes as a full finalist.' : 'Tip: build a rescue profile and it joins this table.'}</p>
    <div class="compare-wrap">
      <table class="compare">
        <thead><tr><th></th>${list.map(b => `<th>${b._profile ? '' : `<img src="${imgSrc(b, false)}" alt="" style="object-position:${b.pos || '50% 35%'}">`}${b._profile ? '🏡<br>' : ''}${esc(b.name)}</th>`).join('')}</tr></thead>
        <tbody>
          ${rows.map(([label, fn]) => `<tr><th>${label}</th>${list.map(b => `<td>${fn(b)}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="stack" style="margin-top:8px">
      <button class="btn block" data-act="startRank">Which one would we actually want to meet?</button>
      <button class="btn quiet block" data-act="toResults">Back to results</button>
    </div>
  </div>`;
};

SCREENS.rankHandoff = () => {
  const p = player();
  app.innerHTML = `
  <div class="screen handoff ${S.turn ? 'p2' : ''}">
    <div class="big-avatar">${esc(dn(p)[0].toUpperCase())}</div>
    <div class="kicker">Final call</div>
    <h2>${esc(dn(p))} ranks the finalists</h2>
    <p class="note">Tap in order: first tap = the dog you’d most want to meet in real life.</p>
    <button class="btn" data-act="beginRank">Rank them</button>
  </div>`;
};

SCREENS.rank = () => {
  const p = player();
  const list = finalists();
  const order = S.ranks[p.key] || [];
  app.innerHTML = `
  <div class="screen">
    <div class="topbar"><span class="swipe-meta">${esc(dn(p))}</span><span class="spacer"></span>
      <span class="swipe-meta">${order.length} / ${list.length}</span></div>
    <h2 class="serif" style="font-size:26px">Tap in order of “want to meet”</h2>
    <div class="rank-grid">
      ${list.map(b => {
        const pos = order.indexOf(b.id);
        return `<button class="rank-card ${pos > -1 ? 'picked' : ''}" data-rank="${b.id}">
          ${b._profile ? '<span style="width:62px;height:62px;border-radius:10px;background:var(--beige);display:grid;place-items:center;font-size:26px">🏡</span>' : `<img src="${imgSrc(b, false)}" alt="" style="object-position:${b.pos || '50% 35%'}">`}
          <span class="nm">${esc(b.name)}</span>
          <span class="order">${pos > -1 ? pos + 1 : ''}</span>
        </button>`;
      }).join('')}
    </div>
    <div class="stack" style="margin-top:18px">
      <button class="btn block" data-act="confirmRank" ${order.length === list.length ? '' : 'disabled'}>
        ${S.turn === 0 ? `Lock in & pass to ${esc(dn(other()))}` : 'Reveal our final ranking'}</button>
      <button class="btn quiet block" data-act="clearRank" ${order.length ? '' : 'disabled'}>Clear</button>
    </div>
  </div>`;
  app.querySelectorAll('[data-rank]').forEach(el => el.addEventListener('click', () => {
    const id = el.dataset.rank;
    let order2 = S.ranks[p.key] || [];
    order2 = order2.includes(id) ? order2.filter(x => x !== id) : [...order2, id];
    S.ranks[p.key] = order2; save(); render();
  }));
};

SCREENS.final = () => {
  const list = finalists();
  const [pA, pB] = S.players;
  const nA = dn(pA), nB = dn(pB);
  const scoreRow = list.map(b => {
    const r1 = (S.ranks.p1 || []).indexOf(b.id), r2 = (S.ranks.p2 || []).indexOf(b.id);
    const borda = (r1 === -1 ? list.length : r1) + (r2 === -1 ? list.length : r2);
    const pct = b._profile ? computeScore(b, S.prefs).pct : refined(b).pct;
    return { b, r1, r2, borda, pct };
  }).sort((a, b2) => a.borda - b2.borda || b2.pct - a.pct);
  app.innerHTML = `
  <div class="screen">
    ${topbar({ back: 'toResults', center: '<span class="kicker" style="flex:1;text-align:center">The verdict</span>' })}
    <h2 class="screen-title serif" style="font-size:30px">Who we’d actually meet</h2>
    <p class="note">Both rankings combined, equal votes. Ties broken by compatibility.</p>
    <div class="final-list" style="margin-top:10px">
      ${scoreRow.map((row, i) => `
        <div class="final-row">
          <span class="fnum">${i + 1}</span>
          ${row.b._profile ? '<span style="width:64px;height:64px;border-radius:12px;background:var(--beige);display:grid;place-items:center;font-size:28px">🏡</span>' : `<img src="${imgSrc(row.b, false)}" alt="" style="object-position:${row.b.pos || '50% 35%'}">`}
          <span class="t"><b>${esc(row.b.name)}</b>
            <span>${esc(nA)} #${row.r1 + 1} · ${esc(nB)} #${row.r2 + 1} · ${row.pct}% fit</span></span>
        </div>`).join('')}
    </div>
    <div class="panel">
      <h4>What happens next</h4>
      <p class="note" style="font-size:14px">Meet real dogs before deciding: adult dogs of the breed (breed clubs run “meet the breed” days), and a Saturday at your local Tierheim costs nothing but time. The right individual beats the right breed — every time.</p>
    </div>
    <button class="btn quiet block" style="margin-top:14px" data-act="toResults">Back to results</button>
  </div>`;
};

/* ---------- rescue mode ---------- */
SCREENS.rescue = () => {
  const on = S.rescueOn || RESCUE_TRAITS.filter(t => t.on).map(t => t.id);
  const prof = rescueProfileBreed(on);
  const sc = computeScore(prof, S.prefs);
  app.innerHTML = `
  <div class="screen">
    ${topbar({ back: 'toResults', center: '<span class="kicker" style="flex:1;text-align:center">Rescue mode</span>' })}
    <h2 class="screen-title serif" style="font-size:30px">Maybe not a breed at all?</h2>
    <p class="note" style="margin-top:6px">An adult foster dog with a <i>known</i> temperament removes the biggest uncertainty in this whole game. Breed averages predict; a foster family reports. Tick what your ideal rescue would need to bring:</p>
    <div class="chip-grid">
      ${RESCUE_TRAITS.map(t => `<button class="chip ${on.includes(t.id) ? 'on' : ''}" data-trait="${t.id}">${esc(t.label)}</button>`).join('')}
    </div>
    <div class="profile-score">
      <span class="big">${sc.pct}%</span>
      <span style="flex:1">
        <b style="font-size:15.5px">Your ideal rescue profile</b>
        <p class="note" style="margin-top:3px">A ${prof.weight} short-haired adult matching these traits would rank ${rankSentence(sc.pct)}.</p>
      </span>
    </div>
    <div class="panel">
      <h4>Where to look</h4>
      <p class="note" style="font-size:14px">Your local Tierheim, plus foster-based rescues that place dogs in family homes first — their assessments (“fine alone for 4 h, ignores bikes, quiet in the flat”) are exactly the data this profile needs. Popular profiles go fast; have your questions ready.</p>
    </div>
    <div class="stack" style="margin-top:16px">
      <button class="btn block" data-act="saveRescue">Save profile &amp; add to comparison</button>
      <button class="btn quiet block" data-act="toResults">Back</button>
    </div>
    <p class="fine-print">Honesty note: this score assumes the assessment is accurate — which is why foster-based orgs matter more than any breed chart.</p>
  </div>`;
  app.querySelectorAll('[data-trait]').forEach(chip => chip.addEventListener('click', () => {
    const id = chip.dataset.trait;
    let cur = S.rescueOn || RESCUE_TRAITS.filter(t => t.on).map(t => t.id);
    cur = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
    S.rescueOn = cur; save(); render();
  }));
};
function rankSentence(pct) {
  const deck = deckBreeds();
  const better = deck.filter(b => refined(b).pct > pct).length;
  return better === 0 ? 'above every breed in the deck'
    : better === 1 ? 'second only to the top breed'
    : `ahead of ${deck.length - better} of the ${deck.length} breeds in your deck`;
}

/* ---------- sheets ---------- */
let sheetEl = null, backdropEl = null;
function openSheet(html) {
  closeSheet(true);
  backdropEl = document.createElement('div');
  backdropEl.className = 'sheet-backdrop';
  backdropEl.addEventListener('click', () => closeSheet());
  sheetEl = document.createElement('div');
  sheetEl.className = 'sheet';
  sheetEl.innerHTML = `<div class="grabber"></div><div class="sheet-scroll">${html}</div>`;
  document.body.append(backdropEl, sheetEl);
  requestAnimationFrame(() => { backdropEl.classList.add('open'); sheetEl.classList.add('open'); });
  // drag-to-close on the grabber region
  let y0 = null, dy = 0;
  sheetEl.addEventListener('pointerdown', e => {
    const scroller = sheetEl.querySelector('.sheet-scroll');
    if (scroller.contains(e.target) && scroller.scrollTop > 0) return;
    y0 = e.clientY; dy = 0; sheetEl.style.transition = 'none';
  });
  sheetEl.addEventListener('pointermove', e => {
    if (y0 === null) return;
    dy = Math.max(0, e.clientY - y0);
    if (dy > 0) sheetEl.style.transform = `translate(-50%, ${dy}px)`;
  });
  const endDrag = () => {
    if (y0 === null) return;
    sheetEl.style.transition = '';
    if (dy > 110) closeSheet(); else sheetEl.style.transform = '';
    y0 = null;
  };
  sheetEl.addEventListener('pointerup', endDrag);
  sheetEl.addEventListener('pointercancel', endDrag);
  sheetEl.querySelectorAll('[data-act]').forEach(el2 => el2.addEventListener('click', () => act(el2.dataset.act, el2.dataset)));
}
function closeSheet(instant) {
  if (!sheetEl) return;
  const s = sheetEl, b = backdropEl;
  sheetEl = backdropEl = null;
  if (instant) { s.remove(); b.remove(); return; }
  s.classList.remove('open'); b.classList.remove('open');
  setTimeout(() => { s.remove(); b.remove(); }, 450);
}

function detailSheet(b) {
  const sc = scoreOf(b);
  const f = b.facts;
  openSheet(`
    <p class="de-name">${esc(b.de)} · ${esc(b.weight)}</p>
    <h3>${esc(b.name)} <span style="font-size:17px;color:var(--ink-2)">· ${sc.pct}%</span></h3>
    <h4>What living with this dog feels like</h4>
    <p class="body-text">${esc(b.feels)}</p>
    <h4>Pros — for your life</h4>
    <ul class="plist pros">${b.pros.map(x => `<li><span class="dot"></span>${esc(x)}</li>`).join('')}</ul>
    <h4>Downsides — for your life</h4>
    <ul class="plist cons">${b.cons.map(x => `<li><span class="dot"></span>${esc(x)}</li>`).join('')}</ul>
    <h4>Daily exercise</h4>
    <p class="body-text">${exerciseLabel(f.exercise)} — honest walks, not hallway laps.</p>
    <h4>Coat</h4>
    <div class="coat-grid">
      <span class="k">Shedding</span><span>${shedLabel(f.shed)}</span>
      <span class="k">Brushing</span><span>${brushLabel(f.brush)}</span>
      <span class="k">Professional grooming</span><span>${groomLabel(f.groom)}</span>
    </div>
    <h4>Scores</h4>
    ${[['Apartment', f.apartment], ['Quietness', f.quiet], ['Trainability', f.train],
       ['Travel', f.travel], ['Alone-time potential', f.alone], ['Health / robustness', f.health]]
      .map(([l, v]) => `<div class="meter-row"><span class="mlabel">${l}</span>${dotMeter(v)}<span class="mvalue">${v}</span></div>`).join('')}
    ${sc.penalties.length ? `<div class="flag-note"><span>⚠️</span><span>${sc.penalties.map(p => `<b>${p.pts}</b> ${esc(p.label)}`).join(' · ')}. We surface this on purpose — a high lifestyle score shouldn’t hide it.</span></div>` : ''}
    <h4>Cost &amp; sourcing</h4>
    <div class="coat-grid">
      <span class="k">Monthly cost</span><span>${esc(b.cost)}</span>
      <span class="k">Puppy phase</span><span>${esc(b.puppyDiff)}</span>
      <span class="k">Adult rescue in DE</span><span>${esc(b.rescueDE)}</span>
    </div>
    <p class="fine-print">Breed characteristics describe tendencies — individual dogs vary widely. Meeting adults of the breed tells you more than any score.</p>
  `);
}

function menuSheet() {
  openSheet(`
    <h3>Fetch</h3>
    <p class="note" style="margin-top:4px">Find the dog that fits your life — a two-player decision game.</p>
    <div class="stack" style="margin-top:18px">
      <button class="action-row" data-act="scoringInfo"><span class="ico">⚖️</span><span class="t"><b>How scoring works</b><span>No randomness, all preferences</span></span></button>
      <button class="action-row" data-act="creditsInfo"><span class="ico">📷</span><span class="t"><b>Photo credits</b><span>Real dogs, sourced openly</span></span></button>
      <button class="action-row" data-act="confirmReset"><span class="ico">↺</span><span class="t"><b>Start over</b><span>Clears all swipes and answers</span></span></button>
    </div>
    <p class="fine-print">Breed traits describe tendencies, not guarantees. Health, breeder/rescue quality, socialisation, training and individual temperament matter enormously.</p>
  `);
}

function scoringSheet() {
  const w = prefWeights(S.prefs);
  const names = { coat: 'Coat & shedding', temperament: 'Temperament & calm', health: 'Health & robustness', barking: 'Barking', exercise: 'Exercise fit', training: 'Trainability', size: 'Size & apartment', travel: 'Travel', alone: 'Alone time' };
  const rows = Object.entries(w).sort((a, b) => b[1] - a[1]);
  openSheet(`
    <h3>How scoring works</h3>
    <p class="body-text" style="margin-top:8px">Every percentage is computed from your preference settings — nothing is random. Each dog’s real-world traits are weighted like this right now:</p>
    <div style="margin-top:14px">
      ${rows.map(([k, v]) => `
        <div class="meter-row">
          <span class="mlabel">${names[k]}</span>
          <span style="flex:2;height:7px;border-radius:4px;background:var(--line);overflow:hidden"><span style="display:block;height:100%;width:${Math.round(v * 300)}%;max-width:100%;background:var(--ink)"></span></span>
          <span class="mvalue">${Math.round(v * 100)}%</span>
        </div>`).join('')}
    </div>
    <h4>Honesty adjustments</h4>
    <p class="body-text" style="font-size:14px">Serious structural or heritable problems subtract points <i>after</i> the lifestyle score, so a pleasant temperament can’t hide them: flat-faced breathing risks (−8), breed-wide heritable disease (−8), spinal risk with stairs and jumps (−6), fragility (−4), big-dog logistics in a walk-up flat (−4).</p>
    <h4>Refinements</h4>
    <p class="body-text" style="font-size:14px">Round 2 scenario answers nudge scores by a few points (both players count equally). Round 3 is deliberately unscored — it’s there to show you your own instincts.</p>
  `);
}

function creditsSheet() {
  const entries = Object.entries(PHOTO_CREDITS);
  openSheet(`
    <h3>Photo credits</h3>
    <p class="body-text" style="margin-top:8px">All photos are real dogs from two openly published collections:</p>
    <ul class="plist" style="margin-top:10px">
      <li><span class="dot" style="background:var(--sage)"></span><span><b>${esc(PHOTO_SOURCES.fci.name)}</b> — ${esc(PHOTO_SOURCES.fci.license)}</span></li>
      <li><span class="dot" style="background:var(--sage)"></span><span><b>${esc(PHOTO_SOURCES.dogceo.name)}</b> — ${esc(PHOTO_SOURCES.dogceo.license)}</span></li>
    </ul>
    <p class="note" style="margin-top:10px">The Rat Terrier photo shows a rat-terrier-type dog from the toy terrier collection — true Rat Terrier photos are rare in open datasets. Swap any photo by replacing its file in <code>fetch/img/</code>.</p>
    <details style="margin-top:14px"><summary style="font-weight:650;font-size:14px">Per-image sources</summary>
      <div class="coat-grid" style="margin-top:10px;font-size:12.5px">
        ${entries.map(([k, v]) => `<span class="k">${esc(k)}</span><span>${esc(v.src)}: ${esc(v.file)}</span>`).join('')}
      </div>
    </details>
  `);
}

/* ---------- actions ---------- */
const ACTIONS = {
  toWelcome: () => { S.phase = 'welcome'; render(); },
  toPrefs: () => { S.phase = 'prefs'; render(); },
  startSwiping: () => {
    const anySwipes = Object.keys(S.swipes.p1).length + Object.keys(S.swipes.p2).length;
    if (!S.orders || !anySwipes) {
      const ids = deckBreeds().map(b => b.id);
      S.orders = { p1: shuffle(ids), p2: shuffle(ids) };
    }
    S.turn = 0; S.idx = Object.keys(S.swipes.p1).length ? S.idx : 0;
    S.phase = 'handoff'; render();
  },
  beginTurn: () => { S.phase = 'swipe'; S.idx = 0; S.puppyMode = {}; render(); },
  undo: () => {
    const p = player();
    const last = S.history[p.key].pop();
    if (!last) return;
    delete S.swipes[p.key][last];
    S.idx = Math.max(0, S.idx - 1);
    save(); render();
  },
  togglePuppy: d => {
    S.puppyMode[d.id] = !S.puppyMode[d.id];
    const card = app.querySelector('.dogcard.top');
    const img = card.querySelector('.photo img');
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = imgSrc(byId(d.id), S.puppyMode[d.id]);
      img.onload = () => { img.style.transition = 'opacity .3s'; img.style.opacity = 1; };
      card.querySelector('.puppy-toggle').textContent = S.puppyMode[d.id] ? 'See adult' : 'See puppy';
    }, 120);
    save();
  },
  details: d => detailSheet(byId(d.id)),
  toResults: () => { closeSheet(); S.phase = 'results'; render(); },
  startScenarios: () => {
    S.turn = S.scenarios.p1 ? 1 : 0;
    if (scenariosDone()) { S.scenarios = { p1: null, p2: null }; S.turn = 0; }
    S.phase = 'scnHandoff'; render();
  },
  beginScenarios: () => { S.phase = 'scenario'; render(); },
  startDuels: () => {
    if (!S.duelPairs || duelsDone()) { S.duelPairs = buildDuelPairs(); S.duels = { p1: null, p2: null }; }
    S.turn = S.duels.p1 ? 1 : 0;
    S.phase = 'duelHandoff'; render();
  },
  beginDuels: () => { S.phase = 'duel'; render(); },
  toCompare: () => { S.phase = 'compare'; render(); },
  startRank: () => { S.ranks = { p1: null, p2: null }; S.turn = 0; S.phase = 'rankHandoff'; render(); },
  beginRank: () => { S.phase = 'rank'; render(); },
  clearRank: () => { S.ranks[player().key] = []; save(); render(); },
  confirmRank: () => {
    if (S.turn === 0) { S.turn = 1; S.phase = 'rankHandoff'; }
    else { S.phase = 'final'; }
    render();
  },
  toRescue: () => { S.phase = 'rescue'; render(); },
  saveRescue: () => {
    if (!S.rescueOn) S.rescueOn = RESCUE_TRAITS.filter(t => t.on).map(t => t.id);
    save(); S.phase = 'results'; render();
    toast('Rescue profile added to your finalists');
  },
  menu: () => menuSheet(),
  scoringInfo: () => scoringSheet(),
  creditsInfo: () => creditsSheet(),
  confirmReset: () => {
    if (confirm('Start over? All swipes and answers will be cleared.')) resetAll();
  }
};

render();
