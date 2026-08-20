import type { BagFinderState, Question } from '../types'

type CompletionSummaryProps = {
  answers: BagFinderState['answers']
  questions: Question[]
  onBack: () => void
  onRestart: () => void
}

export function CompletionSummary({
  answers,
  questions,
  onBack,
  onRestart,
}: CompletionSummaryProps) {
  return (
    <div className="completion-summary" tabIndex={-1}>
      <p className="completion-summary__intro" aria-live="polite">
        Your answers are ready for recommendations. Recommendation results are
        intentionally not implemented yet.
      </p>

      <dl className="answer-summary">
        {questions.map((question) => {
          const answer = question.options.find(
            (option) => option.id === answers[question.id],
          )

          return (
            <div className="answer-summary__row" key={question.id}>
              <dt>{question.prompt}</dt>
              <dd>{answer?.label ?? 'Not answered'}</dd>
            </div>
          )
        })}
      </dl>

      <div className="finder-actions">
        <button
          className="finder-button finder-button--secondary"
          onClick={onBack}
          type="button"
        >
          Back
        </button>
        <button
          className="finder-button finder-button--primary"
          onClick={onRestart}
          type="button"
        >
          Start Over
        </button>
      </div>
    </div>
  )
}
