import { useMemo } from 'react';
import { CompletionSummary } from './components/CompletionSummary';
import { FinderProgress } from './components/FinderProgress';
import { QuestionStep } from './components/QuestionStep';
import { bagFinderQuestions } from './questions';
import { getBagRecommendation } from './recommendations';
import { useBagFinderState } from './useBagFinderState';
import './bag-finder.css';

export function BagFinder() {
  const {
    state,
    currentQuestion,
    selectedAnswerId,
    answeredCount,
    selectAnswer,
    goNext,
    goBack,
    restart,
  } = useBagFinderState(bagFinderQuestions);
  const recommendations = useMemo(
    () => (state.isComplete ? getBagRecommendation(state.answers) : undefined),
    [state.answers, state.isComplete],
  );

  return (
    <div className="bag-finder-app">
      <header className="bag-finder-site-header" aria-label="BAGGU Bag Size Finder">
        <span>BAGGU Bag Finder</span>
      </header>

      <div className="bag-finder-marquee" aria-label="Find your bag size">
        <div className="bag-finder-marquee__track" aria-hidden="true">
          {Array.from({ length: 2 }, (_, groupIndex) => (
            <div className="bag-finder-marquee__group" key={groupIndex}>
              {Array.from({ length: 6 }, (_, itemIndex) => (
                <span className="bag-finder-marquee__item" key={itemIndex}>
                  <svg className="bag-finder-marquee__icon" viewBox="0 0 24 24" focusable="false">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="8.5" cy="9.5" r="1.4" />
                    <circle cx="15.5" cy="9.5" r="1.4" />
                    <path d="M7.5 14.2c1.2 2 2.7 3 4.5 3s3.3-1 4.5-3" />
                  </svg>
                  Find your perfect baggu bag.
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main className="bag-finder-shell">
        <header className="bag-finder-header">
          <p className="bag-finder-eyebrow">Compare everyday bags</p>
          <h1>Find the BAGGU bag and size for what you carry</h1>
          <p>
            Answer a few capacity questions, then compare the recommended size against other
            confirmed BAGGU options.
          </p>
        </header>

        <section className="bag-finder-panel" aria-labelledby="bag-finder-title">
          <div className="bag-finder-panel__topline">
            <h2 id="bag-finder-title">
              {/*{state.isComplete ? 'Recommended size' : 'Choose what fits best'}*/}
              
            </h2>
            <FinderProgress
              currentQuestionIndex={state.currentQuestionIndex}
              answeredCount={answeredCount}
              totalQuestions={bagFinderQuestions.length}
              isComplete={state.isComplete}
            />
          </div>

          {state.isComplete ? (
            <CompletionSummary
              answers={state.answers}
              questions={bagFinderQuestions}
              recommendations={recommendations}
              onBack={goBack}
              onRestart={restart}
            />
          ) : (
            <QuestionStep
              question={currentQuestion}
              questionIndex={state.currentQuestionIndex}
              totalQuestions={bagFinderQuestions.length}
              selectedAnswerId={selectedAnswerId}
              onSelectAnswer={selectAnswer}
              onBack={goBack}
              onNext={goNext}
            />
          )}
        </section>
      </main>
    </div>
  );
}
