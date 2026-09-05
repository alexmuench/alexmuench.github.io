# Dog Match

A two-player breed-matching game for Alex & Hillary — swipe separately, see where you match.
Mobile-first static web app, no build step, no dependencies.

## Running it

Any static server works:

```
cd dogmatch && python3 -m http.server 8000
```

Once this branch is merged into `gh-pages`, it deploys automatically to
`/dogmatch/` on the site (the repo's CNAME currently points the site at
`flywithmeapp.co`, so the app lands at `https://flywithmeapp.co/dogmatch/`).

## Structure

| File | What it is |
|---|---|
| `index.html` | Shell — everything renders client-side |
| `data.js` | The 22 dog profiles (facts, contextual pros/cons, costs), scenarios, preference schema |
| `scoring.js` | Pure scoring engine — weighted preferences → % + explicit health/structure penalties |
| `app.js` | State machine, swipe gestures, bottom sheets, all screens; state persists in `localStorage` |
| `credits.js` | Per-photo source manifest (generated) |
| `img/` | Curated real breed photography (see credits in-app) |

## How scoring works

Nothing is random. Each breed's real-world traits are scored against the
preference settings (weights: coat 20%, temperament/calm 17%, health 15%,
barking 12%, exercise 10%, trainability 9%, size/apartment 7%, travel 6%,
alone-time 4% — rebalanced live when preferences change). Structural health
problems subtract points *after* the lifestyle score so they can't be hidden
by a pleasant temperament (flat-faced −8, heritable disease −8, spinal risk
−6, fragility −4, 30 kg vs. a walk-up −4). Round-2 scenario answers apply
small averaged refinements. To retune anything, edit `facts` in `data.js`
and check the table with:

```
cd dogmatch && node -e "const {BREEDS,PREF_SCHEMA}=require('./data.js');const S=require('./scoring.js');const p=Object.fromEntries(PREF_SCHEMA.map(x=>[x.id,x.def]));BREEDS.map(b=>({n:b.name,s:S.computeScore(b,p).pct})).sort((a,b)=>b.s-a.s).forEach(r=>console.log(r.s,r.n))"
```

## Photography

Real dogs from two openly published GitHub collections (no AI images):
[AtharvaTaras/Dog-Breeds-Dataset](https://github.com/AtharvaTaras/Dog-Breeds-Dataset)
(CC BY 4.0 collection of web-collected breed photos) and
[jigsawpieces/dog-api-images](https://github.com/jigsawpieces/dog-api-images)
(Dog CEO API collection: Stanford Dogs Dataset + community submissions).
Per-image sources are listed in the app under menu → Photo credits and in
`img/credits.json`. The Rat Terrier card shows a rat-terrier-type dog from
the toy terrier collection. To swap any photo, replace its file in `img/`
(cards crop to roughly 4:5 — adjust `pos` in `data.js` if the framing is off).

Breed traits describe tendencies, not guarantees — the app narrows a
conversation, it doesn't predict an individual dog.
