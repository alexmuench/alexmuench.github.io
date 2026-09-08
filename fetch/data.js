/* Fetch — breed data
   Facts are stored on natural scales and scored against preferences in scoring.js.
   1–5 scales: higher is always "better for city-apartment life"
   (quiet 5 = very quiet, health 5 = very robust, alone 5 = handles hours easily).
   shed: 0..1 where 1 = essentially no hair around the home.
   All breed traits describe tendencies, not guarantees — individuals vary a lot. */

const BREEDS = [
  {
    id: 'whippet', name: 'Whippet', de: 'Whippet',
    weight: '11–18 kg', kg: [11, 18],
    tags: ['short coat', 'quiet indoors', 'cuddly'],
    line: 'Fast outside. Professional blanket burrito inside.',
    facts: { shed: 0.88, brush: 'rare', groom: 'none', exercise: 75,
      calm: 5, affection: 4.5, quiet: 4.5, train: 4, apartment: 5,
      travel: 4, alone: 3.5, health: 4.5 },
    flags: ['offleash'],
    cost: '€95–140', puppyDiff: 'Moderate — sensitive souls; gentle consistency beats drill-sergeant energy.',
    rescueDE: 'Occasional — German sighthound rescues rehome adults regularly.',
    feels: 'Built like a Formula 1 car, lives like a heated blanket. Two good walks and a chance to sprint, then it folds itself into a croissant next to whoever is working from home. Guests often ask if you actually own a dog.',
    pros: [
      'One of the lowest-maintenance coats in dogdom — no groomer, minimal hair on the sofa',
      'Genuinely calm indoors: settles beside your desk for a full home-office day',
      'Rarely barks — top-floor-neighbour friendly',
      'Healthy, unexaggerated build; light enough to carry upstairs in a pinch'
    ],
    cons: [
      'Chase instinct: off-leash freedom needs fenced areas or very good recall work',
      'At 11–18 kg it’s a half-price DB ticket and a big hotel bed guest, not hand luggage',
      'Thin coat means a wardrobe of dog jumpers for German winters',
      'Sensitive — harsh corrections or long lonely days wear on them'
    ],
    why: 'Very low coat maintenance, quiet, affectionate and unusually calm indoors.',
    watch: 'Prey drive — safe off-leash running needs planning.',
    pos: '50% 30%'
  },
  {
    id: 'minipoodle', name: 'Miniature Poodle', de: 'Zwergpudel',
    weight: '4–7 kg', kg: [4, 7],
    tags: ['barely sheds', 'very clever', 'groomer needed'],
    line: 'Extremely smart, barely sheds — but somebody has to pay the groomer.',
    facts: { shed: 0.95, brush: 'weekly', groom: 'regular', exercise: 70,
      calm: 4, affection: 4.5, quiet: 3, train: 5, apartment: 5,
      travel: 4.5, alone: 3.5, health: 4 },
    flags: [],
    cost: '€125–170', puppyDiff: 'Moderate — the brain arrives months before the off switch.',
    rescueDE: 'Regular — small poodles and poodle mixes turn up in Tierheime often.',
    feels: 'A small dog that learns your routines faster than you form them. Loves training games, adapts to almost any plan, and travels like a seasoned consultant. In a short pet clip it’s a tidy, athletic little dog — not a show-ring topiary.',
    pros: [
      'Almost no shed hair — the classic choice for people who care about their interior',
      'One of the smartest small dogs there is — training it is genuinely fun',
      'Small enough for free carrier-free travel on DB and easy café visits',
      'Adapts well to changing schedules and shift work'
    ],
    cons: [
      'Professional grooming every 6–8 weeks, forever (~€50–70 per visit)',
      'The curly coat still needs brushing between grooms or it mats',
      'That big brain needs a job — a bored poodle invents opinions, sometimes loudly',
      'Can get vocal if under-stimulated'
    ],
    why: 'Near-zero shedding, top-tier trainability and a perfect travel size.',
    watch: 'Low shedding is not low grooming — budget the groomer.',
    pos: '50% 40%'
  },
  {
    id: 'iggy', name: 'Italian Greyhound', de: 'Italienisches Windspiel',
    weight: '3.5–5 kg', kg: [3.5, 5],
    tags: ['no-fuss coat', 'velcro dog', 'featherweight'],
    line: '4 kg of devotion with the coat maintenance of a houseplant.',
    facts: { shed: 0.97, brush: 'rare', groom: 'none', exercise: 55,
      calm: 4.5, affection: 5, quiet: 4, train: 2.5, apartment: 4.5,
      travel: 5, alone: 2.5, health: 3 },
    flags: ['fragile', 'offleash', 'velcro'],
    cost: '€85–120', puppyDiff: 'Hard — house-training is famously slow, and growing legs are breakable.',
    rescueDE: 'Occasional via sighthound rescue.',
    feels: 'A miniature whippet that considers your lap its registered address. Practically zero coat care, deeply affectionate, and light enough to forget in a tote bag. In return it wants warmth, company and a soft landing on every surface.',
    pros: [
      'Effectively no coat maintenance and very little hair around the flat',
      'The ultimate travel dog — flies, trains and cafés barely notice it',
      'Quiet and gentle; melts into whoever is on the sofa',
      'Featherweight: stairs and emergencies are a non-issue'
    ],
    cons: [
      'Fragile — leg fractures from bad jumps are a known breed problem',
      'House-training can test a designer’s patience with beautiful rugs',
      'True velcro dog: alone-time needs slow, deliberate training',
      'Needs coats in winter and dislikes rain with theatrical intensity'
    ],
    why: 'Minimal coat, maximal cuddles, effortless travel size.',
    watch: 'Robustness — bones, cold and house-training all need managing.',
    pos: '50% 35%'
  },
  {
    id: 'schnauzer', name: 'Miniature Schnauzer', de: 'Zwergschnauzer',
    weight: '5.5–8.5 kg', kg: [5.5, 8.5],
    tags: ['low shedding', 'robust', 'opinionated'],
    line: 'Sturdy, clever, and personally offended by the hallway.',
    facts: { shed: 0.9, brush: 'weekly', groom: 'regular', exercise: 75,
      calm: 3.5, affection: 4, quiet: 2, train: 4, apartment: 4.5,
      travel: 4, alone: 3.5, health: 4 },
    flags: ['watchdog'],
    cost: '€115–160', puppyDiff: 'Moderate — opinions arrive early and need channelling.',
    rescueDE: 'Regular — schnauzers appear in Tierheime and breed rescue.',
    feels: 'A proper little character: sturdy, funny, up for anything, with a beard that collects water and then shares it with your trousers. Wants to be involved in everything and files verbal reports on corridor activity.',
    pros: [
      'Low-shedding wiry coat — little hair on furniture',
      'Robust and healthy; handles hikes, travel and weather without drama',
      'Smart and trainable with real enthusiasm',
      'A convenient, carryable size for trains and stairs'
    ],
    cons: [
      'Alert barking is the breed hobby — a real project in a top-floor flat',
      'Needs stripping or clipping every 6–8 weeks',
      'Watchdog wiring: guests and hallway sounds get announced',
      'Busier indoors than the sighthound options'
    ],
    why: 'Robust, clever, low-shedding and a very practical size.',
    watch: 'The hallway commentary — barking needs training from day one.',
    pos: '50% 35%'
  },
  {
    id: 'basenji', name: 'Basenji', de: 'Basenji',
    weight: '9–12 kg', kg: [9, 12],
    tags: ['barkless', 'cat-like clean', 'independent'],
    line: 'Doesn’t bark. Doesn’t fetch. Doesn’t ask permission.',
    facts: { shed: 0.8, brush: 'rare', groom: 'none', exercise: 90,
      calm: 3.5, affection: 3, quiet: 4.2, train: 2, apartment: 4,
      travel: 3.5, alone: 2.5, health: 4.5 },
    flags: ['offleash'],
    cost: '€95–130', puppyDiff: 'Hard — a clever escape artist with its own agenda.',
    rescueDE: 'Rare — a handful via breed clubs.',
    feels: 'The cat software running on dog hardware. Grooms itself, smells of nothing, doesn’t bark — it yodels, occasionally, memorably. Affection is real but on its own terms; obedience is a suggestion it will consider.',
    pros: [
      'No barking — instead a rare, frankly artistic yodel',
      'Self-cleaning short coat; one of the tidiest dogs to live with',
      'Compact, athletic and healthy',
      'Genuinely interesting personality for people who like cats and dogs'
    ],
    cons: [
      'Training works on Basenji terms — recall may never be trustworthy',
      'Strong prey drive; leashed life for most individuals',
      'A bored Basenji redecorates: alone-time must be built up carefully',
      'Less openly cuddly than most breeds on this list'
    ],
    why: 'Quiet, clean, healthy — an intriguing wildcard.',
    watch: 'Independence — it will love you, but rarely obey you.',
    pos: '50% 35%'
  },
  {
    id: 'chihuahua', name: 'Smooth Chihuahua', de: 'Kurzhaar-Chihuahua',
    weight: '1.5–3 kg', kg: [1.5, 3],
    tags: ['ultra portable', 'short coat', 'big ego'],
    line: 'Cabin baggage with strong opinions.',
    facts: { shed: 0.78, brush: 'rare', groom: 'none', exercise: 45,
      calm: 4, affection: 4.5, quiet: 2, train: 3, apartment: 5,
      travel: 5, alone: 3, health: 3.5 },
    flags: ['fragile', 'watchdog'],
    cost: '€75–110', puppyDiff: 'Moderate — tiny bladder, enormous self-image.',
    rescueDE: 'Very common — Tierheime are full of chihuahuas and chi-mixes.',
    feels: 'The most portable dog that exists, with the self-confidence of a much larger mammal. Deeply attached to its people, suspicious of everyone else’s existence. A well-raised one is charming; an under-trained one is a smoke alarm.',
    pros: [
      'Travels anywhere for free — trains, planes, restaurants, hotel beds',
      'Short coat, tiny dog: barely measurable hair output',
      'Long-lived and cheap to keep',
      'Genuinely devoted lap companion'
    ],
    cons: [
      'Alarm barking is common and would carry through the whole building',
      'Fragile around stairs, sofas and careless feet',
      'So small that daily life needs constant low-level vigilance',
      'Socialisation needs real work or the ego wins'
    ],
    why: 'Unbeatable portability with a wash-and-go coat.',
    watch: 'Barking and breakability — training and management, always.',
    pos: '50% 30%'
  },
  {
    id: 'greyhound', name: 'Greyhound', de: 'Greyhound',
    weight: '26–34 kg', kg: [26, 34],
    tags: ['couch potato', 'silent', 'big'],
    line: 'A 30 kg professional napper with a racing past.',
    facts: { shed: 0.8, brush: 'rare', groom: 'none', exercise: 60,
      calm: 5, affection: 4, quiet: 5, train: 3, apartment: 3.5,
      travel: 2, alone: 4, health: 4 },
    flags: ['offleash', 'big'],
    cost: '€130–180', puppyDiff: 'Rarely relevant — most arrive as calm ex-racing adults.',
    rescueDE: 'Good — Spanish galgo and ex-racing rescues are very active in Germany.',
    feels: 'The laziest athlete in the animal kingdom. Twenty minutes of zoom, twenty-three hours of horizontal elegance. Silent, gentle, undemanding — just physically enormous for a city flat up a few flights of stairs.',
    pros: [
      'Calmest, quietest temperament on this list — barely knows how to bark',
      'Short coat, low grooming, surprisingly low exercise needs',
      'Adult rescues arrive with known personalities',
      'Gentle and unflappable with guests'
    ],
    cons: [
      'Carrying 30 kg upstairs when it’s injured or old is a two-person job',
      'Travel gets complicated: muzzle rules, ticket rules, hotel size limits',
      'Takes up real estate — the sofa becomes officially theirs',
      'Prey drive means leashed walks and fenced runs'
    ],
    why: 'Temperament-wise nearly perfect: silent, calm, gentle.',
    watch: 'Sheer size versus a top-floor walk-up and European travel.',
    pos: '50% 35%'
  },
  {
    id: 'manchester', name: 'Manchester Terrier', de: 'Manchester Terrier',
    weight: '7–10 kg', kg: [7, 10],
    tags: ['sleek coat', 'healthy', 'underrated'],
    line: 'A whippet sketched in ink — neat, quick, low-effort coat.',
    facts: { shed: 0.85, brush: 'rare', groom: 'none', exercise: 75,
      calm: 3.5, affection: 4, quiet: 3, train: 3.5, apartment: 4.5,
      travel: 4.5, alone: 3.5, health: 4.5 },
    flags: ['offleash'],
    cost: '€90–125', puppyDiff: 'Moderate — a busy adolescent phase, then it settles.',
    rescueDE: 'Rare — small breed community; occasional club rehomes.',
    feels: 'The design object among terriers: glossy black-and-tan, clean lines, zero grooming. Livelier than a whippet, calmer than most terriers, devoted to its own people. One of dogdom’s best-kept secrets — which also makes one hard to find.',
    pros: [
      'Wipe-clean coat: no groomer, minimal shedding',
      'Notably healthy, sound little breed',
      'Elegant, compact, easy to travel with',
      'More biddable than the terrier stereotype'
    ],
    cons: [
      'Rare in Germany — expect waiting lists and long drives',
      'Terrier alertness: some hallway commentary is likely',
      'Ratting heritage — small fluffy things get chased',
      'Needs proper daily outings; not quite whippet-level couch talent'
    ],
    why: 'Whippet-adjacent virtues in a smaller, sturdier package.',
    watch: 'Availability in Germany — and a dash of terrier voice.',
    pos: '50% 35%'
  },
  {
    id: 'ett', name: 'English Toy Terrier', de: 'English Toy Terrier',
    weight: '2.7–3.6 kg', kg: [2.7, 3.6],
    tags: ['tiny', 'sleek', 'very rare'],
    line: 'Manchester Terrier, travel size.',
    facts: { shed: 0.9, brush: 'rare', groom: 'none', exercise: 55,
      calm: 3.5, affection: 4, quiet: 3, train: 3.5, apartment: 5,
      travel: 5, alone: 3, health: 3.5 },
    flags: ['fragile'],
    cost: '€80–110', puppyDiff: 'Moderate — but first you must actually find one.',
    rescueDE: 'Very rare.',
    feels: 'The Manchester’s toy edition: same ink-drawn elegance, candle-flame ears, cabin-baggage dimensions. A lively, warm little companion that thinks it’s a proper terrier — because it is.',
    pros: [
      'Featherweight travel champion with a zero-effort coat',
      'More terrier substance than the typical toy breed',
      'Quiet-ish for a toy, affectionate with its people',
      'Apartment-perfect size'
    ],
    cons: [
      'One of Britain’s rarest breeds — genuinely hard to source, tiny gene pool',
      'Small-dog fragility around stairs and furniture',
      'Toy-size bladder: house-training takes patience',
      'Some alert barking potential'
    ],
    why: 'Sleek Manchester virtues at hand-luggage scale.',
    watch: 'Rarity and fragility — finding one is the first project.',
    pos: '50% 35%'
  },
  {
    id: 'gpinscher', name: 'German Pinscher', de: 'Deutscher Pinscher',
    weight: '14–20 kg', kg: [14, 20],
    tags: ['athletic', 'loyal', 'watchful'],
    line: 'Athletic, devoted, and convinced it’s head of security.',
    facts: { shed: 0.8, brush: 'rare', groom: 'none', exercise: 100,
      calm: 3, affection: 4, quiet: 2.5, train: 3.5, apartment: 3.5,
      travel: 3.5, alone: 3, health: 4.5 },
    flags: ['watchdog', 'offleash'],
    cost: '€105–145', puppyDiff: 'Challenging — a pushy, clever adolescence that needs consistency.',
    rescueDE: 'Rare.',
    feels: 'A sleek, serious athlete from the region — the original pinscher. Deeply loyal, impressively capable, and of the firm professional opinion that your building needs monitoring. Wonderful for active owners; a lot of dog for a calm flat.',
    pros: [
      'Handsome low-maintenance coat, no groomer',
      'Very healthy, robust working build',
      'Devoted one-family dog that loves joint activity',
      'German heritage breed with an active club scene'
    ],
    cons: [
      'Real exercise and engagement needs — closer to 1.5–2 h of activity',
      'Watchdog instincts clash with hallway acoustics',
      'Suspicious of strangers without steady socialisation',
      'At 14–20 kg, borderline for relaxed train and café travel'
    ],
    why: 'Robust, loyal, zero-grooming athlete.',
    watch: 'Energy and guarding instincts exceed the brief.',
    pos: '50% 35%'
  },
  {
    id: 'dsf', name: 'Danish-Swedish Farmdog', de: 'Dänisch-Schwedischer Hofhund',
    weight: '7–12 kg', kg: [7, 12],
    tags: ['off switch', 'easygoing', 'handy size'],
    line: 'Small farm all-rounder with a famous off switch.',
    facts: { shed: 0.65, brush: 'rare', groom: 'none', exercise: 85,
      calm: 4, affection: 4.5, quiet: 3.5, train: 4.5, apartment: 4.5,
      travel: 4.5, alone: 3.5, health: 4.5 },
    flags: [],
    cost: '€90–125', puppyDiff: 'Moderate — busy youngster, famously settled by two.',
    rescueDE: 'Rare — a small but growing Scandinavian-import scene.',
    feels: 'Looks like a Jack Russell that went to therapy. Cheerful, clever and busy outdoors, then flips the famous off switch and naps through your work calls. Scandinavia’s favourite family dog for exactly this reason.',
    pros: [
      'The renowned on/off switch: active outside, settled inside',
      'Friendly, trainable, unneurotic — an easy dog to share a life with',
      'Sturdy, healthy and a very practical 7–12 kg',
      'Great traveller and café companion'
    ],
    cons: [
      'Short coat sheds more than you’d expect — white hairs on navy sofas',
      'Wants real activity and some jobs to do',
      'Rare in Germany; most puppies come via Danish/Swedish breeders',
      'Some farm-dog alarm barking'
    ],
    why: 'Easygoing, trainable, travel-friendly with a real off switch.',
    watch: 'It does shed — and finding one takes patience.',
    pos: '50% 35%'
  },
  {
    id: 'ratterrier', name: 'Rat Terrier', de: 'Rat Terrier',
    weight: '5–11 kg', kg: [5, 11],
    tags: ['adaptable', 'sturdy', 'US import'],
    line: 'American farm pragmatism at lap size.',
    facts: { shed: 0.65, brush: 'rare', groom: 'none', exercise: 85,
      calm: 3.5, affection: 4.5, quiet: 3, train: 4, apartment: 4,
      travel: 4, alone: 3.5, health: 4.5 },
    flags: ['offleash'],
    cost: '€90–125', puppyDiff: 'Moderate — smart and busy, but eager to work with you.',
    rescueDE: 'Very rare in Europe — this is a US breed.',
    feels: 'America’s practical little farm terrier: smart, sturdy, affectionate, calmer than a Jack Russell. Adapts to apartment life better than most terriers if the walks are real.',
    pros: [
      'Healthy, unexaggerated, easy-care build',
      'More cuddle-motivated and biddable than most terriers',
      'Handy size for travel and stairs',
      'Playful without being manic'
    ],
    cons: [
      'Short coat sheds steadily — more sofa hair than a whippet',
      'Practically unavailable in Germany; importing is a project',
      'Terrier prey drive on walks',
      'Some alert barking'
    ],
    why: 'A sane, sturdy terrier with real family talent.',
    watch: 'Sourcing one in Europe — and steady shedding.',
    pos: '50% 30%'
  },
  {
    id: 'toypoodle', name: 'Toy Poodle', de: 'Toypudel',
    weight: '2.5–4 kg', kg: [2.5, 4],
    tags: ['barely sheds', 'tiny genius', 'groomer needed'],
    line: 'The full poodle brain, shipped in the smallest case.',
    facts: { shed: 0.95, brush: 'weekly', groom: 'regular', exercise: 55,
      calm: 4, affection: 5, quiet: 3, train: 5, apartment: 5,
      travel: 5, alone: 3, health: 3.5 },
    flags: ['velcro'],
    cost: '€115–155', puppyDiff: 'Moderate — clever, quick, slightly clingy.',
    rescueDE: 'Regular — small poodles and mixes are common in shelters.',
    feels: 'Every poodle feature — the wit, the trainability, the non-shedding coat — compressed into a dog you can carry in one hand. Devoted to the point of shadowing you between rooms.',
    pros: [
      'Near-zero shedding in the most portable possible package',
      'Absurdly quick to train; party tricks come free',
      'Free on every train, welcome in every café',
      'Long-lived'
    ],
    cons: [
      'Groomer every 6–8 weeks, plus brushing at home',
      'Prefers company around — alone-time needs building up',
      'Toy-size joints and teeth need watching',
      'Can learn to use its voice if bored'
    ],
    why: 'Poodle intelligence at maximum portability.',
    watch: 'Grooming costs and a tendency to velcro.',
    pos: '50% 40%'
  },
  {
    id: 'mediumpoodle', name: 'Medium Poodle', de: 'Kleinpudel',
    weight: '9–13 kg', kg: [9, 13],
    tags: ['barely sheds', 'hiking size', 'groomer needed'],
    line: 'The poodle in the middle: big enough to hike, small enough to carry.',
    facts: { shed: 0.95, brush: 'weekly', groom: 'regular', exercise: 80,
      calm: 4, affection: 4.5, quiet: 3.5, train: 5, apartment: 4.5,
      travel: 4, alone: 3.5, health: 4 },
    flags: [],
    cost: '€135–185', puppyDiff: 'Moderate — energetic and clever; loves having things to learn.',
    rescueDE: 'Occasional.',
    feels: 'The Goldilocks poodle: substantial enough for proper hikes and confident city life, still liftable when the lift doesn’t exist. Same genius coat, same genius brain, slightly more dog to exercise.',
    pros: [
      'Non-shedding coat at a robust, athletic size',
      'Brilliant trainability — a genuine hobby dog if you want one',
      'Steadier and less yappy than smaller poodles',
      'Handles long adventures and weather well'
    ],
    cons: [
      'The biggest grooming bill on this list',
      'Needs more daily exercise than the small companions',
      'At 9–13 kg, DB tickets and carriers get less casual',
      'Under-stimulation shows up as mischief'
    ],
    why: 'All the poodle virtues in a hiking-grade size.',
    watch: 'Time and money: exercise plus grooming add up.',
    pos: '50% 35%'
  },
  {
    id: 'bolognese', name: 'Bolognese', de: 'Bologneser',
    weight: '2.5–4 kg', kg: [2.5, 4],
    tags: ['serene', 'no shedding', 'daily combing'],
    line: 'A calm little cloud. Clouds need combing.',
    facts: { shed: 0.9, brush: 'daily', groom: 'regular', exercise: 40,
      calm: 4.5, affection: 5, quiet: 3.5, train: 3.5, apartment: 5,
      travel: 4.5, alone: 2.5, health: 4 },
    flags: ['velcro'],
    cost: '€100–140', puppyDiff: 'Moderate — sweet-natured but slow to house-train.',
    rescueDE: 'Rare.',
    feels: 'The calmest of the little white companions — a serene, devoted shadow that mostly wants to be wherever you are. The catch is the cloud itself: that flocked coat mats without near-daily attention.',
    pros: [
      'Remarkably calm and quiet for a toy companion breed',
      'Technically sheds almost nothing',
      'Perfect apartment scale, travels easily',
      'Gentle, loving, unproblematic temperament'
    ],
    cons: [
      'The coat is a daily commitment plus regular grooming — exactly what you wanted to avoid',
      'Bred for constant companionship; hates being left',
      'Low exercise drive — keen walkers will outpace its ambitions',
      'Rare enough that breeders involve travel'
    ],
    why: 'Temperament close to ideal; the coat is the whole argument.',
    watch: 'Daily combing, forever — the fluff tax is real.',
    pos: '50% 40%'
  },
  {
    id: 'havanese', name: 'Havanese', de: 'Havaneser',
    weight: '4–7 kg', kg: [4, 7],
    tags: ['sunny', 'no shedding', 'lots of hair'],
    line: 'Sunshine on legs, under a serious amount of hair.',
    facts: { shed: 0.85, brush: 'daily', groom: 'regular', exercise: 50,
      calm: 4, affection: 5, quiet: 3, train: 4, apartment: 5,
      travel: 4.5, alone: 2.5, health: 4 },
    flags: ['velcro'],
    cost: '€110–150', puppyDiff: 'Temperament easy, coat adolescence famously not.',
    rescueDE: 'Occasional — popular breed with some shelter turnover.',
    feels: 'One of the happiest, friendliest small dogs there is — a little clown that adores everyone. It simply lives inside a silk curtain that tangles while you watch. Clipped short it’s more manageable, but the brush never fully retires.',
    pros: [
      'Wonderful cheerful temperament, great with visitors',
      'Little loose hair on the sofa (it stays in the coat — and mats)',
      'Trainable, adaptable, travel-sized',
      'Sturdy for a toy breed'
    ],
    cons: [
      'High-maintenance coat: near-daily brushing or standing groomer bills',
      'Struggles with being left alone — bred as a full-time companion',
      'Moderate alert barking is common',
      'Its dream life has more company than your travel plans allow'
    ],
    why: 'Delightful dog; the coat and clinginess fight the brief.',
    watch: 'You specifically said no fluff management — this is fluff management.',
    pos: '50% 38%'
  },
  {
    id: 'cavalier', name: 'Cavalier King Charles Spaniel', de: 'Cavalier King Charles Spaniel',
    weight: '5.5–8.5 kg', kg: [5.5, 8.5],
    tags: ['gentle', 'affectionate', 'health caveats'],
    line: 'The sweetest deal in dogdom — read the health fine print.',
    facts: { shed: 0.45, brush: 'often', groom: 'occasional', exercise: 55,
      calm: 4.5, affection: 5, quiet: 4, train: 4, apartment: 5,
      travel: 4.5, alone: 3, health: 1.5 },
    flags: ['heritable', 'velcro'],
    cost: '€105–150 + vet risk', puppyDiff: 'Easy — almost suspiciously agreeable.',
    rescueDE: 'Occasional via breed rescue; insist on cardiology history.',
    feels: 'Temperamentally, close to your perfect dog: gentle, quiet, endlessly affectionate, happy with exactly your amount of exercise. The heartbreak is written into the breed: most develop heart disease, many face neurological problems. This score is low on purpose.',
    pros: [
      'Possibly the best companion temperament in dogdom',
      'Quiet, adaptable and café-calm',
      'Perfect size and exercise fit for your life',
      'Easy to train, easy to love'
    ],
    cons: [
      'Mitral valve disease affects the majority by middle age',
      'Syringomyelia (a painful skull/spine condition) is widespread',
      'Expect significant vet bills and possibly early goodbyes',
      'Silky coat sheds real hair and needs regular brushing'
    ],
    why: 'The temperament fits almost perfectly — the health outlook does not.',
    watch: 'Breed-wide heart and neurological disease; score reduced accordingly.',
    pos: '50% 35%'
  },
  {
    id: 'boston', name: 'Boston Terrier', de: 'Boston Terrier',
    weight: '5–11 kg', kg: [5, 11],
    tags: ['charming', 'short coat', 'flat face'],
    line: 'Tuxedo charm; the nose paid for it.',
    facts: { shed: 0.7, brush: 'rare', groom: 'none', exercise: 60,
      calm: 4, affection: 4.5, quiet: 4, train: 3.5, apartment: 5,
      travel: 3, alone: 3, health: 2 },
    flags: ['brachy'],
    cost: '€95–140 + vet risk', puppyDiff: 'Moderate — cheerful, occasionally stubborn.',
    rescueDE: 'Occasional.',
    feels: 'A funny, people-loving gentleman in a dinner jacket — lifestyle-wise a genuinely great apartment dog. But the shortened face is a structural compromise: snoring is the soundtrack, summer heat is a hazard, and airlines increasingly say no.',
    pros: [
      'Cheerful, friendly, quiet — lovely urban temperament',
      'Short wipe-down coat, no groomer',
      'Compact and apartment-adapted',
      'Less extreme than some flat-faced breeds'
    ],
    cons: [
      'Brachycephalic airways: breathing, heat and anaesthesia risks',
      'Summer walks and warm trains need active management',
      'Many airlines ban snub-nosed breeds — complicates bigger travel',
      'Eye injuries and patella issues are common'
    ],
    why: 'Lifestyle fit is real; the flat face is a health tax we chose to count.',
    watch: 'Breathing and heat — the score reflects the conformation penalty.',
    pos: '50% 32%'
  },
  {
    id: 'dachshund', name: 'Dachshund (smooth)', de: 'Kurzhaardackel',
    weight: '4–9 kg', kg: [4, 9],
    tags: ['iconic', 'big personality', 'back risk'],
    line: 'Twice the dog in half the height, with a spine to protect.',
    facts: { shed: 0.7, brush: 'rare', groom: 'none', exercise: 60,
      calm: 3.5, affection: 4, quiet: 2, train: 2.5, apartment: 3,
      travel: 4, alone: 3, health: 2 },
    flags: ['back', 'watchdog'],
    cost: '€90–130 + vet risk', puppyDiff: 'Moderate — charmingly stubborn, slow to house-train.',
    rescueDE: 'Common — Dackel and Dackel mixes are everywhere.',
    feels: 'Germany’s icon: brave, hilarious, devoted, convinced of its own authority. But that long back is an engineering liability — roughly one in five faces disc disease, and walk-up stairs are exactly what the vet warns about.',
    pros: [
      'Wash-and-go smooth coat',
      'Huge personality in a portable package',
      'Widely available, including many adult rescues',
      'Fits café culture perfectly'
    ],
    cons: [
      'IVDD (disc disease) risk ~20–25% — stairs are the enemy in any walk-up',
      'Carrying it up and down daily gets old fast',
      'A proper hunting bark that hallway acoustics amplify',
      'Stubbornness is the brand'
    ],
    why: 'Iconic and lovable, but built against your floor plan.',
    watch: 'The spine: stairs, jumps and weight all need policing forever.',
    pos: '50% 40%'
  },
  {
    id: 'border', name: 'Border Terrier', de: 'Border Terrier',
    weight: '5–7 kg', kg: [5, 7],
    tags: ['good-natured', 'hardy', 'scruffy'],
    line: 'Scruffy, sane, and up for whatever you’re doing.',
    facts: { shed: 0.8, brush: 'weekly', groom: 'occasional', exercise: 80,
      calm: 4, affection: 4.5, quiet: 3.5, train: 4, apartment: 4.5,
      travel: 4.5, alone: 4, health: 4.5 },
    flags: ['offleash'],
    cost: '€95–130', puppyDiff: 'Moderate — genuinely good-natured from the start.',
    rescueDE: 'Rare-ish; occasional UK imports and club rehomes.',
    feels: 'The terrier for people who don’t want terrier drama. An honest, scruffy, affectionate little dog that hikes all day, then sleeps under the desk. Famously sound in body and temperament.',
    pros: [
      'One of the healthiest, most level-headed terriers',
      'Wiry coat sheds little; a few hand-strips a year instead of constant grooming',
      'Copes well alone once settled — good for shift days',
      'Quiet for a terrier, friendly with everyone'
    ],
    cons: [
      'Real exercise appetite — your walks would need to be honest ones',
      'Prey drive: squirrels are a religion',
      'Hand-stripping is a niche skill (or a specialist groomer find)',
      'The scruffy look is a taste you either love or don’t'
    ],
    why: 'Hardy, kind, low-drama — an underrated all-rounder.',
    watch: 'Energy and squirrels — plus finding a stripping-savvy groomer.',
    pos: '50% 32%'
  },
  {
    id: 'cirneco', name: 'Cirneco dell’Etna', de: 'Cirneco dell’Etna',
    weight: '8–13 kg', kg: [8, 13],
    tags: ['sleek', 'ancient', 'sun worshipper'],
    line: 'An ancient Sicilian sunbeam-seeking missile.',
    facts: { shed: 0.9, brush: 'rare', groom: 'none', exercise: 80,
      calm: 4, affection: 4, quiet: 3.5, train: 3, apartment: 4.5,
      travel: 4, alone: 3, health: 4.5 },
    flags: ['offleash'],
    cost: '€95–130', puppyDiff: 'Moderate-hard — rare breed waitlists, adolescent selective hearing.',
    rescueDE: 'Rare — occasionally via Italian rescue organisations.',
    feels: 'Three thousand years of Sicilian sun-chasing in an 10 kg amber body. Gentler and more people-oriented than most primitive breeds, quiet at home, always solar-charging on the warmest surface. A sunny balcony becomes its shrine.',
    pros: [
      'Practically zero coat care, very little hair',
      'Rustic, unexaggerated health',
      'Calm and quiet indoors; sweet with its family',
      'Whippet-adjacent size and lifestyle fit'
    ],
    cons: [
      'Hunting instinct: recall is a long-term aspiration',
      'Rare — sourcing means waitlists and travel to Italy',
      'Needs warmth: winter walks in coats, heated naps',
      'More independent-minded than the poodles of this world'
    ],
    why: 'Whippet-like living qualities from an ancient, healthy island breed.',
    watch: 'Prey drive and rarity — plan for leashes and waitlists.',
    pos: '50% 35%'
  },
  {
    id: 'rescue', name: 'Adult Rescue Mix', de: 'Tierheim-Mix (kurzhaarig)',
    weight: '7–15 kg — you choose', kg: [7, 15],
    tags: ['known temperament', 'short coat', 'already exists'],
    line: 'The right dog may already exist. It’s waiting in a Tierheim.',
    facts: { shed: 0.8, brush: 'rare', groom: 'none', exercise: 70,
      calm: 4.5, affection: 4.5, quiet: 4, train: 4, apartment: 4.5,
      travel: 4, alone: 4, health: 4 },
    flags: [],
    cost: '€85–125', puppyDiff: 'None — that’s the whole point. Skip to the finished adult.',
    rescueDE: 'Excellent — Tierheime and foster-based rescues have candidates year-round.',
    feels: 'Not a breed — a strategy. A 2–6-year-old short-haired mix whose foster family can already tell you: calm indoors, fine alone for an afternoon, quiet, house-trained. No breed average can compete with observed reality.',
    pros: [
      'You select for the exact traits you care about — proven, not predicted',
      'Adults show their real temperament; no adolescent lottery',
      'Skips house-training, puppy destruction and 5 a.m. phases',
      'Mixed ancestry tends toward fewer extreme-conformation problems'
    ],
    cons: [
      'The perfect candidate takes patience — you wait for the right dog, not a litter date',
      'History can carry surprises; a foster-based org with honest assessment matters',
      'Less predictable adult appearance if that matters to you',
      'Popular profiles (small, calm, house-trained) get adopted fast — be ready to move'
    ],
    why: 'A known adult beats a predicted puppy on almost every axis you care about.',
    watch: 'Quality of assessment is everything — choose orgs that foster, not just kennel.',
    pos: '50% 30%'
  },

  /* ---- Full-deck additions: the famous ones, scored honestly ---- */
  {
    id: 'frenchie', name: 'French Bulldog', de: 'Französische Bulldogge',
    weight: '8–14 kg', kg: [8, 14],
    tags: ['hilarious', 'city icon', 'health fine print'],
    line: 'The city’s favourite clown, paying for its face in instalments.',
    facts: { shed: 0.65, brush: 'rare', groom: 'none', exercise: 45,
      calm: 4.5, affection: 5, quiet: 4.5, train: 3, apartment: 5,
      travel: 2.5, alone: 3, health: 1.5 },
    flags: ['brachy', 'back'],
    cost: '€95–150 + vet risk', puppyDiff: 'Moderate — charming, stubborn, snorty.',
    rescueDE: 'Common — Frenchie rescues are, tellingly, very busy.',
    feels: 'Funny, affectionate, quiet, couch-scaled — on lifestyle alone it would top this list. But the flattened face and compact spine are structural debts: breathing surgery, heat emergencies and disc problems are routine vet visits, and airlines increasingly refuse the breed outright.',
    pros: [
      'Comedy and cuddles in a compact, quiet package',
      'Genuinely low exercise needs — city walks suffice',
      'Short easy coat, no groomer',
      'Adores people, tolerates chaos'
    ],
    cons: [
      'Brachycephalic airways: snoring is the soundtrack, summer is a hazard',
      'Spine and disc problems add a second health front',
      'Among the highest lifetime vet costs of any breed',
      'Most airlines ban snub-nosed dogs — big trips get complicated'
    ],
    why: 'Lifestyle fit is superb; the conformation costs are why the score isn’t.',
    watch: 'Breathing, spine, heat — we count the health tax openly.',
    pos: '50% 40%'
  },
  {
    id: 'pug', name: 'Pug', de: 'Mops',
    weight: '6–9 kg', kg: [6, 9],
    tags: ['devoted', 'low effort', 'flat face'],
    line: 'Maximum devotion per kilogram. Minimum airway per face.',
    facts: { shed: 0.35, brush: 'rare', groom: 'none', exercise: 40,
      calm: 4.5, affection: 5, quiet: 4, train: 3, apartment: 5,
      travel: 2.5, alone: 3, health: 1.5 },
    flags: ['brachy'],
    cost: '€85–140 + vet risk', puppyDiff: 'Easy-going — house-training is the slow part.',
    rescueDE: 'Regular — Mops rescue is an established scene.',
    feels: 'A small comedian that wants nothing more than to be wherever you are, ideally touching you. Sweet, quiet, undemanding — and shedding far more than the short coat suggests, while breathing through a nose that breeders left mostly ornamental.',
    pros: [
      'One of the most affectionate, people-centred temperaments there is',
      'Tiny exercise needs; happy with strolls and naps',
      'Quiet and easy in an apartment',
      'No grooming appointments, ever'
    ],
    cons: [
      'Constant, surprising amounts of shed hair',
      'Flat-face breathing and eye problems; heat is genuinely dangerous',
      'Obesity finds pugs with unerring accuracy',
      'Warm-weather travel needs constant management'
    ],
    why: 'Temperament and effort fit beautifully — the face is the problem.',
    watch: 'Airways and summer heat; the health penalty is deliberate.',
    pos: '50% 35%'
  },
  {
    id: 'beagle', name: 'Beagle', de: 'Beagle',
    weight: '9–16 kg', kg: [9, 16],
    tags: ['merry', 'nose first', 'loud'],
    line: 'A nose with a dog attached. The volume knob is missing.',
    facts: { shed: 0.5, brush: 'rare', groom: 'none', exercise: 90,
      calm: 3, affection: 4.5, quiet: 1.5, train: 2.5, apartment: 3.5,
      travel: 3.5, alone: 2.5, health: 4 },
    flags: ['offleash'],
    cost: '€90–130', puppyDiff: 'Hard-ish — the nose overrides the ears from day one.',
    rescueDE: 'Common — beagles and beagle mixes fill shelters everywhere.',
    feels: 'Merry, sturdy, wonderful with people — and fundamentally a self-employed scent hound. When the nose switches on, the ears switch off, and the famous baying voice was bred to carry across valleys. Your stairwell will learn this.',
    pros: [
      'Cheerful, robust and great with visitors and kids',
      'Easy wash-and-go coat',
      'Sturdy, healthy build',
      'Endearing beyond reason'
    ],
    cons: [
      'The bay/howl is loud, frequent and non-negotiable in flats',
      'Left alone, many sing to the whole building',
      'Recall competes with a nose that always wins',
      'Food obsession requires bin security clearance'
    ],
    why: 'A lovely dog whose voice and independence fight apartment life.',
    watch: 'The howling — charming in a farmhouse, litigation in a stairwell.',
    pos: '50% 35%'
  },
  {
    id: 'golden', name: 'Golden Retriever', de: 'Golden Retriever',
    weight: '25–34 kg', kg: [25, 34],
    tags: ['everyone’s dream', 'big', 'hair everywhere'],
    line: 'The dream dog — for a house with a garden and a hair-proof wardrobe.',
    facts: { shed: 0.25, brush: 'often', groom: 'occasional', exercise: 100,
      calm: 3.5, affection: 5, quiet: 3.5, train: 4.5, apartment: 3,
      travel: 2, alone: 3, health: 3 },
    flags: ['big'],
    cost: '€130–190', puppyDiff: 'Sweet but industrial — two years of large, mouthy enthusiasm.',
    rescueDE: 'Occasional — goldens rarely stay in shelters long.',
    feels: 'The most agreeable temperament in dogdom, wrapped in twenty-eight kilos and a coat that redecorates your flat weekly. Everything about a golden is wonderful and everything about it is large: the dog, the hair, the exercise needs, the space it warms.',
    pros: [
      'Famously gentle, patient and trainable',
      'Great with every guest, child and postal worker',
      'A genuine adventure companion',
      'Emotionally readable — an easy first dog, temperament-wise'
    ],
    cons: [
      'Sheds impressively, all year, on everything you own',
      'Big dog logistics: stairs, trains, hotels, car boots',
      'Needs real daily exercise and space',
      'Elevated cancer rates are a sad breed reality'
    ],
    why: 'Perfect temperament, impractical package for apartment life.',
    watch: 'The hair and the kilos — both arrive in quantity.',
    pos: '50% 30%'
  },
  {
    id: 'labrador', name: 'Labrador Retriever', de: 'Labrador Retriever',
    weight: '25–36 kg', kg: [25, 36],
    tags: ['good-natured', 'big appetite', 'big everything'],
    line: 'A joyful appetite in dog form. Rated for gardens, not walk-ups.',
    facts: { shed: 0.3, brush: 'weekly', groom: 'none', exercise: 105,
      calm: 3, affection: 5, quiet: 3.5, train: 4.5, apartment: 3,
      travel: 2, alone: 3, health: 3.5 },
    flags: ['big'],
    cost: '€130–190', puppyDiff: 'A cheerful wrecking ball for the first two years.',
    rescueDE: 'Regular — labs and lab mixes are shelter staples.',
    feels: 'Endlessly good-natured, endlessly hungry, endlessly shedding. The lab is the world’s default family dog for good reason — but the design assumes a garden door, a car boot and someone home who enjoys throwing things.',
    pros: [
      'Bombproof, friendly, forgiving temperament',
      'Highly trainable and eager',
      'Robust all-weather adventure partner',
      'Gets along with everyone and everything'
    ],
    cons: [
      'Serious shedding and serious kilos in a small flat',
      'Youthful energy is a part-time job for two years',
      'Travel beyond the car is heavy logistics',
      'Joints and waistlines need lifelong management'
    ],
    why: 'Wonderful dog, wrong scale for the apartment-and-trains life.',
    watch: 'Size, shedding and a two-year adolescence.',
    pos: '50% 35%'
  },
  {
    id: 'corgi', name: 'Pembroke Welsh Corgi', de: 'Welsh Corgi Pembroke',
    weight: '10–14 kg', kg: [10, 14],
    tags: ['internet royalty', 'herding brain', 'sheds buckets'],
    line: 'A big dog compressed into loaf form. The hair was not compressed.',
    facts: { shed: 0.25, brush: 'often', groom: 'none', exercise: 80,
      calm: 3.5, affection: 4.5, quiet: 2, train: 4, apartment: 4,
      travel: 3.5, alone: 3, health: 3 },
    flags: ['back', 'watchdog'],
    cost: '€100–145', puppyDiff: 'Bright and bossy — herding software installs early.',
    rescueDE: 'Rare — corgis are in demand.',
    feels: 'A proper working dog on 25 % of the usual legs: clever, funny, opinionated, with a herder’s eye for order and a bark sized for open fields. The double coat sheds in quantities that defy the dog’s volume.',
    pros: [
      'Big-dog brain and charisma at a liftable size',
      'Very trainable, loves having jobs',
      'Sturdy and adventurous',
      'Objectively hilarious from behind'
    ],
    cons: [
      'Sheds absurdly — daily tumbleweeds in season',
      'A big, frequent bark with herding-alarm enthusiasm',
      'Long low back: stairs and sofa-jumps need policing',
      'Herding instincts may organise your ankles'
    ],
    why: 'Huge personality, but hair, bark and back all push against a quiet flat.',
    watch: 'The shedding is not a rumour. Neither is the bark.',
    pos: '50% 35%'
  },
  {
    id: 'shiba', name: 'Shiba Inu', de: 'Shiba Inu',
    weight: '8–11 kg', kg: [8, 11],
    tags: ['cat software', 'immaculate', 'seasonal blizzard'],
    line: 'Aesthetically perfect. Emotionally freelance.',
    facts: { shed: 0.3, brush: 'weekly', groom: 'none', exercise: 75,
      calm: 4, affection: 3, quiet: 4, train: 2, apartment: 4.5,
      travel: 3.5, alone: 4, health: 4.5 },
    flags: ['offleash'],
    cost: '€100–140', puppyDiff: 'Hard — a dignified adolescent that negotiates everything.',
    rescueDE: 'Occasional — usually via breed-specific rehoming.',
    feels: 'The world’s most photogenic dog lives by its own constitution: clean, quiet, independent, affectionate strictly on schedule. Twice a year the plush coat detonates into drifts of undercoat. Off-leash is a rumour other breeds tell.',
    pros: [
      'Immaculate, odourless, quiet — very apartment-compatible habits',
      'Handles alone-time better than most (it prefers some)',
      'Healthy, hardy, long-lived',
      'Compact and undeniably beautiful'
    ],
    cons: [
      'Seasonal shedding measured in supermarket bags',
      'Training is a diplomatic negotiation you often lose',
      'Recall may never be trustworthy',
      'Affection is rationed — cuddle seekers may feel underfed'
    ],
    why: 'Clean, quiet and independent — if you accept cat rules.',
    watch: 'The coat blow and the freelance attitude.',
    pos: '50% 35%'
  },
  {
    id: 'jrt', name: 'Jack Russell Terrier', de: 'Jack Russell Terrier',
    weight: '5–8 kg', kg: [5, 8],
    tags: ['turbo mode', 'fearless', 'busy busy'],
    line: 'A 6 kg dog with a 60 kg agenda.',
    facts: { shed: 0.5, brush: 'rare', groom: 'occasional', exercise: 120,
      calm: 2, affection: 4, quiet: 2, train: 3.5, apartment: 3,
      travel: 4, alone: 2.5, health: 4.5 },
    flags: ['offleash'],
    cost: '€85–125', puppyDiff: 'Hard — imagine espresso learning to open doors.',
    rescueDE: 'Common — energy mismatches fill shelters with JRTs.',
    feels: 'Brilliant, fearless, tireless — a working terrier that considers your flat a briefing room between missions. With serious daily outlets it’s a superb little athlete; without them it invents projects you will not approve of.',
    pros: [
      'Robust, healthy, up for absolutely anything',
      'Smart and quick to learn when engaged',
      'Compact and portable between adventures',
      'Devoted to its people'
    ],
    cons: [
      'Needs roughly two hours of genuine activity daily',
      'Vocal, quick to alert, quicker to chase',
      'A bored JRT is a demolition contractor',
      'Prey drive runs the walk unless you do'
    ],
    why: 'A magnificent engine that idles badly in apartments.',
    watch: 'The energy bill — this breed is a lifestyle, not a pet.',
    pos: '50% 32%'
  },
  {
    id: 'yorkie', name: 'Yorkshire Terrier', de: 'Yorkshire Terrier',
    weight: '2–3.5 kg', kg: [2, 3.5],
    tags: ['pocket-size', 'silky coat', 'alarm system'],
    line: 'Two kilograms of terrier conviction under a silk curtain.',
    facts: { shed: 0.9, brush: 'often', groom: 'regular', exercise: 45,
      calm: 3.5, affection: 4.5, quiet: 2, train: 3.5, apartment: 5,
      travel: 5, alone: 3, health: 3.5 },
    flags: ['fragile', 'watchdog'],
    cost: '€95–140', puppyDiff: 'Fiddly — tiny bladder, big opinions, breakable.',
    rescueDE: 'Regular — small seniors especially.',
    feels: 'A genuine terrier that happens to fit in a coat pocket. Barely sheds, travels anywhere, loves its people fiercely — and announces corridor traffic with a voice three sizes too big. The silky coat is jewellery: beautiful, and maintained like it.',
    pros: [
      'Ultra-portable and welcome everywhere',
      'Very little loose hair',
      'Devoted, spirited companion',
      'Long-lived for its size'
    ],
    cons: [
      'Alarm barking is a breed hobby',
      'Coat needs real upkeep or standing groomer dates',
      'Fragile around feet, stairs and enthusiasm',
      'Teeth and trachea need lifelong attention'
    ],
    why: 'Travel-perfect size, but the voice and coat need managing.',
    watch: 'Barking and grooming — small dog, standing appointments.',
    pos: '50% 35%'
  },
  {
    id: 'westie', name: 'West Highland White Terrier', de: 'West Highland White Terrier',
    weight: '6–9 kg', kg: [6, 9],
    tags: ['cheerful', 'sturdy', 'confident'],
    line: 'A small white opinion with excellent posture.',
    facts: { shed: 0.8, brush: 'often', groom: 'regular', exercise: 70,
      calm: 3.5, affection: 4, quiet: 2.5, train: 3.5, apartment: 4.5,
      travel: 4, alone: 3.5, health: 3.5 },
    flags: ['watchdog'],
    cost: '€105–150', puppyDiff: 'Standard terrier — confident early, consistent handling pays.',
    rescueDE: 'Occasional.',
    feels: 'A cheerful, sturdy little extrovert with proper terrier self-esteem. Less manic than the working terriers, more independent than the companion breeds, with a white coat that needs regular professional attention to stay white and un-matted.',
    pros: [
      'Robust, portable, weatherproof',
      'Low shedding for the volume of dog',
      'Friendly and self-assured, travels well',
      'Copes reasonably with alone-time'
    ],
    cons: [
      'Grooming every 6–8 weeks, plus brushing',
      'Alert barking comes standard',
      'Skin issues are a known breed weakness',
      'Terrier chase instincts on walks'
    ],
    why: 'A solid all-rounder with grooming and volume costs.',
    watch: 'The groomer’s calendar and the hallway commentary.',
    pos: '50% 35%'
  },
  {
    id: 'cocker', name: 'English Cocker Spaniel', de: 'English Cocker Spaniel',
    weight: '12–15 kg', kg: [12, 15],
    tags: ['soft-hearted', 'merry', 'ear management'],
    line: 'Professionally happy. The ears require staff.',
    facts: { shed: 0.45, brush: 'often', groom: 'regular', exercise: 85,
      calm: 3.5, affection: 5, quiet: 3, train: 4, apartment: 4,
      travel: 3.5, alone: 2.5, health: 3.5 },
    flags: ['velcro'],
    cost: '€115–160', puppyDiff: 'Sweet, food-driven, eager — among the easier starts.',
    rescueDE: 'Regular — cockers and mixes appear steadily.',
    feels: 'The merry spaniel: soft-eyed, soft-hearted, wagging from the shoulders back. Wants to be with you always, ideally outdoors, ideally slightly muddy. The silky coat and famous ears are a standing grooming commitment.',
    pros: [
      'Deeply affectionate, gentle family temperament',
      'Genuinely trainable and eager to please',
      'A proper walking companion with an off switch indoors',
      'Right-sized for real adventures'
    ],
    cons: [
      'Sheds and needs trims — coat care is ongoing',
      'Those ears need cleaning, drying, checking, forever',
      'Hates being left; separation needs slow training',
      'Bred to work — rainy-day sloth is not in the manual'
    ],
    why: 'Loving and biddable, with coat, ears and clinginess as the price.',
    watch: 'Alone-time and ear care — both are daily line items.',
    pos: '50% 30%'
  },
  {
    id: 'bordercollie', name: 'Border Collie', de: 'Border Collie',
    weight: '14–20 kg', kg: [14, 20],
    tags: ['genius', 'workaholic', 'needs a job'],
    line: 'The smartest dog alive, and it will use that against your furniture.',
    facts: { shed: 0.35, brush: 'weekly', groom: 'none', exercise: 150,
      calm: 2, affection: 4.5, quiet: 3, train: 5, apartment: 2,
      travel: 3, alone: 2, health: 4 },
    flags: [],
    cost: '€110–160', puppyDiff: 'A gifted child who never sleeps — plan a curriculum.',
    rescueDE: 'Regular — under-employed collies are a rescue staple.',
    feels: 'The most trainable animal you can legally keep in a flat, and the least suited to staying in one. A border collie without work becomes its own employer: herding lights, shadows, cyclists and you. Magnificent — for farms, sport homes and people whose hobby is the dog.',
    pros: [
      'Learning speed that feels like cheating',
      'A phenomenal sport and adventure partner',
      'Deeply bonded to its person',
      'Moderate coat care for the hair produced'
    ],
    cons: [
      'Needs hours of physical and mental work daily',
      'Apartment underemployment breeds obsession and anxiety',
      'Herding instincts fire at traffic, joggers, children',
      'Alone-time plus boredom equals renovation'
    ],
    why: 'A genius employee for a job you aren’t offering.',
    watch: 'This is a working animal — the flat isn’t the problem, the calendar is.',
    pos: '50% 32%'
  },
  {
    id: 'husky', name: 'Siberian Husky', de: 'Siberian Husky',
    weight: '16–27 kg', kg: [16, 27],
    tags: ['stunning', 'sled engine', 'opera singer'],
    line: 'Built to run 100 km at −30 °C. Your hallway disagrees.',
    facts: { shed: 0.15, brush: 'often', groom: 'none', exercise: 140,
      calm: 2, affection: 4, quiet: 1.5, train: 2, apartment: 2,
      travel: 2.5, alone: 2, health: 4 },
    flags: ['offleash', 'big'],
    cost: '€130–180', puppyDiff: 'A charming escape artist with marathon energy.',
    rescueDE: 'Common — huskies are chronically under-run and surrendered.',
    feels: 'A gorgeous long-distance engine with a social heart, an operatic voice and no interest whatsoever in your commands. Everything about the husky is honest: it will run, howl, shed and dig exactly as advertised. The advert just wasn’t written for apartments.',
    pros: [
      'Friendly and people-loving, rarely a guard dog',
      'Athletic partner for serious runners and bikejoring',
      'Hardy and healthy',
      'Objectively spectacular to look at'
    ],
    cons: [
      'The heaviest shedding on this list, by a comfortable margin',
      'Howling carries through buildings like architecture doesn’t exist',
      'Needs enormous exercise; recall is a myth',
      'Warm summers are genuinely uncomfortable for it'
    ],
    why: 'Everything a city flat isn’t looking for, done magnificently.',
    watch: 'Hair, howling and mileage — all industrial-scale.',
    pos: '50% 32%'
  },
  {
    id: 'maltese', name: 'Maltese', de: 'Malteser',
    weight: '3–4.5 kg', kg: [3, 4.5],
    tags: ['gentle', 'no shedding', 'silk to maintain'],
    line: 'An ancient lapdog in a floor-length gown. Someone irons the gown.',
    facts: { shed: 0.9, brush: 'daily', groom: 'regular', exercise: 40,
      calm: 4, affection: 5, quiet: 2.5, train: 3.5, apartment: 5,
      travel: 5, alone: 2.5, health: 3.5 },
    flags: ['velcro', 'fragile'],
    cost: '€100–145', puppyDiff: 'Gentle but slow to house-train, like most toys.',
    rescueDE: 'Regular — small white companions appear often.',
    feels: 'Two thousand years of lapdog refinement: gentle, devoted, perfectly scaled to apartment life. The white silk it wears is the entire job description — daily combing or a standing pet-clip appointment, plus tear-stain patrol.',
    pros: [
      'Barely any loose hair in the flat',
      'Softest of companion temperaments',
      'Featherweight travel and café companion',
      'Content with short walks and long cuddles'
    ],
    cons: [
      'The coat is daily work or standing groomer bills',
      'Bred for company — alone-time is its weak event',
      'Alert barking is common in the breed',
      'Fragile around stairs and clumsy moments'
    ],
    why: 'Ideal scale and softness; the coat and clinginess are the trade.',
    watch: 'Daily grooming or monthly bills — the silk isn’t self-cleaning.',
    pos: '50% 38%'
  },
  {
    id: 'shihtzu', name: 'Shih Tzu', de: 'Shih Tzu',
    weight: '4–8 kg', kg: [4, 8],
    tags: ['serene', 'companion pro', 'flat-ish face'],
    line: 'A thousand years of professional napping experience.',
    facts: { shed: 0.85, brush: 'daily', groom: 'regular', exercise: 40,
      calm: 4.5, affection: 5, quiet: 4, train: 3, apartment: 5,
      travel: 4, alone: 3.5, health: 2.5 },
    flags: ['brachy'],
    cost: '€100–145', puppyDiff: 'Amiable and unhurried — house-training included in “unhurried”.',
    rescueDE: 'Regular.',
    feels: 'Imperial court software: calm, friendly, quietly confident, requiring cushions and admiration. One of the easiest temperaments in the toy world — under a coat that grows toward the floor and a face flattened enough to count as a health decision.',
    pros: [
      'Serene, quiet, apartment-native temperament',
      'Genuinely good with guests, kids, chaos',
      'Minimal exercise demands',
      'Copes with alone-time better than most companions'
    ],
    cons: [
      'Daily brushing or a permanent short clip plus groomer',
      'Shortened face: snoring, eye injuries, heat sensitivity',
      'House-training famously leisurely',
      'Summer walks need timing and care'
    ],
    why: 'Wonderfully easy company; coat and face carry real costs.',
    watch: 'Grooming forever, and a face we penalise on principle.',
    pos: '50% 40%'
  },
  {
    id: 'aussie', name: 'Australian Shepherd', de: 'Australian Shepherd',
    weight: '16–29 kg', kg: [16, 29],
    tags: ['gorgeous', 'drive for days', 'needs work'],
    line: 'A ranch employee with influencer looks.',
    facts: { shed: 0.3, brush: 'often', groom: 'none', exercise: 130,
      calm: 2.5, affection: 4.5, quiet: 2.5, train: 5, apartment: 2.5,
      travel: 2.5, alone: 2.5, health: 4 },
    flags: [],
    cost: '€120–170', puppyDiff: 'Very smart, very busy — undertrained ones invent careers.',
    rescueDE: 'Regular — bought for looks, surrendered for energy.',
    feels: 'Stunning, brilliant, endlessly willing — a herding professional that treats exercise as a starting point and stimulation as a right. In a sport home it’s a dream; in a flat with two working humans it files complaints in writing, on your furniture.',
    pros: [
      'Elite trainability and work ethic',
      'A tireless partner for genuinely active lives',
      'Deeply loyal and engaged with its people',
      'That coat, those eyes — undeniable'
    ],
    cons: [
      'Herding-breed energy and vigilance around the clock',
      'Heavy seasonal shedding despite the tidy look',
      'Alarm barking and motion-chasing in traffic-rich streets',
      'Under-stimulation curdles into anxiety'
    ],
    why: 'Magnificent — and structurally mismatched to apartment routine.',
    watch: 'The workload — this breed audits your calendar.',
    pos: '50% 30%'
  },
  {
    id: 'papillon', name: 'Papillon', de: 'Papillon',
    weight: '2.5–5 kg', kg: [2.5, 5],
    tags: ['butterfly ears', 'tiny genius', 'no groomer'],
    line: 'The smartest 3 kg in dogdom, wearing butterfly ears.',
    facts: { shed: 0.7, brush: 'weekly', groom: 'none', exercise: 60,
      calm: 3.5, affection: 4.5, quiet: 2.5, train: 5, apartment: 5,
      travel: 5, alone: 3, health: 4 },
    flags: ['fragile'],
    cost: '€85–125', puppyDiff: 'Quick-witted and forgiving — a lovely first-dog project.',
    rescueDE: 'Occasional.',
    feels: 'A toy dog with a border collie’s report card: papillons routinely top obedience rankings while weighing less than a laptop. The silky coat needs no professional grooming at all — the surprise flaw is an enthusiastic little alert bark.',
    pros: [
      'Top-tier trainability — tricks, sports, anything',
      'No groomer needed, ever; modest shedding',
      'Featherweight travel perfection',
      'Healthy and long-lived for a toy breed'
    ],
    cons: [
      'Alert barking needs early, consistent training',
      'Small enough that stairs and feet are hazards',
      'Busier-brained than the calm companions',
      'Fine coat picks up burrs and weather'
    ],
    why: 'A quietly excellent fit hiding in the toy group.',
    watch: 'The voice — train it early or the hallway will.',
    pos: '50% 30%'
  },
  {
    id: 'pom', name: 'Pomeranian', de: 'Zwergspitz',
    weight: '2–3.5 kg', kg: [2, 3.5],
    tags: ['maximum floof', 'big voice', 'tiny frame'],
    line: 'Ninety percent optimism, ten percent dog, one hundred percent hair.',
    facts: { shed: 0.5, brush: 'often', groom: 'occasional', exercise: 40,
      calm: 3.5, affection: 4.5, quiet: 1.5, train: 3.5, apartment: 5,
      travel: 5, alone: 3, health: 3.5 },
    flags: ['fragile', 'watchdog'],
    cost: '€95–140', puppyDiff: 'Confident and quick — the voice arrives before the coat.',
    rescueDE: 'Regular — poms cycle through small-dog rescue steadily.',
    feels: 'A spitz compressed to teapot size with none of the attitude removed: bright, bold, theatrically fluffy and convinced the corridor requires narration. The double coat sheds real hair and the syrinx runs on caffeine.',
    pros: [
      'Ultimate portability with huge personality',
      'Smart and surprisingly trainable',
      'Thrives on modest exercise',
      'Long-lived little companion'
    ],
    cons: [
      'Among the yappiest breeds going — a genuine flat problem',
      'The floof sheds and mats; regular coat work required',
      'Tracheal and dental fragility at this size',
      'Napoleon complex needs gentle management'
    ],
    why: 'Adorable and portable; the voice and floof fight the brief.',
    watch: 'Barking, mostly — the fluff merely requires brushing.',
    pos: '50% 32%'
  }
];

/* The curated quick deck — the original apartment-focused shortlist. */
const QUICK_DECK = ['whippet','minipoodle','iggy','schnauzer','basenji','chihuahua','greyhound',
  'manchester','ett','gpinscher','dsf','ratterrier','toypoodle','mediumpoodle','bolognese',
  'havanese','cavalier','boston','dachshund','border','cirneco','rescue'];

/* ---- Scenario round (both players answer; deltas are averaged) ---- */
const SCENARIOS = [
  {
    id: 'rain',
    q: 'It’s raining all weekend. What sounds more realistic?',
    opts: [
      { key: 'A', icon: '☂️', label: 'Three shorter walks and lots of couch time' },
      { key: 'B', icon: '🥾', label: 'Long outdoor adventures regardless of weather' }
    ]
  },
  {
    id: 'velcro',
    q: 'Your dog follows you from room to room. All day.',
    opts: [
      { key: 'love', icon: '❤️', label: 'Cute' },
      { key: 'ok', icon: '😐', label: 'Fine' },
      { key: 'no', icon: '✕', label: 'Too clingy' }
    ]
  },
  {
    id: 'groomer',
    q: 'The dog needs a professional groom every 6–8 weeks.',
    opts: [
      { key: 'love', icon: '❤️', label: 'Fine' },
      { key: 'ok', icon: '😐', label: 'Maybe' },
      { key: 'no', icon: '✕', label: 'No' }
    ]
  },
  {
    id: 'offleash',
    q: 'The dog can rarely be safely off leash.',
    opts: [
      { key: 'love', icon: '❤️', label: 'Fine' },
      { key: 'ok', icon: '😐', label: 'Hmm' },
      { key: 'no', icon: '✕', label: 'Deal-breaker' }
    ]
  },
  {
    id: 'barky',
    q: 'The dog barks when people walk through the hallway.',
    opts: [
      { key: 'love', icon: '❤️', label: 'Fine' },
      { key: 'ok', icon: '😐', label: 'Somewhat annoying' },
      { key: 'no', icon: '✕', label: 'Absolutely not' }
    ]
  }
];

/* ---- Rescue profile builder ---- */
const RESCUE_TRAITS = [
  { id: 'age', label: '2–6 years old', on: true },
  { id: 'size', label: 'Roughly 7–15 kg', on: true },
  { id: 'shortcoat', label: 'Short coat', on: true },
  { id: 'lowshed', label: 'Low/moderate shedding', on: true },
  { id: 'housetrained', label: 'House-trained', on: true },
  { id: 'calm', label: 'Calm indoors', on: true },
  { id: 'friendly', label: 'Friendly with people', on: true },
  { id: 'alone', label: 'Can stay alone 3–4 h', on: true },
  { id: 'quiet', label: 'Low/moderate barking', on: true },
  { id: 'energy', label: 'Moderate exercise needs', on: true },
  { id: 'apartment', label: 'Used to apartment life', on: true },
  { id: 'travel', label: 'Travels well', on: true },
  { id: 'health', label: 'No major known health issues', on: true }
];

/* ---- Preference schema (defaults = Alex & Hillary's stated preferences) ---- */
const PREF_SCHEMA = [
  { id: 'coat', label: 'Coat & shedding', opts: [
    { v: 'minimal', label: 'Minimal hair please' },
    { v: 'some', label: 'Some is okay' },
    { v: 'any', label: 'Don’t care' }], def: 'minimal' },
  { id: 'grooming', label: 'Grooming', opts: [
    { v: 'low', label: 'Low maintenance' },
    { v: 'ok', label: 'Groomer is okay' },
    { v: 'any', label: 'Don’t care' }], def: 'low' },
  { id: 'exercise', label: 'Exercise', opts: [
    { v: 'chill', label: 'Chill' },
    { v: 'balanced', label: 'Balanced' },
    { v: 'active', label: 'Active' }], def: 'balanced' },
  { id: 'barking', label: 'Barking', opts: [
    { v: 'quiet', label: 'Prefer quiet' },
    { v: 'some', label: 'Some is okay' },
    { v: 'any', label: 'Don’t care' }], def: 'quiet' },
  { id: 'size', label: 'Size', opts: [
    { v: 'small', label: 'Small' },
    { v: 'smallmed', label: 'Small–medium' },
    { v: 'medium', label: 'Medium' },
    { v: 'flex', label: 'Flexible' }], def: 'smallmed' },
  { id: 'training', label: 'Trainability', opts: [
    { v: 'important', label: 'Important' },
    { v: 'nice', label: 'Nice to have' },
    { v: 'any', label: 'Don’t care' }], def: 'important' },
  { id: 'travel', label: 'Travel friendliness', opts: [
    { v: 'very', label: 'Very important' },
    { v: 'important', label: 'Important' },
    { v: 'not', label: 'Not important' }], def: 'very' },
  { id: 'alone', label: 'Alone time', opts: [
    { v: 'needs', label: 'Needs to handle a few hours' },
    { v: 'home', label: 'Usually somebody is home' },
    { v: 'flex', label: 'Flexible' }], def: 'needs' }
];

const FLAG_INFO = {
  brachy: { label: 'Flat-faced (brachycephalic) health risks', pts: -8 },
  heritable: { label: 'Serious breed-wide heritable disease', pts: -8 },
  back: { label: 'Spinal (IVDD) risk — stairs and jumps need managing', pts: -6 },
  fragile: { label: 'Physical fragility', pts: -4 },
  big: { label: 'Big-dog logistics in a walk-up flat', pts: -4 },
  offleash: { label: 'Off-leash freedom is limited', pts: 0 },
  velcro: { label: 'Dislikes being alone', pts: 0 },
  watchdog: { label: 'Watchdog/alert instincts', pts: 0 }
};

if (typeof module !== 'undefined') {
  module.exports = { BREEDS, SCENARIOS, RESCUE_TRAITS, PREF_SCHEMA, FLAG_INFO, QUICK_DECK };
}
