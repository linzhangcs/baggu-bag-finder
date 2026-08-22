import type { CarryLevel, ProductSizeFact } from '../data/bag-size-data.ts';

export type QuestionId = 'dailyCarry' | 'largestItem' | 'extraRoom' | 'primaryUse';

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

export type FitRequirement =
  | 'phone'
  | 'waterBottle'
  | 'tablet'
  | 'laptop13'
  | 'laptop16'
  | 'groceries'
  | 'extraLayer'
  | 'travel';

export type UseCase = 'everyday' | 'workSchool' | 'errands' | 'travel' | 'groceries';

export type ExtraRoomPreference = 'minimal' | 'some' | 'flexible' | 'maximum';

export type BagFinderProfile = {
  requiredFits: FitRequirement[];
  targetCarryLevel: CarryLevel;
  extraRoomPreference: ExtraRoomPreference;
  primaryUse: UseCase;
  selectedAnswerLabels: string[];
};

export type RecommendationReason = {
  label: string;
  detail: string;
};

export type BagRecommendationItem = {
  product: ProductSizeFact;
  rank: number;
  reasons: RecommendationReason[];
  tradeoff?: string;
};

export type UnmetRequirement = {
  requirement: FitRequirement;
  label: string;
};

export type BagRecommendationSet = {
  primary?: BagRecommendationItem;
  alternatives: BagRecommendationItem[];
  eligibleOptions: BagRecommendationItem[];
  nearMatches: BagRecommendationItem[];
  unmetRequirements: UnmetRequirement[];
};
