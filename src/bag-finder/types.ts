export type QuestionId =
  | 'carry'
  | 'carryMode'
  | 'occasion'
  | 'structure'
  | 'priority'

export type AnswerOption = {
  id: string
  label: string
  helperText?: string
}

export type Question = {
  id: QuestionId
  prompt: string
  options: AnswerOption[]
}

export type BagFinderState = {
  currentQuestionIndex: number
  answers: Partial<Record<QuestionId, string>>
  isComplete: boolean
}
