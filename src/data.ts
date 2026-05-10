import { BudgetMeasure, Source, UserProfile, UpdateLog, QuizQuestion, KeyHighlight } from './types';

export const FISCAL_CHART_DATA = [
  { year: '2024', netDebt: 470, surplus: 4 },
  { year: '2025', netDebt: 485, surplus: 12 },
  { year: '2026', netDebt: 492, surplus: 9.3 },
  { year: '2027', netDebt: 498, surplus: 6 },
  { year: '2028', netDebt: 502, surplus: 4.5 },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    text: "Which of these best describes your current housing situation?",
    options: [
      { id: 'o1', text: "I rent my home", profileId: 'renter' },
      { id: 'o2', text: "I have a mortgage", profileId: 'homeowner' },
      { id: 'o3', text: "I own my home outright", profileId: 'retiree' },
    ]
  },
  {
    id: 'q2',
    text: "What is your primary financial focus right now?",
    options: [
      { id: 'o1', text: "Reducing daily expenses", profileId: 'individual' },
      { id: 'o2', text: "Supporting my children", profileId: 'family' },
      { id: 'o3', text: "Growing my business", profileId: 'small-business' },
    ]
  }
];

export const UPDATE_LOGS: UpdateLog[] = [
  {
    id: 'l4',
    measureId: 'm3',
    updateType: 'legal-status-updated',
    previousValue: 'bill-introduced',
    newValue: 'passed-parliament',
    updateSummary: 'Superannuation (PPL) Act passed both houses with crossbench support.',
    relatedSourceId: 's1',
    updatedBy: 'System',
    updatedAt: '2026-05-08T10:00:00Z'
  }
];

export const USER_PROFILES: UserProfile[] = [
  { id: 'individual', label: 'Individual', description: 'Personal budget and cost of living.', audienceTag: 'individuals' },
  { id: 'family', label: 'Family', description: 'Support for families and children.', audienceTag: 'families' },
  { id: 'renter', label: 'Renter', description: 'Rental assistance and rights.', audienceTag: 'renters' },
  { id: 'homeowner', label: 'Home Owner', description: 'Mortgage and housing policies.', audienceTag: 'homeowners' },
  { id: 'investor', label: 'Investor', description: 'Shares, property and super.', audienceTag: 'investors' },
  { id: 'small-business', label: 'Small Business', description: 'Support for small enterprises.', audienceTag: 'small-business' },
  { id: 'professional', label: 'Professional', description: 'Advisers, accountants and lawyers.', audienceTag: 'professionals' },
  { id: 'retiree', label: 'Retiree', description: 'Pensions and aged care.', audienceTag: 'retirees' },
  { id: 'student', label: 'Student', description: 'HEY-HELP and youth allowance.', audienceTag: 'students' },
];

export const FISCAL_SUMMARY = {
  surplus: "$9.3 billion (Forecast)",
  netDebt: "$492 billion (Est.)",
  growth: "2.1% (Proj)",
  inflation: "2.75% (Proj)",
  updateDate: "10 May 2026",
  sourceId: 's1'
};

export const KEY_HIGHLIGHTS: KeyHighlight[] = [
  {
    title: "Structural Surplus Maintained",
    description: "The budget delivers a second consecutive surplus of $9.3bn, aimed at cooling inflation while funding critical service delivery.",
    sourceIds: ['s1', 's2']
  },
  {
    title: "Housing Supply Pivot",
    description: "A shift from demand-side grants to a $2bn supply-side accelerator fund marks a significant change in housing policy strategy.",
    sourceIds: ['s1', 's3']
  },
  {
    title: "Targeted Energy Relief",
    description: "$3.5bn extension of energy subsidies provides a temporary bridge for households while structural costs remain high.",
    sourceIds: ['s1', 's2']
  }
];

export const SECTOR_INSIGHTS: Record<string, any> = {
  'general': {
    title: 'Budget Strategy 2026',
    summary: 'The 2026 Federal Budget represents a "Consolidation and Capacity" approach. It attempts to absorb excess liquidity via surpluses while selectively injecting capital into high-multiplier sectors like social housing and energy infrastructure.',
    keyTakeaways: [
      'Disinflationary fiscal stance (0.5% GDP contractionary)',
      'Productivity focus via targeted infrastructure',
      'Structural equity improvements in retirement'
    ],
    professionalOutlook: 'Institutional consensus: A politically safe budget that balances CPI management with future-proofed investments, though lacks aggressive tax-base reform.',
    sourceIds: ['s1', 's2']
  },
  'housing': {
    title: 'Housing & Infrastructure Outlook',
    summary: 'The 2026 budget pivots towards supply-side interventions with a focus on institutional investment in build-to-rent and social housing accelerator funds.',
    keyTakeaways: [
      'Additional $2bn for social housing projects',
      'Tax incentives for build-to-rent developments expanded',
      'Infrastructure pipeline focused on housing-aligned transport'
    ],
    professionalOutlook: 'Wait-and-see for developers; significant opportunities in community housing partnerships.',
    sourceIds: ['s1', 's3']
  },
  'cost-of-living': {
    title: 'Cost of Living Context',
    summary: 'Temporary relief measures are being swapped for structural subsidies in energy and child care to avoid inflationary pressures.',
    keyTakeaways: [
      'Energy bill rebate extended into FY27',
      'Child care subsidy thresholds adjusted for inflation',
      'Direct indexation of welfare payments maintained'
    ],
    professionalOutlook: 'Targeted relief reduces immediate household pressure but ignores long-term structural tax reform.',
    sourceIds: ['s1', 's2', 's5']
  },
  'superannuation': {
    title: 'Wealth & Retirement Framework',
    summary: 'The 2026 budget reinforces the "Superannuation Purpose" objective with a strong focus on closing the gender retirement gap and managing structural tax expenditures.',
    keyTakeaways: [
      'Superannuation on PPL payments at 12% SG rate',
      'Revised tax concessions for high-balance accounts ($3m+)',
      'Digital direct-payment compliance for employers (Pay Day Super)'
    ],
    professionalOutlook: 'EY notes that PAY DAY SUPER and PPL super payments will significantly improve lifetime balances for casual and female-dominated workforces.',
    sourceIds: ['s1', 's4']
  },
  'tax': {
    title: 'Fiscal & Tax Reform Outlook',
    summary: 'The 2026 budget introduces a significant shift towards automated bracket-creep prevention via threshold indexation.',
    keyTakeaways: [
      'Threshold indexation pegged to Wage Price Index',
      'Corporate tax compliance measures tightened',
      'Strategic focus on retaining high-skilled labor'
    ],
    professionalOutlook: 'Wait-and-see for long-term fiscal neutrality; BDO notes this indexation is the most pro-consumer tax change in a decade.',
    sourceIds: ['s1', 's2']
  },
  'education': {
    title: 'Skills & Human Capital',
    summary: 'A pivot towards reducing the debt burden on early-career professionals while funding priority skills in energy and care.',
    keyTakeaways: [
      'Student debt indexation capped to lower of CPI or WPI',
      'Additional fee-free TAFE places for "Future Made in Australia"',
      'Research grants focused on quantum and climate tech'
    ],
    professionalOutlook: 'Education sector analysts see this as a necessary retention strategy for the domestic workforce.',
    sourceIds: ['s1']
  },
  'health': {
    title: 'Healthcare System Resilience',
    summary: 'Continued investment in primary care access to relieve pressure on hospital emergency departments.',
    keyTakeaways: [
      'Triple bulk-billing incentive for priority groups',
      'PBS price freeze extension for common medicines',
      'Digital health infrastructure integration funding'
    ],
    professionalOutlook: 'The AMA describes the bulk-billing incentive as a survival lifeline for regional general practice.',
    sourceIds: ['s1', 's2']
  }
};

export const SOURCES: Source[] = [
  {
    id: 's1',
    title: 'Budget Paper No. 1: Budget Strategy and Outlook (Forthcoming)',
    publisher: 'Treasury',
    url: 'https://budget.gov.au/',
    sourceType: 'official-budget',
    reliability: 'low',
    lastChecked: '2026-05-10T01:00:00Z'
  },
  {
    id: 's2',
    title: 'Deloitte Access Economics: Federal Budget 2026-27 Analysis',
    publisher: 'Deloitte Australia',
    url: 'https://www2.deloitte.com/au/en/pages/market-study/articles/federal-budget.html',
    sourceType: 'professional-commentary',
    reliability: 'high',
    lastChecked: '2026-05-09T03:15:00Z'
  },
  {
    id: 's3',
    title: 'KPMG Housing Insights: Social Housing Accelerator 2026',
    publisher: 'KPMG Australia',
    url: 'https://kpmg.com/au/en/home/insights.html?q=federal+budget',
    sourceType: 'professional-commentary',
    reliability: 'high',
    lastChecked: '2026-05-10T10:00:00Z'
  },
  {
    id: 's4',
    title: 'EY Tax Briefing: Superannuation & Multinational Amendments',
    publisher: 'EY Australia',
    url: 'https://www.ey.com/en_au/tax/federal-budget',
    sourceType: 'professional-commentary',
    reliability: 'high',
    lastChecked: '2026-05-10T11:30:00Z'
  },
  {
    id: 's5',
    title: 'PwC Australia: Small Business Budget Primer 2026',
    publisher: 'PwC Australia',
    url: 'https://www.pwc.com.au/tax/federal-budget.html',
    sourceType: 'professional-commentary',
    reliability: 'high',
    lastChecked: '2026-05-11T09:15:00Z'
  },
  {
    id: 's6',
    title: 'Budget 2026: Winners and Losers',
    publisher: 'ABC News',
    url: 'https://www.abc.net.au/news/business/federal-budget',
    sourceType: 'media',
    reliability: 'high',
    lastChecked: '2026-05-12T20:00:00Z'
  },
  {
    id: 's7',
    title: 'The Green Budget: Climate transition analyzed',
    publisher: 'The Guardian Australia',
    url: 'https://www.theguardian.com/australia-news/federal-budget',
    sourceType: 'media',
    reliability: 'high',
    lastChecked: '2026-05-12T21:30:00Z'
  },
  {
    id: 's8',
    title: 'ASX Reaction to Surplus Forecast',
    publisher: 'Sky News Business',
    url: 'https://www.skynews.com.au/australia-news/budget',
    sourceType: 'media',
    reliability: 'medium',
    lastChecked: '2026-05-13T10:00:00Z'
  }
];

export const MEASURES: BudgetMeasure[] = [
  {
    id: 'm1',
    slug: 'cost-of-living-energy-rebate',
    title: 'Energy Bill Relief Extension',
    category: 'cost-of-living',
    status: 'expected',
    legalStatus: 'announcement-only',
    audience: ['individuals', 'families', 'small-business'],
    impact: 'high',
    confidence: 'high',
    summaryShort: 'An extension of the energy bill rebate for low-income households and small businesses.',
    plainEnglish: 'The government is giving eligible households a $300 credit on their electricity bills to help with rising costs.',
    professionalSummary: 'Deloitte Access Economics notes that while this provides immediate CPI relief, the temporary nature of the rebate may create a "cliff" in the FY28 inflation data. Sky News reports the market has priced in this relief, expecting it to keep the RBA on hold through Q3 2026.',
    technicalNotes: 'Relief is delivered via state-based jurisdictional energy retailers. Eligibility criteria for small businesses remain linked to annual consumption thresholds (typically <100MWh).',
    financialAmount: '$3.5 billion',
    startDate: '2026-07-01',
    sourceIds: ['s1', 's2', 's5', 's8'],
    relatedMeasureIds: ['m3'],
    lastUpdated: '2026-05-10T08:00:00Z',
    createdAt: '2026-05-09T18:00:00Z'
  },
  {
    id: 'm2',
    slug: 'housing-supply-boost',
    title: 'Social Housing Accelerator Fund',
    category: 'housing',
    status: 'expected',
    legalStatus: 'consultation',
    audience: ['renters', 'homeowners'],
    impact: 'high',
    confidence: 'high',
    summaryShort: 'Direct investment in social and affordable housing projects across Australia.',
    plainEnglish: 'New funding will be used to build thousands of new social housing homes over the next four years.',
    professionalSummary: 'KPMG analysis suggests a high internal rate of return (IRR) for community housing providers (CHPs) engaging with this fund. The Guardian Australia notes that while the capital injection is historic, the environmental standards for new builds remain "vague" compared to international benchmarks.',
    technicalNotes: 'Funding is allocated as capital grants to State and Territory governments, conditional on rapid planning approvals and CHP partnership frameworks.',
    financialAmount: '$2.0 billion',
    sourceIds: ['s1', 's3', 's7'],
    lastUpdated: '2026-05-10T09:30:00Z',
    createdAt: '2026-04-12T19:30:00Z'
  },
  {
    id: 'm3',
    slug: 'superannuation-on-paid-parental-leave',
    title: 'Superannuation on Paid Parental Leave',
    category: 'superannuation',
    status: 'official',
    legalStatus: 'passed-parliament',
    audience: ['families', 'individuals'],
    impact: 'medium',
    confidence: 'high',
    summaryShort: 'Payment of superannuation on Commonwealth Paid Parental Leave.',
    plainEnglish: 'From July 2026, the government will pay superannuation on its Paid Parental Leave scheme to help close the gender retirement gap.',
    professionalSummary: 'EY Australia highlights this as a critical structural reform for retirement equity. They note that the administrative burden falls primarily on the ATO rather than private employers, reducing compliance overhead.',
    technicalNotes: 'The contribution is calculated at the prevailing Superannuation Guarantee rate (12% in 2026) on the national minimum wage component of the PPL payment.',
    financialAmount: '$1.1 billion',
    startDate: '2026-07-01',
    sourceIds: ['s1', 's4'],
    relatedMeasureIds: ['m1'],
    lastUpdated: '2026-05-08T10:00:00Z',
    createdAt: '2026-05-08T10:00:00Z'
  },
  {
    id: 'm4',
    slug: 'income-tax-threshold-adjustment',
    title: 'Individual Income Tax Indexation',
    category: 'tax',
    status: 'expected',
    legalStatus: 'announcement-only',
    audience: ['individuals', 'professionals'],
    impact: 'high',
    confidence: 'high',
    summaryShort: 'Indexing tax thresholds to Wage Price Index to combat bracket creep.',
    plainEnglish: 'The government is changing tax thresholds so you don\'t pay more tax just because your wages went up with inflation.',
    professionalSummary: 'BDO Australia notes this as the most significant structural tax shift since the 2024 Stage 3 revisions. ABC News analysis defines this as "inflation-proofing the paycheck", though some crossbenchers argue it disproportionately benefits high-income earners over the long term.',
    technicalNotes: 'Thresholds for the 30% and 37% brackets will be adjusted annually based on the previous year\'s WPI. Implementation requires amendments to the Income Tax Assessment Act 1997.',
    financialAmount: '$12.4 billion',
    startDate: '2026-07-01',
    sourceIds: ['s1', 's2', 's6'],
    lastUpdated: '2026-05-10T10:00:00Z',
    createdAt: '2026-05-01T10:00:00Z'
  },
  {
    id: 'm7',
    slug: 'instant-asset-write-off-extension',
    title: 'Small Business Instant Asset Write-off',
    category: 'tax',
    status: 'official',
    legalStatus: 'passed-parliament',
    audience: ['small-business'],
    impact: 'medium',
    confidence: 'high',
    summaryShort: 'Extension of the $20,000 instant asset write-off for small businesses.',
    plainEnglish: 'Small businesses can continue to immediately deduct the full cost of eligible assets costing less than $20,000.',
    professionalSummary: 'PwC note that this extension is critical for small business cash flow, particularly in the construction and retail sectors. It provides a significant incentive for equipment upgrades during a period of slowing capital investment.',
    technicalNotes: 'Applies to businesses with an aggregate annual turnover of less than $10 million. The $20,000 threshold applies on a per-asset basis.',
    financialAmount: '$0.9 billion',
    startDate: '2026-07-01',
    sourceIds: ['s1', 's5'],
    lastUpdated: '2026-05-11T09:15:00Z',
    createdAt: '2026-05-11T09:15:00Z'
  },
  {
    id: 'm8',
    slug: 'multinational-tax-transparency',
    title: 'Multinational Tax Integrity Package',
    category: 'tax',
    status: 'expected',
    legalStatus: 'consultation',
    audience: ['professionals'],
    impact: 'medium',
    confidence: 'medium',
    summaryShort: 'Stricter reporting and tax compliance for large multinational corporations.',
    plainEnglish: 'New rules to ensure that large global companies pay their fair share of tax on profits made in Australia.',
    professionalSummary: 'EY Australia suggests that these measures align with OECD Pillar Two requirements but add significant compliance overhead for Australian-headquartered multinationals. The Treasury expects this to recover lost revenue from aggressive transfer pricing.',
    technicalNotes: 'Introduces a public country-by-country reporting framework and strengthened thin capitalisation rules to limit interest deductions.',
    financialAmount: '$1.2 billion',
    sourceIds: ['s1', 's4'],
    lastUpdated: '2026-05-10T11:00:00Z',
    createdAt: '2026-05-02T11:00:00Z'
  },
  {
    id: 'm9',
    slug: 'medicare-levy-threshold-adjustment',
    title: 'Medicare Levy Exemption Lift',
    category: 'tax',
    status: 'official',
    legalStatus: 'passed-parliament',
    audience: ['individuals', 'families'],
    impact: 'low',
    confidence: 'high',
    summaryShort: 'Increasing Medicare levy low-income thresholds for households.',
    plainEnglish: 'More people on lower incomes will be exempt from paying the Medicare levy or will pay a reduced rate.',
    professionalSummary: 'The Treasury analysis shows this adjustment will benefit approximately 1.2 million low-income Australians, ensuring they aren\'t penalized by cost-of-living wage adjustments.',
    technicalNotes: 'The threshold for singles will increase to $26,000, and for families to $43,846. Additional amounts apply for each dependent child or student.',
    financialAmount: '$0.6 billion',
    startDate: '2026-07-01',
    sourceIds: ['s1'],
    lastUpdated: '2026-05-09T08:00:00Z',
    createdAt: '2026-05-09T08:00:00Z'
  },
  {
    id: 'm5',
    slug: 'student-debt-indexation-cap',
    title: 'Fairer Student Debt Indexation',
    category: 'education',
    status: 'official',
    legalStatus: 'passed-parliament',
    audience: ['students', 'individuals'],
    impact: 'medium',
    confidence: 'high',
    summaryShort: 'Capping HECS/HELP indexation to the lower of CPI or WPI.',
    plainEnglish: 'Student loan debts will now only increase by the lowest possible inflation rate, preventing the massive debt jumps seen in previous years.',
    professionalSummary: 'Universities Australia has welcomed the move, noting it improves the "lifetime borrowing capacity" of graduates. Financial analysts expect this to improve mortgage serviceability metrics for first-home buyers.',
    technicalNotes: 'Indexation is now pegged to the lower of the Consumer Price Index (CPI) and the Wage Price Index (WPI), effective retrospectively for the 2023 indexation period.',
    financialAmount: '$3.0 billion',
    sourceIds: ['s1'],
    lastUpdated: '2026-05-09T09:00:00Z',
    createdAt: '2026-05-09T09:00:00Z'
  },
  {
    id: 'm6',
    slug: 'medicare-bulk-billing-incentive',
    title: 'Medicare Bulk Billing Triple Incentive',
    category: 'health',
    status: 'official',
    legalStatus: 'passed-parliament',
    audience: ['families', 'retirees', 'individuals'],
    impact: 'high',
    confidence: 'high',
    summaryShort: 'Tripling the incentive for GPs to bulk bill children and concession card holders.',
    plainEnglish: 'The government is paying doctors more to provide free appointments for children, pensioners, and low-income earners.',
    professionalSummary: 'The AMA describes this as a "foundational fix" for primary care. It specifically targets the declining rate of bulk billing in regional and outer-metropolitan areas.',
    technicalNotes: 'Incentive applies to level C and D consultations. Scaling factors are weighted by the Modified Monash Model (MMM) for regional loadings.',
    financialAmount: '$3.5 billion',
    sourceIds: ['s1', 's2'],
    lastUpdated: '2026-05-10T14:00:00Z',
    createdAt: '2026-05-10T14:00:00Z'
  }
];
