import type { Question, QuestionId } from '../types';

type QuestionStepProps = {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswerId?: string;
  onSelectAnswer: (questionId: QuestionId, answerId: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export function QuestionStep({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswerId,
  onSelectAnswer,
  onBack,
  onNext,
}: QuestionStepProps) {
  const questionNumber = questionIndex + 1;
  const legendId = `${question.id}-legend`;
  const hintId = `${question.id}-hint`;
  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <form
      className="question-step"
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <fieldset className="question-step__fieldset" aria-describedby={hintId}>
        <legend id={legendId}>{question.prompt}</legend>
        <p id={hintId} className="question-step__hint">
          Choose one option. Your answer is saved when you move between steps.
        </p>

        <div className="answer-list">
          {question.options.map((option) => {
            const inputId = `${question.id}-${option.id}`;
            const isSelected = selectedAnswerId === option.id;

            return (
              <label
                className="answer-option"
                data-selected={isSelected ? 'true' : 'false'}
                htmlFor={inputId}
                key={option.id}
              >
                <input
                  checked={isSelected}
                  id={inputId}
                  name={question.id}
                  onChange={() => {
                    onSelectAnswer(question.id, option.id);
                  }}
                  type="radio"
                  value={option.id}
                />
                <span>
                  {option.label}
                  {option.helperText ? (
                    <small className="answer-option__helper">{option.helperText}</small>
                  ) : null}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="finder-actions">
        <button
          className="finder-button finder-button--secondary"
          disabled={questionIndex === 0}
          onClick={onBack}
          type="button"
        >
          Back
        </button>
        <button
          className="finder-button finder-button--primary"
          disabled={!selectedAnswerId}
          type="submit"
        >
          {isLastQuestion ? 'Save Answers' : 'Next'}
        </button>
      </div>
    </form>
  );
}
