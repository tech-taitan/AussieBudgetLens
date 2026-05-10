
export type BudgetMeasure = {
  id: string;
  slug: string;
  title: string;
  category:
    | "tax"
    | "cost-of-living"
    | "housing"
    | "superannuation"
    | "business"
    | "health"
    | "education"
    | "welfare"
    | "energy"
    | "infrastructure"
    | "defence"
    | "economy"
    | "environment"
    | "immigration"
    | "other";
  status:
    | "official"
    | "expected"
    | "commentary"
    | "not-announced"
    | "withdrawn"
    | "unclear";
  legalStatus:
    | "announcement-only"
    | "consultation"
    | "bill-introduced"
    | "passed-parliament"
    | "royal-assent"
    | "in-force"
    | "not-applicable"
    | "unclear";
  audience: Array<
    | "individuals"
    | "families"
    | "renters"
    | "homeowners"
    | "investors"
    | "landlords"
    | "small-business"
    | "professionals"
    | "companies"
    | "retirees"
    | "students"
  >;
  impact: "high" | "medium" | "low" | "unclear";
  confidence: "high" | "medium" | "low";
  summaryShort: string;
  plainEnglish: string;
  professionalSummary?: string;
  technicalNotes?: string;
  financialAmount?: string;
  startDate?: string;
  endDate?: string;
  sourceIds: string[];
  relatedMeasureIds?: string[];
  lastUpdated: string;
  createdAt: string;
};

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  datePublished?: string;
  sourceType:
    | "official-budget"
    | "treasury"
    | "department"
    | "parliament"
    | "ato"
    | "abs"
    | "rba"
    | "professional-commentary"
    | "media"
    | "think-tank"
    | "industry-body"
    | "other";
  reliability:
    | "official"
    | "high"
    | "medium"
    | "low";
  notes?: string;
  lastChecked: string;
};

export type UpdateLog = {
  id: string;
  measureId: string;
  updateType:
    | "created"
    | "status-changed"
    | "summary-updated"
    | "source-added"
    | "legal-status-updated"
    | "amount-updated"
    | "timing-updated"
    | "commentary";
  previousValue?: string;
  newValue?: string;
  updateSummary: string;
  relatedSourceId?: string;
  updatedBy: string;
  updatedAt: string;
};

export type UserProfile = {
  id: string;
  label: string;
  description: string;
  audienceTag: string;
};

export type SectorInsight = {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  keyTakeaways: string[];
  professionalOutlook: string;
  sourceIds?: string[];
  lastUpdated: string;
};

export type KeyHighlight = {
  title: string;
  description: string;
  sourceIds?: string[];
};

export type QuizQuestion = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    profileId: string;
  }[];
};
