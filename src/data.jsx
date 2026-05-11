// Mock data for Lume — original brand, not a real company

const TODAY_MEALS = [
  {
    id: 'm1', time: '8:14 AM', name: 'Greek yogurt bowl',
    cal: 380, p: 28, c: 42, f: 11, fib: 6,
    micros: { 'Vit D': 18, 'Calcium': 32, 'Probiotics': 1, 'Iron': 6 },
    tag: 'High protein',
    swatch: 'linear-gradient(135deg, oklch(0.92 0.07 80), oklch(0.84 0.09 60))',
  },
  {
    id: 'm2', time: '10:42 AM', name: 'Cold-brew + collagen',
    cal: 60, p: 10, c: 2, f: 0, fib: 0,
    micros: { 'Caffeine': 1, 'Collagen': 1 },
    tag: 'Snack',
    swatch: 'linear-gradient(135deg, oklch(0.4 0.06 40), oklch(0.55 0.06 35))',
  },
  {
    id: 'm3', time: '1:08 PM', name: 'Salmon + quinoa + greens',
    cal: 612, p: 44, c: 48, f: 22, fib: 9,
    micros: { 'Omega-3': 88, 'Vit B12': 70, 'Selenium': 64, 'Iron': 22 },
    tag: 'Recovery meal',
    swatch: 'linear-gradient(135deg, oklch(0.84 0.1 25), oklch(0.78 0.08 50))',
  },
  {
    id: 'm4', time: '4:30 PM', name: 'Almonds + dark chocolate',
    cal: 240, p: 7, c: 18, f: 16, fib: 5,
    micros: { 'Magnesium': 24, 'Vit E': 38 },
    tag: 'Snack',
    swatch: 'linear-gradient(135deg, oklch(0.45 0.05 50), oklch(0.6 0.06 60))',
  },
];

const MACROS_TODAY = {
  cal: { v: 1782, goal: 2400 },
  protein: { v: 124, goal: 160, unit: 'g' },
  carbs:   { v: 168, goal: 240, unit: 'g' },
  fat:     { v: 62,  goal: 80,  unit: 'g' },
  fiber:   { v: 26,  goal: 35,  unit: 'g' },
  water:   { v: 62,  goal: 96,  unit: 'oz' },
};

// Vitality score — composite of nutrition + recovery + activity (0-100)
const VITALITY = {
  score: 84,
  delta: +6,
  nutrition: 88,
  recovery: 76,
  activity: 89,
};

// Recovery / wearable signals
const RECOVERY = {
  score: 76,                 // 0-100
  band: 'Solid',
  hrv: { v: 58, delta: +4, unit: 'ms', range: [30, 90] },
  rhr: { v: 54, delta: -2, unit: 'bpm', range: [40, 80] },
  sleep: { v: 7.4, delta: +0.5, unit: 'h', score: 82 },
  strain: { v: 12.4, delta: +1.2 },
};

// Micronutrient heatmap — % of daily target (real-feeling targets, but fictional values)
const NUTRIENTS = [
  // Vitamins
  { id: 'a',   group: 'vit', name: 'Vit A',  pct: 92, status: 'good', why: '' },
  { id: 'c',   group: 'vit', name: 'Vit C',  pct: 138, status: 'great', why: 'Berries this week' },
  { id: 'd',   group: 'vit', name: 'Vit D',  pct: 42,  status: 'low',  why: '4 days indoors' },
  { id: 'e',   group: 'vit', name: 'Vit E',  pct: 88,  status: 'good', why: '' },
  { id: 'k',   group: 'vit', name: 'Vit K',  pct: 110, status: 'great', why: '' },
  { id: 'b1',  group: 'vit', name: 'B1',     pct: 96,  status: 'good', why: '' },
  { id: 'b6',  group: 'vit', name: 'B6',     pct: 71,  status: 'fair', why: '' },
  { id: 'b9',  group: 'vit', name: 'Folate', pct: 64,  status: 'fair', why: '' },
  { id: 'b12', group: 'vit', name: 'B12',    pct: 122, status: 'great', why: 'Salmon today' },
  // Minerals
  { id: 'mg',  group: 'min', name: 'Magnesium', pct: 58,  status: 'low',  why: 'Trending low — 6 day avg' },
  { id: 'ca',  group: 'min', name: 'Calcium',   pct: 84,  status: 'good', why: '' },
  { id: 'fe',  group: 'min', name: 'Iron',      pct: 96,  status: 'good', why: '' },
  { id: 'zn',  group: 'min', name: 'Zinc',      pct: 102, status: 'great',why: '' },
  { id: 'k+',  group: 'min', name: 'Potassium', pct: 74,  status: 'fair', why: '' },
  { id: 'na',  group: 'min', name: 'Sodium',    pct: 118, status: 'good', why: '' },
  { id: 'se',  group: 'min', name: 'Selenium',  pct: 124, status: 'great',why: '' },
  { id: 'iod', group: 'min', name: 'Iodine',    pct: 68,  status: 'fair', why: '' },
  // Other
  { id: 'om3', group: 'fa',  name: 'Omega-3',  pct: 88,  status: 'good', why: '' },
  { id: 'om6', group: 'fa',  name: 'Omega-6',  pct: 154, status: 'over', why: 'High — aim lower' },
  { id: 'fib', group: 'oth', name: 'Fiber',    pct: 74,  status: 'fair', why: '' },
  { id: 'pq',  group: 'oth', name: 'Protein Q', pct: 91, status: 'good', why: 'PDCAAS 0.91' },
  { id: 'hyd', group: 'oth', name: 'Hydration', pct: 65, status: 'fair', why: '' },
  { id: 'elec',group: 'oth', name: 'Electrolytes', pct: 82, status: 'good', why: '' },
  { id: 'pol', group: 'oth', name: 'Polyphenols', pct: 110, status: 'great', why: '' },
];

// Insights
const INSIGHTS = [
  {
    id: 'i1', kind: 'correlate', tone: 'coral',
    title: 'Your afternoon fatigue tracks with magnesium',
    body: 'On days you log < 60% magnesium, you rate energy 1.8 pts lower by 3 PM.',
    confidence: 0.86,
  },
  {
    id: 'i2', kind: 'predict', tone: 'gold',
    title: 'Predicted dip: Vitamin D this week',
    body: 'At your current trajectory you\'ll hit 38% of target by Friday. 12 mins outside between 11–1 closes the gap.',
    confidence: 0.78,
  },
  {
    id: 'i3', kind: 'recovery', tone: 'peri',
    title: 'Sleep score lifted +14 after omega-3 days',
    body: 'Repeats in 8 of last 10 weeks. Consider an evening serving 3× / week.',
    confidence: 0.91,
  },
];

const SWAPS = [
  { from: 'White rice (1 cup)', to: 'Quinoa (1 cup)', why: '+6g protein, +5g fiber, +94mg Mg', tone: 'sage' },
  { from: 'Granola bar', to: 'Greek yogurt + berries', why: '+12g protein, −7g added sugar', tone: 'peri' },
  { from: 'Tilapia', to: 'Wild salmon', why: '+1.8g Omega-3 EPA/DHA', tone: 'coral' },
];

const SYMPTOMS = [
  { name: 'Energy', v: 7.2, delta: +0.4 },
  { name: 'Focus',  v: 8.1, delta: +0.6 },
  { name: 'Mood',   v: 7.6, delta: +0.2 },
  { name: 'Soreness', v: 3.4, delta: -0.8 },
  { name: 'Hunger', v: 5.0, delta: 0 },
];

const SUPPLEMENTS = [
  { id:'s1', name: 'Vitamin D3 + K2', dose: '4,000 IU + 100mcg', time: 'AM with fat', adherence: 0.86, tone: 'gold' },
  { id:'s2', name: 'Magnesium Glycinate', dose: '400 mg', time: 'PM', adherence: 0.62, tone: 'peri' },
  { id:'s3', name: 'Omega-3 (EPA/DHA)', dose: '2,000 mg', time: 'with meal', adherence: 0.78, tone: 'coral' },
  { id:'s4', name: 'Creatine Monohydrate', dose: '5 g', time: 'any', adherence: 0.94, tone: 'sage' },
];

const WEARABLES = [
  { id: 'w1', name: 'WHOOP 5.0',         status: 'connected', last: '2 min ago', signal: ['Recovery', 'Strain', 'Sleep'], tone: 'peri', icon: 'band' },
  { id: 'w2', name: 'Apple Watch Ultra', status: 'connected', last: '12 min ago', signal: ['HR', 'Workouts', 'SpO₂'], tone: 'coral', icon: 'watch' },
  { id: 'w3', name: 'Oura Ring 4',       status: 'available', last: null, signal: ['Sleep', 'Temp', 'HRV'], tone: 'gold', icon: 'ring' },
  { id: 'w4', name: 'Galaxy Watch 7',    status: 'available', last: null, signal: ['Body comp', 'Sleep'], tone: 'sage', icon: 'watch' },
  { id: 'w5', name: 'Fitbit Charge 6',   status: 'available', last: null, signal: ['Steps', 'Sleep'], tone: 'peri', icon: 'band' },
];

Object.assign(window, { TODAY_MEALS, MACROS_TODAY, VITALITY, RECOVERY, NUTRIENTS, INSIGHTS, SWAPS, SYMPTOMS, SUPPLEMENTS, WEARABLES });
