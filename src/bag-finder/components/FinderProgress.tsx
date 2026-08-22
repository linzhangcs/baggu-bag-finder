type FinderProgressProps = {
  currentQuestionIndex: number;
  answeredCount: number;
  totalQuestions: number;
  isComplete: boolean;
};

export function FinderProgress({
  currentQuestionIndex,
  answeredCount,
  totalQuestions,
  isComplete,
}: FinderProgressProps) {
  const currentStep = isComplete
    ? totalQuestions
    : Math.min(currentQuestionIndex + 1, totalQuestions);

  return (
    <div className="finder-progress" aria-label="Bag Size Finder progress">
      <span>
        Step {currentStep} of {totalQuestions}
      </span>
      <span>{answeredCount} answered</span>
    </div>
  );
}
