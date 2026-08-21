import { bagCandidates } from './candidates'
import type {
  BagCandidate,
  BagFinderState,
  NeedCategory,
  QuestionId,
  RecommendationExplanation,
  RecommendationItem,
  RecommendationSet,
  WeightedNeed,
} from './types'

const answerNeedMap: Partial<Record<QuestionId, Record<string, WeightedNeed[]>>> = {
  carry: {
    essentials: [
      need('capacity', 'small', 4, 'Just the essentials', 'fits a lighter carry'),
      need('priority', 'compact', 3, 'Just the essentials', 'keeps the profile compact'),
    ],
    everyday: [
      need('capacity', 'medium', 4, 'Everyday items', 'fits a regular daily load'),
      need('useCase', 'daily', 3, 'Everyday items', 'works for frequent daily use'),
      need('priority', 'versatile', 2, 'Everyday items', 'keeps the recommendation flexible'),
    ],
    'work-school': [
      need('capacity', 'large', 4, 'Work, school, or a laptop', 'adds room for work or school items'),
      need('useCase', 'commute', 3, 'Work, school, or a laptop', 'supports commuting needs'),
      need('priority', 'organization', 2, 'Work, school, or a laptop', 'prioritizes keeping items sorted'),
    ],
    bulky: [
      need('capacity', 'large', 4, 'Groceries, errands, or bulky extras', 'handles bulkier carry'),
      need('useCase', 'shopping', 4, 'Groceries, errands, or bulky extras', 'supports shopping and errands'),
      need('priority', 'capacity', 3, 'Groceries, errands, or bulky extras', 'prioritizes hauling room'),
    ],
    'travel-organization': [
      need('useCase', 'travel', 3, 'Travel or organization', 'supports travel use'),
      need('useCase', 'organization', 3, 'Travel or organization', 'supports organizing items'),
      need('priority', 'organization', 3, 'Travel or organization', 'prioritizes sorting and access'),
    ],
  },
  carryMode: {
    crossbody: [
      need('carryMode', 'crossbody', 5, 'Crossbody or hands-free', 'matches hands-free carry'),
      need('priority', 'handsFree', 4, 'Crossbody or hands-free', 'prioritizes hands-free wear'),
    ],
    shoulder: [
      need('carryMode', 'shoulder', 5, 'Over the shoulder', 'matches shoulder carry'),
    ],
    tote: [
      need('carryMode', 'tote', 4, 'In hand or as a tote', 'matches tote-style carry'),
      need('carryMode', 'handheld', 2, 'In hand or as a tote', 'can work as handheld carry'),
    ],
    packable: [
      need('carryMode', 'packable', 5, 'Packed inside another bag', 'works inside another bag'),
      need('priority', 'compact', 2, 'Packed inside another bag', 'keeps the item packable'),
    ],
    'no-preference': [
      need('priority', 'versatile', 3, 'No strong preference', 'keeps carry options flexible'),
      need('priority', 'giftable', 2, 'No strong preference', 'leans toward broadly useful picks'),
    ],
  },
  occasion: {
    errands: [
      need('useCase', 'daily', 4, 'Daily errands', 'works for regular errand use'),
      need('priority', 'versatile', 2, 'Daily errands', 'keeps the bag broadly useful'),
    ],
    commuting: [
      need('useCase', 'commute', 5, 'Commuting', 'supports commute use'),
      need('capacity', 'medium', 2, 'Commuting', 'adds room for daily essentials'),
    ],
    shopping: [
      need('useCase', 'shopping', 5, 'Shopping', 'supports shopping trips'),
      need('priority', 'capacity', 3, 'Shopping', 'prioritizes carrying capacity'),
    ],
    travel: [
      need('useCase', 'travel', 5, 'Travel', 'supports travel use'),
      need('capacity', 'large', 2, 'Travel', 'adds room for travel extras'),
    ],
    'going-out': [
      need('useCase', 'evening', 4, 'Going out', 'works for going out'),
      need('capacity', 'small', 3, 'Going out', 'keeps carry light'),
      need('priority', 'compact', 2, 'Going out', 'prioritizes compact size'),
    ],
  },
  structure: {
    soft: [
      need('structure', 'soft', 4, 'Soft and slouchy', 'matches a soft shape'),
    ],
    'casual-shape': [
      need('structure', 'semiStructured', 4, 'Some shape, but still casual', 'adds casual structure'),
      need('priority', 'versatile', 2, 'Some shape, but still casual', 'keeps the recommendation flexible'),
    ],
    protective: [
      need('structure', 'protective', 4, 'Structured and protective', 'prioritizes protection'),
      need('priority', 'organization', 2, 'Structured and protective', 'supports more intentional storage'),
    ],
    'not-sure': [
      need('priority', 'versatile', 3, 'Not sure', 'leans toward flexible everyday options'),
      need('priority', 'giftable', 2, 'Not sure', 'leans toward broadly useful picks'),
    ],
  },
  priority: {
    compact: [
      need('priority', 'compact', 5, 'Compact size', 'prioritizes a smaller profile'),
      need('capacity', 'small', 2, 'Compact size', 'keeps capacity light'),
    ],
    capacity: [
      need('priority', 'capacity', 5, 'Maximum capacity', 'prioritizes room'),
      need('capacity', 'large', 3, 'Maximum capacity', 'adds larger capacity'),
    ],
    'hands-free': [
      need('priority', 'handsFree', 5, 'Hands-free wear', 'prioritizes hands-free carry'),
      need('carryMode', 'crossbody', 3, 'Hands-free wear', 'matches crossbody carry'),
    ],
    organization: [
      need('priority', 'organization', 5, 'Organization', 'prioritizes sorting and access'),
      need('useCase', 'organization', 2, 'Organization', 'supports organizing items'),
    ],
    giftable: [
      need('priority', 'giftable', 5, 'Giftability or broad appeal', 'leans toward broadly useful picks'),
      need('priority', 'versatile', 3, 'Giftability or broad appeal', 'keeps the recommendation flexible'),
    ],
  },
}

function need(
  category: NeedCategory,
  value: WeightedNeed['value'],
  weight: number,
  answerLabel: string,
  reason: string,
): WeightedNeed {
  return {
    category,
    value,
    weight,
    answerLabel,
    reason,
  }
}

export function getRecommendations(
  answers: BagFinderState['answers'],
  candidates: BagCandidate[] = bagCandidates,
): RecommendationSet {
  const selectedNeeds = getSelectedNeeds(answers)
  const scoredCandidates = candidates
    .map((candidate) => scoreCandidate(candidate, selectedNeeds))
    .sort(compareRecommendationItems)

  const primary = scoredCandidates[0]

  if (!primary) {
    throw new Error('At least one bag candidate is required.')
  }

  return {
    primary,
    alternatives: selectAlternatives(primary, scoredCandidates),
  }
}

export function getSelectedNeeds(
  answers: BagFinderState['answers'],
): WeightedNeed[] {
  return Object.entries(answers).flatMap(([questionId, answerId]) => {
    if (!answerId) {
      return []
    }

    return answerNeedMap[questionId as QuestionId]?.[answerId] ?? []
  })
}

function scoreCandidate(
  candidate: BagCandidate,
  selectedNeeds: WeightedNeed[],
): RecommendationItem {
  const matchedNeeds = selectedNeeds.filter((selectedNeed) =>
    candidateSupportsNeed(candidate, selectedNeed),
  )
  const score = matchedNeeds.reduce(
    (total, selectedNeed) => total + selectedNeed.weight,
    candidate.flexibilityScore,
  )

  return {
    candidate,
    score,
    explanations: getExplanations(matchedNeeds),
    tradeoff: candidate.tradeoffs[0],
  }
}

function candidateSupportsNeed(
  candidate: BagCandidate,
  selectedNeed: WeightedNeed,
) {
  switch (selectedNeed.category) {
    case 'capacity':
      return includesNeed(candidate.capacities, selectedNeed.value)
    case 'carryMode':
      return includesNeed(candidate.carryModes, selectedNeed.value)
    case 'useCase':
      return includesNeed(candidate.useCases, selectedNeed.value)
    case 'structure':
      return includesNeed(candidate.structures, selectedNeed.value)
    case 'priority':
      return includesNeed(candidate.priorities, selectedNeed.value)
  }
}

function includesNeed(values: readonly string[], selectedValue: string) {
  return values.includes(selectedValue)
}

function getExplanations(
  matchedNeeds: WeightedNeed[],
): RecommendationExplanation[] {
  const explanationsByAnswer = new Map<string, RecommendationExplanation>()

  for (const matchedNeed of matchedNeeds) {
    if (!explanationsByAnswer.has(matchedNeed.answerLabel)) {
      explanationsByAnswer.set(matchedNeed.answerLabel, {
        answerLabel: matchedNeed.answerLabel,
        reason: matchedNeed.reason,
      })
    }
  }

  return Array.from(explanationsByAnswer.values()).slice(0, 3)
}

function compareRecommendationItems(
  first: RecommendationItem,
  second: RecommendationItem,
) {
  const scoreDifference = second.score - first.score

  if (scoreDifference !== 0) {
    return scoreDifference
  }

  return second.candidate.flexibilityScore - first.candidate.flexibilityScore
}

function selectAlternatives(
  primary: RecommendationItem,
  scoredCandidates: RecommendationItem[],
) {
  const alternatives: RecommendationItem[] = []
  const selectedFamilies = new Set([primary.candidate.family])

  for (const item of scoredCandidates) {
    if (item.candidate.id === primary.candidate.id) {
      continue
    }

    if (selectedFamilies.has(item.candidate.family)) {
      continue
    }

    alternatives.push(item)
    selectedFamilies.add(item.candidate.family)

    if (alternatives.length === 3) {
      return alternatives
    }
  }

  for (const item of scoredCandidates) {
    if (
      item.candidate.id !== primary.candidate.id &&
      !alternatives.some(
        (alternative) => alternative.candidate.id === item.candidate.id,
      )
    ) {
      alternatives.push(item)
    }

    if (alternatives.length === 3) {
      return alternatives
    }
  }

  return alternatives
}
