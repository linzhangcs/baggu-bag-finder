import type { Question } from './types.ts';

export const bagFinderQuestions: Question[] = [
  {
    id: 'dailyCarry',
    prompt: 'What do you usually carry?',
    options: [
      {
        id: 'essentials',
        label: 'Phone, wallet, and keys',
        helperText: 'Small daily items only.',
      },
      {
        id: 'water-bottle',
        label: 'Essentials and a water bottle',
        helperText: 'A daily carry with confirmed bottle room.',
      },
      {
        id: 'tablet-pouches',
        label: 'Tablet, pouches, and daily extras',
        helperText: 'More than essentials, but not necessarily a laptop.',
      },
      {
        id: 'laptop',
        label: 'Work, school, or laptop items',
        helperText: 'A tech-focused daily carry.',
      },
      {
        id: 'groceries-bulky',
        label: 'Groceries or larger items',
        helperText: 'Larger loads that need confirmed capacity.',
      },
    ],
  },
  {
    id: 'largestItem',
    prompt: 'What is the largest item you need to fit?',
    options: [
      { id: 'small', label: 'Just small essentials' },
      { id: 'water-bottle', label: '32 oz water bottle' },
      { id: 'tablet', label: 'Tablet sleeve' },
      { id: 'laptop-13', label: '13/14" laptop sleeve' },
      { id: 'laptop-16', label: '16" laptop sleeve' },
      { id: 'groceries', label: 'Groceries or bulky items' },
    ],
  },
  {
    id: 'extraRoom',
    prompt: 'How much extra room do you want?',
    options: [
      { id: 'just-enough', label: 'Just enough room' },
      { id: 'little-extra', label: 'A little extra room' },
      { id: 'flexible', label: 'More room than I need most days' },
      { id: 'maximum', label: 'Maximum flexibility' },
    ],
  },
  {
    id: 'primaryUse',
    prompt: 'What will you use it for most?',
    options: [
      { id: 'everyday', label: 'Everyday essentials' },
      { id: 'work-school', label: 'Work or school' },
      { id: 'errands', label: 'Errands' },
      { id: 'travel', label: 'Travel' },
      { id: 'groceries', label: 'Groceries' },
    ],
  },
];
