/* Dog Match — breed data
   Facts are stored on natural scales and scored against preferences in scoring.js.
   1–5 scales: higher is always "better for apartment life with Alex & Hillary"
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
      'Genuinely calm indoors: ideal next to Alex’s desk from 09:00 to 17:30',
      'Rarely barks — top-floor-neighbour friendly',
      'Healthy, unexaggerated build; light enough to carry upstairs in a pinch'
    ],
    cons: [
      'Chase instinct: off-leash freedom needs fenced areas or very good recall work',
      'At 11–18 kg it’s a half-price DB ticket and a big hotel bed guest, not hand luggage',
      'Thin coat means a wardrobe of dog jumpers for Franconian winters',
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
      'Smartest trainable size-appropriate option on this list; Alex would enjoy the training',
      'Small enough for free carrier-free travel on DB and easy café visits',
      'Adapts well to changing schedules — good with Hillary’s shifts'
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
    feels: 'The laziest athlete in the animal kingdom. Twenty minutes of zoom, twenty-three hours of horizontal elegance. Silent, gentle, undemanding — just physically enormous for an 87 m² flat two floors above the street.',
    pros: [
      'Calmest, quietest temperament on this list — barely knows how to bark',
      'Short coat, low grooming, surprisingly low exercise needs',
      'Adult rescues arrive with known personalities',
      'Gentle and unflappable with guests'
    ],
    cons: [
      'Carrying 30 kg up two floors when it’s injured or old is a two-person job',
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
      'Local heritage breed — the VDH clubs are nearby'
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
      'Low exercise drive — Alex’s walking ambitions exceed its own',
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
    feels: 'Germany’s icon: brave, hilarious, devoted, convinced of its own authority. But that long back is an engineering liability — roughly one in five faces disc disease, and your two flights of stairs are exactly what the vet warns about.',
    pros: [
      'Wash-and-go smooth coat',
      'Huge personality in a portable package',
      'Widely available, including many adult rescues',
      'Fits café culture perfectly'
    ],
    cons: [
      'IVDD (disc disease) risk ~20–25% — stairs are the enemy, and you have plenty',
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
    feels: 'Three thousand years of Sicilian sun-chasing in an 10 kg amber body. Gentler and more people-oriented than most primitive breeds, quiet at home, always solar-charging on the warmest surface. Your terrace would be its shrine.',
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
    rescueDE: 'Excellent — Tierheim Nürnberg and foster-based rescues have candidates year-round.',
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
  }
];

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
  back: { label: 'Spinal (IVDD) risk × top-floor stairs', pts: -6 },
  fragile: { label: 'Physical fragility', pts: -4 },
  big: { label: 'Size vs. walk-up logistics', pts: -4 },
  offleash: { label: 'Off-leash freedom is limited', pts: 0 },
  velcro: { label: 'Dislikes being alone', pts: 0 },
  watchdog: { label: 'Watchdog/alert instincts', pts: 0 }
};

if (typeof module !== 'undefined') {
  module.exports = { BREEDS, SCENARIOS, RESCUE_TRAITS, PREF_SCHEMA, FLAG_INFO };
}
