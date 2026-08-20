import type { Question } from './types'

export const bagFinderQuestions: Question[] = [
  {
    id: 'carry',
    prompt: 'What are you carrying most often?',
    options: [
      { id: 'essentials', label: 'Just the essentials' },
      { id: 'everyday', label: 'Everyday items' },
      { id: 'work-school', label: 'Work, school, or a laptop' },
      { id: 'bulky', label: 'Groceries, errands, or bulky extras' },
      { id: 'travel-organization', label: 'Travel or organization' },
    ],
  },
  {
    id: 'carryMode',
    prompt: 'How do you want to carry it?',
    options: [
      { id: 'crossbody', label: 'Crossbody or hands-free' },
      { id: 'shoulder', label: 'Over the shoulder' },
      { id: 'tote', label: 'In hand or as a tote' },
      { id: 'packable', label: 'Packed inside another bag' },
      { id: 'no-preference', label: 'No strong preference' },
    ],
  },
  {
    id: 'occasion',
    prompt: 'When will you use it most?',
    options: [
      { id: 'errands', label: 'Daily errands' },
      { id: 'commuting', label: 'Commuting' },
      { id: 'shopping', label: 'Shopping' },
      { id: 'travel', label: 'Travel' },
      { id: 'going-out', label: 'Going out' },
    ],
  },
  {
    id: 'structure',
    prompt: 'How much structure do you want?',
    options: [
      { id: 'soft', label: 'Soft and slouchy' },
      { id: 'casual-shape', label: 'Some shape, but still casual' },
      { id: 'protective', label: 'Structured and protective' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  {
    id: 'priority',
    prompt: 'What matters most after fit?',
    options: [
      { id: 'compact', label: 'Compact size' },
      { id: 'capacity', label: 'Maximum capacity' },
      { id: 'hands-free', label: 'Hands-free wear' },
      { id: 'organization', label: 'Organization' },
      { id: 'giftable', label: 'Giftability or broad appeal' },
    ],
  },
]
