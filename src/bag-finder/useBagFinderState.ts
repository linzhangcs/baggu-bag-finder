import { useMemo, useReducer } from 'react'
import type { BagFinderState, Question, QuestionId } from './types'

type BagFinderAction =
  | { type: 'selectAnswer'; questionId: QuestionId; answerId: string }
  | { type: 'goNext'; questionCount: number }
  | { type: 'goBack' }
  | { type: 'restart' }

const initialState: BagFinderState = {
  currentQuestionIndex: 0,
  answers: {},
  isComplete: false,
}

function bagFinderReducer(
  state: BagFinderState,
  action: BagFinderAction,
): BagFinderState {
  switch (action.type) {
    case 'selectAnswer':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answerId,
        },
      }
    case 'goNext': {
      const nextQuestionIndex = state.currentQuestionIndex + 1

      if (nextQuestionIndex >= action.questionCount) {
        return {
          ...state,
          isComplete: true,
        }
      }

      return {
        ...state,
        currentQuestionIndex: nextQuestionIndex,
      }
    }
    case 'goBack':
      if (state.isComplete) {
        return {
          ...state,
          isComplete: false,
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex),
        }
      }

      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      }
    case 'restart':
      return initialState
  }
}

export function useBagFinderState(questions: Question[]) {
  const [state, dispatch] = useReducer(bagFinderReducer, initialState)
  const currentQuestion = questions[state.currentQuestionIndex]
  const selectedAnswerId = currentQuestion
    ? state.answers[currentQuestion.id]
    : undefined

  const answeredCount = useMemo(
    () =>
      questions.filter((question) => state.answers[question.id] !== undefined)
        .length,
    [questions, state.answers],
  )

  return {
    state,
    currentQuestion,
    selectedAnswerId,
    answeredCount,
    selectAnswer: (questionId: QuestionId, answerId: string) => {
      dispatch({ type: 'selectAnswer', questionId, answerId })
    },
    goNext: () => {
      dispatch({ type: 'goNext', questionCount: questions.length })
    },
    goBack: () => {
      dispatch({ type: 'goBack' })
    },
    restart: () => {
      dispatch({ type: 'restart' })
    },
  }
}
