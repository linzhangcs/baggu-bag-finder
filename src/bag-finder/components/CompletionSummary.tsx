import type {
  BagFinderState,
  BagRecommendationItem,
  BagRecommendationSet,
  Question,
} from '../types';

type CompletionSummaryProps = {
  answers: BagFinderState['answers'];
  questions: Question[];
  recommendations?: BagRecommendationSet;
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

  const comparisonItems =
    recommendations.eligibleOptions.length > 0
      ? recommendations.eligibleOptions
      : recommendations.nearMatches;

  return (
    <div className="completion-summary" aria-live="polite" tabIndex={-1}>
      <div className="completion-summary__intro">
        <p className="bag-finder-eyebrow">Recommendation</p>
        {recommendations.primary ? (
          <>
            <h3>
              Start with {recommendations.primary.product.canonicalName},{' '}
              {recommendations.primary.product.sizeLabel}
            </h3>
            <p>
              This option is the smallest confirmed match that fits your required items and lines up
              with how much room you said you want.
            </p>
          </>
        ) : (
          <>
            <h3>No exact confirmed match</h3>
            <p>
              BAGGU data does not confirm one product that meets every selected requirement. The
              closest matches below show which confirmed facts are available.
            </p>
          </>
        )}
      </div>

      {recommendations.primary ? (
        <RecommendationCard
          item={recommendations.primary}
          rankLabel="Recommended bag + size"
          variant="primary"
        />
      ) : (
        <UnmetRequirements recommendations={recommendations} />
      )}

      {recommendations.alternatives.length > 0 ? (
        <section className="recommendation-section" aria-labelledby="alternative-results-title">
          <div className="recommendation-section__header">
            <p className="bag-finder-eyebrow">Alternatives</p>
            <h3 id="alternative-results-title">Other confirmed fits</h3>
          </div>

          <ul className="recommendation-list">
            {recommendations.alternatives.map((alternative) => (
              <li key={alternative.product.id}>
                <RecommendationCard
                  item={alternative}
                  rankLabel="Alternative"
                  variant="alternative"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="comparison-section" aria-labelledby="comparison-results-title">
        <div className="recommendation-section__header">
          <p className="bag-finder-eyebrow">Compare</p>
          <h3 id="comparison-results-title">
            {recommendations.primary ? 'Eligible options' : 'Closest matches'}
          </h3>
        </div>

        <ul className="comparison-list">
          {comparisonItems.map((item) => (
            <li key={item.product.id}>
              <ComparisonCard
                item={item}
                isRecommended={item.product.id === recommendations.primary?.product.id}
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
  item: BagRecommendationItem;
  rankLabel: string;
  variant: 'primary' | 'alternative';
};

function RecommendationCard({ item, rankLabel, variant }: RecommendationCardProps) {
  const { product } = item;
  const titleId = `${product.id}-title`;

  return (
    <article className="recommendation-card" data-variant={variant} aria-labelledby={titleId}>
      <ProductMedia item={item} />

      <div className="recommendation-card__content">
        <div className="recommendation-card__topline">
          <p className="recommendation-card__rank">{rankLabel}</p>
          <p className="recommendation-card__price">{product.sizeLabel}</p>
        </div>

        <div className="recommendation-card__heading">
          <h3 id={titleId}>{product.canonicalName}</h3>
          {product.intendedUse ? <p>{product.intendedUse}</p> : null}
        </div>

        <ProductFacts item={item} />

        {item.reasons.length > 0 ? (
          <section
            className="recommendation-card__reasons"
            aria-label={`Why ${product.canonicalName} matched`}
          >
            <h4>Why it matched</h4>
            <ul>
              {item.reasons.map((reason) => (
                <li key={`${product.id}-${reason.label}`}>
                  <span>{reason.label}</span>
                  {reason.detail}
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

        {product.productUrl ? (
          <a
            className="recommendation-card__link"
            href={product.productUrl}
            target="_blank"
            rel="noreferrer"
          >
            View product
          </a>
        ) : null}
      </div>
    </article>
  );
}

type ComparisonCardProps = {
  item: BagRecommendationItem;
  isRecommended: boolean;
};

function ComparisonCard({ item, isRecommended }: ComparisonCardProps) {
  const { product } = item;

  return (
    <article className="comparison-card" data-recommended={isRecommended ? 'true' : 'false'}>
      <div>
        <p className="recommendation-card__rank">
          {isRecommended ? 'Recommended' : product.productFamily}
        </p>
        <h4>{product.canonicalName}</h4>
        <p>{product.sizeLabel}</p>
      </div>
      <ProductFacts item={item} compact />
      {product.productUrl ? (
        <a
          className="comparison-card__link"
          href={product.productUrl}
          target="_blank"
          rel="noreferrer"
        >
          View product
        </a>
      ) : null}
    </article>
  );
}

function ProductMedia({ item }: { item: BagRecommendationItem }) {
  const { product } = item;

  return (
    <div className="recommendation-card__media">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.imageAlt ?? product.canonicalName}
          loading="lazy"
        />
      ) : (
        <div className="recommendation-card__media-placeholder" aria-hidden="true">
          {product.sizeLabel}
        </div>
      )}
    </div>
  );
}

function ProductFacts({
  item,
  compact = false,
}: {
  item: BagRecommendationItem;
  compact?: boolean;
}) {
  const { product } = item;
  const confirmedFits = getConfirmedFits(item);

  return (
    <dl
      className={
        compact
          ? 'recommendation-card__details comparison-card__details'
          : 'recommendation-card__details'
      }
    >
      <div>
        <dt>Dimensions</dt>
        <dd>{product.dimensions?.raw ?? 'Unknown'}</dd>
      </div>
      <div>
        <dt>Carry level</dt>
        <dd>{product.attributes.carryLevel}</dd>
      </div>
      {product.strapOrHandleLength || product.strapDrop ? (
        <div>
          <dt>Strap / handle</dt>
          <dd>{product.strapOrHandleLength ?? product.strapDrop}</dd>
        </div>
      ) : null}
      {product.capacityOrVolume ? (
        <div>
          <dt>Capacity</dt>
          <dd>{product.capacityOrVolume}</dd>
        </div>
      ) : null}
      {confirmedFits.length > 0 ? (
        <div>
          <dt>Confirmed fit</dt>
          <dd>{confirmedFits.join(', ')}</dd>
        </div>
      ) : null}
      {product.pocketInformation && !compact ? (
        <div>
          <dt>Organization</dt>
          <dd>{product.pocketInformation.join(', ')}</dd>
        </div>
      ) : null}
    </dl>
  );
}

function getConfirmedFits(item: BagRecommendationItem) {
  const { product } = item;
  const fits: string[] = [];

  if (product.attributes.fitsPhone === true) {
    fits.push('phone');
  }

  if (product.attributes.fitsWaterBottle === true) {
    fits.push('water bottle');
  }

  if (product.attributes.fitsTablet === true) {
    fits.push('tablet sleeve');
  }

  if (product.attributes.fitsLaptop === true) {
    fits.push(product.attributes.confirmedLaptopSize ?? 'laptop');
  }

  if (product.attributes.goodForGroceries === true) {
    fits.push('groceries');
  }

  if (product.attributes.goodForTravel === true) {
    fits.push('travel items');
  }

  return fits;
}

function UnmetRequirements({ recommendations }: { recommendations: BagRecommendationSet }) {
  if (recommendations.unmetRequirements.length === 0) {
    return (
      <p className="no-match-note">
        The selected combination is not confirmed by one BAGGU product in the current data.
      </p>
    );
  }

  return (
    <div className="no-match-note">
      <p>The current BAGGU data does not confirm these required fits together:</p>
      <ul>
        {recommendations.unmetRequirements.map((requirement) => (
          <li key={requirement.requirement}>{requirement.label}</li>
        ))}
      </ul>
    </div>
  );
}
