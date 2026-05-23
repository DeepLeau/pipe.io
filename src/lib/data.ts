export const metrics = [
  { label: 'Opportunities tracked', value: '14,820', sublabel: 'across all boards' },
  { label: 'Teams using Pipeline.io', value: '1,400+', sublabel: 'from startup to enterprise' },
  { label: 'Avg. deal velocity', value: '23 days', sublabel: 'from open to closed' },
  { label: 'Forecast accuracy', value: '94%', sublabel: 'reported by our customers' },
]

export const kanbanDeals = {
  prospecting: [
    { id: 1, name: 'Meridian Health', value: '$38K', owner: 'Marcus T.', touched: '3d ago', tag: undefined, tagType: undefined },
    { id: 2, name: 'Orion Fintech', value: '$52K', owner: 'Sarah K.', touched: '1d ago', tag: 'NEW', tagType: 'cyan' },
    { id: 3, name: 'Nova Robotics', value: '$67K', owner: 'Marcus T.', touched: '7d ago', tag: undefined, tagType: undefined },
    { id: 4, name: 'Crestwood Labs', value: '$25K', owner: 'Priya M.', touched: '2d ago', tag: undefined, tagType: undefined },
  ],
  qualification: [
    { id: 5, name: 'Volta Energy', value: '$74K', owner: 'Sarah K.', touched: '1d ago', nextStep: 'Technical demo · Thu 2pm', score: 78, tag: undefined, tagType: undefined },
    { id: 6, name: 'Halcyon Media', value: '$91K', owner: 'Priya M.', touched: '4d ago', nextStep: 'Send pricing proposal', score: 65, tag: undefined, tagType: undefined },
    { id: 7, name: 'Arctis Logistics', value: '$49K', owner: 'Marcus T.', touched: '2d ago', nextStep: 'Security review', score: 82, tag: undefined, tagType: undefined },
  ],
  negotiation: [
    { id: 8, name: 'Pinnacle SaaS', value: '$124K', owner: 'Sarah K.', touched: 'today', nextStep: 'Contract redline sent', closeDate: 'Close: Feb 14', tag: undefined, tagType: undefined },
    { id: 9, name: 'Ironclad Systems', value: '$88K', owner: 'Marcus T.', touched: '1d ago', nextStep: 'Waiting on legal', closeDate: 'Close: Feb 21', tag: undefined, tagType: undefined },
    { id: 10, name: 'Luminary Works', value: '$100K', owner: 'Priya M.', touched: '2d ago', closeDate: 'Close: Mar 1', tag: undefined, tagType: undefined },
  ],
  closed: [
    { id: 11, name: 'Beacon Analytics', value: '$64K', owner: 'Sarah K.', closeDate: 'Closed Jan 28', tag: undefined, tagType: undefined },
    { id: 12, name: 'Stratos AI', value: '$75K', owner: 'Marcus T.', tag: 'WON', tagType: 'moss', closeDate: 'Closed Jan 24', reason: undefined },
    { id: 13, name: 'Cascade Commerce', value: '—', tag: 'LOST', tagType: 'gray', reason: 'Budget freeze Q1' },
  ],
}

export const features = [
  {
    id: 'kanban',
    icon: 'columns',
    title: 'Visual pipeline board',
    description: 'Drag deals through stages. See the whole pipe on one screen — no scrolling, no exports.',
  },
  {
    id: 'forecast',
    icon: 'trending',
    title: 'One-click forecasting',
    description: 'Commit, best-case, pipeline — updated as you move cards. No manual spreadsheet math.',
  },
  {
    id: 'activity',
    icon: 'clock',
    title: 'Activity tracking',
    description: 'Log calls, emails, notes. See last touch and next step directly on the deal card.',
  },
  {
    id: 'stages',
    icon: 'list',
    title: 'Customizable stages',
    description: 'Rename, reorder, add stages. Your board fits your process, not the other way around.',
  },
  {
    id: 'integrations',
    icon: 'check',
    title: 'Gmail & Calendar sync',
    description: 'Auto-log email threads and meeting outcomes. Surface them on the deal without copy-paste.',
  },
  {
    id: 'import',
    icon: 'inbox',
    title: 'One-click import',
    description: 'CSV or paste from a spreadsheet. Your existing deals are live in Pipeline.io in minutes.',
  },
]

export const testimonials = [
  {
    quote: "We moved 200+ deals from a spreadsheet over a weekend. Three months later, our rep could see their whole quarter in one view and actually knew where deals stood.",
    author: 'James Whitfield',
    role: 'VP of Sales',
    company: 'Stratos AI',
    initials: 'JW',
  },
  {
    quote: "Pipeline.io is the first tool where the forecast number matches what actually closes. My managers stopped asking me to update the spreadsheet.",
    author: 'Camille Rousseau',
    role: 'Account Executive',
    company: 'Pinnacle SaaS',
    initials: 'CR',
  },
]

export const companies = [
  'Stratos AI',
  'Volta Energy',
  'Pinnacle',
  'Orion',
  'Meridian',
  'Halcyon',
]

export const comparisonRows = [
  { feature: 'Single source of truth', spreadsheet: 'Multiple versions, nobody knows which is current', pipeline: 'One board, always live' },
  { feature: 'Who touched a deal last', spreadsheet: 'Ask around, hope someone remembers', pipeline: 'Last touch auto-logged on card' },
  { feature: 'Deal slipping through', spreadsheet: 'Forecasting based on gut, wrong by Wednesday', pipeline: 'Stale deals flagged automatically' },
  { feature: 'Onboarding a new rep', spreadsheet: '3-hour walkthrough of color codes and row 347', pipeline: 'Board is self-explanatory, start selling same day' },
  { feature: 'Forecast accuracy', spreadsheet: '±40% is considered good', pipeline: '±6% average across our customers' },
  { feature: 'Admin overhead', spreadsheet: 'Ongoing — someone has to maintain it', pipeline: 'Zero — reps update their own deals' },
]

export const workflowSteps = [
  {
    step: 1,
    title: 'Create your board',
    description: 'Pick a name. Set your stages. Pipeline.io ships with defaults built for a standard B2B sales cycle.',
    code: 'app.pipeline.io/boards/new',
    stages: ['Prospecting', 'Qualification', 'Negotiation', 'Closed Won', 'Closed Lost'],
  },
  {
    step: 2,
    title: 'Import your deals',
    description: 'Drop in a CSV or paste columns from your existing spreadsheet. Deals land in the right stage.',
    code: 'Import: 147 deals · 0 errors',
  },
  {
    step: 3,
    title: 'Invite your team',
    description: 'Add reps, set roles, assign deals. Each person sees their own pipe and the team view.',
    code: '5 members · Owner: you',
    avatars: ['JW', 'CR', '+3'],
  },
]

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'month',
    description: 'For individual reps or freelancers managing their own pipe.',
    cta: 'Get started free',
    highlighted: false,
    features: [
      '1 user',
      'Unlimited deals',
      'Up to 5 stages',
      'CSV import',
      'Basic forecasting',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    price: 29,
    period: 'seat / month',
    description: 'For sales teams who need one live view of the pipeline.',
    cta: 'Start team trial',
    highlighted: true,
    badge: 'MOST POPULAR',
    features: [
      'Up to 15 seats',
      'Everything in Starter',
      'Gmail & Calendar sync',
      'Activity logging',
      'Full forecast mode',
      'Team dashboards',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 79,
    period: 'seat / month',
    description: 'For scaling orgs with complex processes and integrations.',
    cta: 'Talk to sales',
    highlighted: false,
    features: [
      'Unlimited seats',
      'Everything in Team',
      'Custom stages & fields',
      'Salesforce sync',
      'SSO & advanced permissions',
      'Dedicated CSM',
    ],
  },
]
