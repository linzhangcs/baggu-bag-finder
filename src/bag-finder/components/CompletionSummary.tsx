import type { BagFinderState, Question, RecommendationItem, RecommendationSet } from '../types';

type CompletionSummaryProps = {
  answers: BagFinderState['answers'];
  questions: Question[];
  recommendations?: RecommendationSet;
  onBack: () => void;
  onRestart: () => void;
};

export function CompletionSummary({
  answers,
  questions,
  recommendations,
  onBack,
  onRestart,
}: CompletionSummaryProps) {
  if (!recommendations) {
    return null;
  }

  return (
    <div className="completion-summary" aria-live="polite" tabIndex={-1}>
      <div className="completion-summary__intro">
        <p className="bag-finder-eyebrow">Recommendations</p>
        <h3>Start with {recommendations.primary.candidate.name}</h3>
        <p>
          These picks are scored from your answers and use static BAGGU bag data for this prototype.
        </p>
      </div>

      <RecommendationCard item={recommendations.primary} rankLabel="Best match" variant="primary" />

      <section className="recommendation-section" aria-labelledby="alternative-results-title">
        <div className="recommendation-section__header">
          <p className="bag-finder-eyebrow">Alternatives</p>
          <h3 id="alternative-results-title">Also worth a look</h3>
        </div>

        <ul className="recommendation-list">
          {recommendations.alternatives.map((alternative, index) => (
            <li key={alternative.candidate.id}>
              <RecommendationCard
                item={alternative}
                rankLabel={`Option ${index + 2}`}
                variant="alternative"
              />
            </li>
          ))}
        </ul>
      </section>

      <details className="answer-summary-disclosure">
        <summary>Your answers</summary>
        <dl className="answer-summary">
          {questions.map((question) => {
            const answer = question.options.find((option) => option.id === answers[question.id]);

            return (
              <div className="answer-summary__row" key={question.id}>
                <dt>{question.prompt}</dt>
                <dd>{answer?.label ?? 'Not answered'}</dd>
              </div>
            );
          })}
        </dl>
      </details>

      <div className="finder-actions">
        <button className="finder-button finder-button--secondary" onClick={onBack} type="button">
          Back
        </button>
        <button className="finder-button finder-button--primary" onClick={onRestart} type="button">
          Start Over
        </button>
      </div>
    </div>
  );
}

type RecommendationCardProps = {
  item: RecommendationItem;
  rankLabel: string;
  variant: 'primary' | 'alternative';
};

function RecommendationCard({ item, rankLabel, variant }: RecommendationCardProps) {
  const { candidate } = item;
  const titleId = `${candidate.id}-title`;

  return (
    <article className="recommendation-card" data-variant={variant} aria-labelledby={titleId}>
      <div className="recommendation-card__media">
        <img src={candidate.imageUrl} alt={candidate.imageAlt} loading="lazy" />
      </div>

      <div className="recommendation-card__topline">
        <p className="recommendation-card__rank">{rankLabel}</p>
        {candidate.price ? <p className="recommendation-card__price">{candidate.price}</p> : null}
      </div>

      <div className="recommendation-card__heading">
        <h3 id={titleId}>{candidate.name}</h3>
        <p>{candidate.bestFor}</p>
      </div>

      <dl className="recommendation-card__details">
        <div>
          <dt>Capacity</dt>
          <dd>{candidate.capacitySummary}</dd>
        </div>
        <div>
          <dt>Carry</dt>
          <dd>{candidate.carryStyle}</dd>
        </div>
        <div>
          <dt>Organization</dt>
          <dd>{candidate.organizationSummary}</dd>
        </div>
        {candidate.laptopFit ? (
          <div>
            <dt>Laptop</dt>
            <dd>{candidate.laptopFit}</dd>
          </div>
        ) : null}
        {candidate.variantSummary ? (
          <div>
            <dt>Variants</dt>
            <dd>{candidate.variantSummary}</dd>
          </div>
        ) : null}
      </dl>

      {item.explanations.length > 0 ? (
        <section
          className="recommendation-card__reasons"
          aria-label={`Why ${candidate.name} matched`}
        >
          <h4>Why it matched</h4>
          <ul>
            {item.explanations.map((explanation) => (
              <li key={`${candidate.id}-${explanation.answerLabel}`}>
                <span>{explanation.answerLabel}</span>
                {explanation.reason}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {item.tradeoff ? (
        <p className="recommendation-card__tradeoff">
          <span>Tradeoff</span>
          {item.tradeoff}
        </p>
      ) : null}
    </article>
  );
}
