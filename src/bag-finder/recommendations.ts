import type { CarryLevel, ProductSizeFact } from '../data/bag-size-data.ts';
import { bagSizeData } from '../data/bag-size-data.ts';
import { bagFinderQuestions } from './questions.ts';
import type {
  BagFinderProfile,
  BagFinderState,
  BagRecommendationItem,
  BagRecommendationSet,
  ExtraRoomPreference,
  FitRequirement,
  RecommendationReason,
  UnmetRequirement,
  UseCase,
} from './types.ts';

const carryLevelRank: Record<CarryLevel, number> = {
  minimal: 0,
  light: 1,
  everyday: 2,
  roomy: 3,
  'high-capacity': 4,
  unknown: 99,
};

const displayOrder = [
  'small-nylon-bowler-bag',
  'nylon-bowler-bag',
  'small-nylon-crescent-bag',
  'nylon-loaf-bag',
  'small-nylon-meringue-bag',
  'medium-nylon-crescent-bag',
  'nylon-meringue-bag',
  'medium-nylon-bowler-bag',
  'everyday-cloud-bag',
  'large-nylon-crescent-bag',
  'cloud-bag',
  'small-cloud-carry-on',
  'standard-baggu',
  'cloud-carry-on',
  'baby-baggu',
  'big-baggu',
];

const displayOrderIndex = new Map(displayOrder.map((id, index) => [id, index]));

export function getBagRecommendation(
  answers: BagFinderState['answers'],
  products: ProductSizeFact[] = bagSizeData,
): BagRecommendationSet {
  const profile = getBagFinderProfile(answers);
  const eligibleProducts = getEligibleBags(profile, products);
  const rankedEligible = rankBagRecommendations(profile, eligibleProducts);
  const nearMatches = rankBagRecommendations(
    profile,
    products.filter((product) => !eligibleProducts.includes(product)),
  ).slice(0, 4);
  const unmetRequirements =
    rankedEligible.length === 0 ? getUnmetRequirements(profile, products) : [];

  return {
    primary: rankedEligible[0],
    alternatives: rankedEligible.slice(1, 3).map((item) => ({
      ...item,
      tradeoff: getAlternativeTradeoff(item.product, rankedEligible[0]?.product),
    })),
    eligibleOptions: rankedEligible,
    nearMatches,
    unmetRequirements,
  };
}

export function getEligibleBags(
  profile: BagFinderProfile,
  products: ProductSizeFact[] = bagSizeData,
) {
  return products.filter((product) =>
    profile.requiredFits.every((requirement) => productMeetsRequirement(product, requirement)),
  );
}

export function rankBagRecommendations(
  profile: BagFinderProfile,
  products: ProductSizeFact[] = bagSizeData,
): BagRecommendationItem[] {
  return products
    .map((product) => ({
      product,
      rank: getProductRank(product, profile),
      reasons: getRecommendationReasons(product, profile),
    }))
    .sort(compareRecommendations);
}

export function getBagFinderProfile(answers: BagFinderState['answers']): BagFinderProfile {
  const requiredFits = dedupeRequirements([
    ...getDailyCarryRequirements(answers.dailyCarry),
    ...getLargestItemRequirements(answers.largestItem),
  ]);

  return {
    requiredFits,
    targetCarryLevel: getTargetCarryLevel(answers),
    extraRoomPreference: getExtraRoomPreference(answers.extraRoom),
    primaryUse: getPrimaryUse(answers.primaryUse),
    selectedAnswerLabels: getSelectedAnswerLabels(answers),
  };
}

function getDailyCarryRequirements(answerId?: string): FitRequirement[] {
  switch (answerId) {
    case 'essentials':
      return ['phone'];
    case 'water-bottle':
      return ['phone', 'waterBottle'];
    case 'tablet-pouches':
      return ['phone', 'tablet'];
    case 'laptop':
      return ['phone', 'laptop13'];
    case 'groceries-bulky':
      return ['groceries'];
    default:
      return [];
  }
}

function getLargestItemRequirements(answerId?: string): FitRequirement[] {
  switch (answerId) {
    case 'small':
      return ['phone'];
    case 'water-bottle':
      return ['waterBottle'];
    case 'tablet':
      return ['tablet'];
    case 'laptop-13':
      return ['laptop13'];
    case 'laptop-16':
      return ['laptop16'];
    case 'groceries':
      return ['groceries'];
    default:
      return [];
  }
}

function getTargetCarryLevel(answers: BagFinderState['answers']): CarryLevel {
  if (answers.dailyCarry === 'groceries-bulky' || answers.largestItem === 'groceries') {
    return 'high-capacity';
  }

  if (
    answers.largestItem === 'laptop-16' ||
    answers.extraRoom === 'maximum' ||
    answers.primaryUse === 'travel'
  ) {
    return 'roomy';
  }

  if (
    answers.dailyCarry === 'tablet-pouches' ||
    answers.dailyCarry === 'laptop' ||
    answers.largestItem === 'tablet' ||
    answers.largestItem === 'laptop-13' ||
    answers.extraRoom === 'flexible'
  ) {
    return 'everyday';
  }

  if (answers.dailyCarry === 'water-bottle' || answers.largestItem === 'water-bottle') {
    return answers.extraRoom === 'just-enough' ? 'light' : 'everyday';
  }

  return answers.extraRoom === 'little-extra' ? 'light' : 'minimal';
}

function getExtraRoomPreference(answerId?: string): ExtraRoomPreference {
  switch (answerId) {
    case 'little-extra':
      return 'some';
    case 'flexible':
      return 'flexible';
    case 'maximum':
      return 'maximum';
    default:
      return 'minimal';
  }
}

function getPrimaryUse(answerId?: string): UseCase {
  switch (answerId) {
    case 'work-school':
      return 'workSchool';
    case 'errands':
      return 'errands';
    case 'travel':
      return 'travel';
    case 'groceries':
      return 'groceries';
    default:
      return 'everyday';
  }
}

function dedupeRequirements(requirements: FitRequirement[]) {
  const requirementSet = new Set(requirements);

  if (requirementSet.has('laptop16')) {
    requirementSet.delete('laptop13');
  }

  return Array.from(requirementSet);
}

function productMeetsRequirement(product: ProductSizeFact, requirement: FitRequirement) {
  switch (requirement) {
    case 'phone':
      return product.attributes.fitsPhone === true;
    case 'waterBottle':
      return product.attributes.fitsWaterBottle === true;
    case 'tablet':
      return product.attributes.fitsTablet === true;
    case 'laptop13':
      return (
        product.attributes.fitsLaptop === true &&
        (product.attributes.confirmedLaptopSize?.includes('13/14') ||
          product.attributes.confirmedLaptopSize?.includes('16'))
      );
    case 'laptop16':
      return (
        product.attributes.fitsLaptop === true &&
        product.attributes.confirmedLaptopSize?.includes('16')
      );
    case 'groceries':
      return product.attributes.goodForGroceries === true;
    case 'extraLayer':
      return product.attributes.fitsExtraLayer === true;
    case 'travel':
      return product.attributes.goodForTravel === true;
  }
}

function getProductRank(product: ProductSizeFact, profile: BagFinderProfile) {
  const levelScore = getCarryLevelDistance(product.attributes.carryLevel, profile);
  const useCaseScore = getUseCaseDistance(product, profile.primaryUse);
  const fitEvidenceScore = getFitEvidenceDistance(product, profile.requiredFits);
  const imageScore = product.imageUrl ? 0 : 1;
  const stableOrderScore = displayOrderIndex.get(product.id) ?? 99;

  return (
    levelScore * 100 +
    useCaseScore * 20 +
    fitEvidenceScore * 5 +
    imageScore +
    stableOrderScore / 100
  );
}

function getCarryLevelDistance(productLevel: CarryLevel, profile: BagFinderProfile) {
  const productRank = carryLevelRank[productLevel];
  const targetRank = carryLevelRank[profile.targetCarryLevel];

  if (productRank === 99 || targetRank === 99) {
    return 20;
  }

  const distance = Math.abs(productRank - targetRank);
  const oversizePenalty = Math.max(0, productRank - targetRank);
  const undersizePenalty = Math.max(0, targetRank - productRank);

  switch (profile.extraRoomPreference) {
    case 'minimal':
      return distance + oversizePenalty * 1.5 + undersizePenalty * 3;
    case 'some':
      return distance + oversizePenalty * 0.75 + undersizePenalty * 3;
    case 'flexible':
      return distance + oversizePenalty * 0.2 + undersizePenalty * 2;
    case 'maximum':
      return Math.max(0, targetRank - productRank) * 3;
  }
}

function getUseCaseDistance(product: ProductSizeFact, primaryUse: UseCase) {
  switch (primaryUse) {
    case 'groceries':
      return product.attributes.goodForGroceries === true ? 0 : 8;
    case 'travel':
      return product.attributes.goodForTravel === true ? 0 : 4;
    case 'workSchool':
      if (product.attributes.fitsLaptop === true) {
        return 0;
      }
      return product.attributes.fitsTablet === true ? 2 : 4;
    case 'errands':
      return product.attributes.goodForGroceries === true ? 3 : 0;
    case 'everyday':
      return ['minimal', 'light', 'everyday'].includes(product.attributes.carryLevel) ? 0 : 2;
  }
}

function getFitEvidenceDistance(product: ProductSizeFact, requirements: FitRequirement[]) {
  return requirements.filter((requirement) => !productMeetsRequirement(product, requirement))
    .length;
}

function getRecommendationReasons(
  product: ProductSizeFact,
  profile: BagFinderProfile,
): RecommendationReason[] {
  const reasons: RecommendationReason[] = [];

  for (const requirement of profile.requiredFits) {
    if (productMeetsRequirement(product, requirement)) {
      reasons.push({
        label: getRequirementLabel(requirement),
        detail: getRequirementDetail(product, requirement),
      });
    }
  }

  if (product.attributes.carryLevel === profile.targetCarryLevel) {
    reasons.push({
      label: 'Capacity',
      detail: `Matches a ${profile.targetCarryLevel} carry level based on confirmed BAGGU fit data.`,
    });
  }

  const useCaseReason = getUseCaseReason(product, profile.primaryUse);

  if (useCaseReason) {
    reasons.push(useCaseReason);
  }

  return reasons.slice(0, 4);
}

function getRequirementLabel(requirement: FitRequirement) {
  switch (requirement) {
    case 'phone':
      return 'Phone';
    case 'waterBottle':
      return 'Water bottle';
    case 'tablet':
      return 'Tablet';
    case 'laptop13':
      return '13/14" laptop';
    case 'laptop16':
      return '16" laptop';
    case 'groceries':
      return 'Groceries';
    case 'extraLayer':
      return 'Extra layer';
    case 'travel':
      return 'Travel';
  }
}

function getRequirementDetail(product: ProductSizeFact, requirement: FitRequirement) {
  switch (requirement) {
    case 'phone':
      return `${product.canonicalName} fits phone.`;
    case 'waterBottle':
      return `${product.canonicalName} fits water bottle.`;
    case 'tablet':
      return `${product.canonicalName} fits Puffy Tablet Sleeve.`;
    case 'laptop13':
    case 'laptop16':
      return `${product.canonicalName} fits ${product.attributes.confirmedLaptopSize}.`;
    case 'groceries':
      return `${product.canonicalName} fits a full load of groceries.`;
    case 'extraLayer':
      return `${product.canonicalName} fits larger items.`;
    case 'travel':
      return `${product.canonicalName} fits travel-oriented items.`;
  }
}

function getUseCaseReason(
  product: ProductSizeFact,
  primaryUse: UseCase,
): RecommendationReason | undefined {
  if (primaryUse === 'travel' && product.attributes.goodForTravel === true) {
    return {
      label: 'Travel',
      detail: 'fits travel-oriented items like packing cubes or a Dopp kit.',
    };
  }

  if (primaryUse === 'groceries' && product.attributes.goodForGroceries === true) {
    return {
      label: 'Groceries',
      detail: product.capacityOrVolume ?? 'this product has grocery capacity.',
    };
  }

  if (
    primaryUse === 'workSchool' &&
    (product.attributes.fitsLaptop === true || product.attributes.fitsTablet === true)
  ) {
    return {
      label: 'Work or school',
      detail: 'Confirmed tech fit makes this a better match for work or school carry.',
    };
  }

  return undefined;
}

function getAlternativeTradeoff(
  product: ProductSizeFact,
  primaryProduct: ProductSizeFact | undefined,
) {
  if (!primaryProduct) {
    return undefined;
  }

  const productLevel = carryLevelRank[product.attributes.carryLevel];
  const primaryLevel = carryLevelRank[primaryProduct.attributes.carryLevel];

  if (productLevel < primaryLevel) {
    return 'A smaller confirmed option if you want less bag.';
  }

  if (productLevel > primaryLevel) {
    return 'A roomier confirmed option if you want more flexibility.';
  }

  if (product.productFamily !== primaryProduct.productFamily) {
    return 'A different bag shape with similar confirmed capacity needs.';
  }

  return undefined;
}

function getUnmetRequirements(
  profile: BagFinderProfile,
  products: ProductSizeFact[],
): UnmetRequirement[] {
  return profile.requiredFits
    .filter(
      (requirement) => !products.some((product) => productMeetsRequirement(product, requirement)),
    )
    .map((requirement) => ({
      requirement,
      label: getRequirementLabel(requirement),
    }));
}

function getSelectedAnswerLabels(answers: BagFinderState['answers']) {
  return bagFinderQuestions.flatMap((question) => {
    const selectedAnswerId = answers[question.id];
    const option = question.options.find((answer) => answer.id === selectedAnswerId);

    return option ? [option.label] : [];
  });
}

function compareRecommendations(first: BagRecommendationItem, second: BagRecommendationItem) {
  return first.rank - second.rank;
}
