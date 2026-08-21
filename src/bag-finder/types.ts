export type QuestionId = 'carry' | 'carryMode' | 'occasion' | 'structure' | 'priority';

export type AnswerOption = {
  id: string;
  label: string;
  helperText?: string;
};

export type Question = {
  id: QuestionId;
  prompt: string;
  options: AnswerOption[];
};

export type BagFinderState = {
  currentQuestionIndex: number;
  answers: Partial<Record<QuestionId, string>>;
  isComplete: boolean;
};

export type CapacityNeed = 'small' | 'medium' | 'large' | 'oversized';

export type CarryModeNeed = 'crossbody' | 'shoulder' | 'tote' | 'handheld' | 'packable';

export type UseCaseNeed = 'daily' | 'commute' | 'shopping' | 'travel' | 'evening' | 'organization';

export type StructureNeed = 'soft' | 'semiStructured' | 'protective';

export type PriorityNeed =
  'compact' | 'capacity' | 'handsFree' | 'organization' | 'giftable' | 'versatile';

export type NeedCategory = 'capacity' | 'carryMode' | 'useCase' | 'structure' | 'priority';

export type WeightedNeed = {
  category: NeedCategory;
  value: CapacityNeed | CarryModeNeed | UseCaseNeed | StructureNeed | PriorityNeed;
  weight: number;
  answerLabel: string;
  reason: string;
};

export type BagCandidate = {
  id: string;
  name: string;
  family: string;
  imageUrl: string;
  imageAlt: string;
  bestFor: string;
  capacitySummary: string;
  carryStyle: string;
  organizationSummary: string;
  laptopFit?: string;
  price?: string;
  variantSummary?: string;
  capacities: CapacityNeed[];
  carryModes: CarryModeNeed[];
  useCases: UseCaseNeed[];
  structures: StructureNeed[];
  priorities: PriorityNeed[];
  flexibilityScore: number;
  tradeoffs: string[];
};

export type RecommendationExplanation = {
  answerLabel: string;
  reason: string;
};

export type RecommendationItem = {
  candidate: BagCandidate;
  score: number;
  explanations: RecommendationExplanation[];
  tradeoff?: string;
};

export type RecommendationSet = {
  primary: RecommendationItem;
  alternatives: RecommendationItem[];
};
