import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { bagSizeData, type ProductSizeFact } from '../src/data/bag-size-data.ts';
import {
  getBagRecommendation,
  getEligibleBags,
  rankBagRecommendations,
} from '../src/bag-finder/recommendations.ts';
import type { BagFinderProfile, BagFinderState } from '../src/bag-finder/types.ts';

function recommendationFor(answers: BagFinderState['answers']) {
  return getBagRecommendation(answers);
}

describe('bag size recommendations', () => {
  it('recommends a minimal bag for minimal carry', () => {
    const result = recommendationFor({
      dailyCarry: 'essentials',
      largestItem: 'small',
      extraRoom: 'just-enough',
      primaryUse: 'everyday',
    });

    assert.equal(result.primary?.product.id, 'small-nylon-bowler-bag');
  });

  it('recommends an everyday bag with confirmed water bottle fit', () => {
    const result = recommendationFor({
      dailyCarry: 'water-bottle',
      largestItem: 'water-bottle',
      extraRoom: 'little-extra',
      primaryUse: 'everyday',
    });

    assert.equal(result.primary?.product.id, 'nylon-loaf-bag');
    assert.equal(result.primary.product.attributes.fitsWaterBottle, true);
  });

  it('recommends a confirmed 13/14 inch laptop option', () => {
    const result = recommendationFor({
      dailyCarry: 'laptop',
      largestItem: 'laptop-13',
      extraRoom: 'just-enough',
      primaryUse: 'work-school',
    });

    assert.equal(result.primary?.product.id, 'everyday-cloud-bag');
    assert.match(result.primary.product.attributes.confirmedLaptopSize ?? '', /13\/14/);
  });

  it('recommends a confirmed high-capacity grocery option', () => {
    const result = recommendationFor({
      dailyCarry: 'groceries-bulky',
      largestItem: 'groceries',
      extraRoom: 'maximum',
      primaryUse: 'groceries',
    });

    assert.equal(result.primary?.product.id, 'standard-baggu');
    assert.equal(result.primary.product.attributes.goodForGroceries, true);
  });

  it('keeps a water bottle recommendation compact when extra room is minimal', () => {
    const result = recommendationFor({
      dailyCarry: 'water-bottle',
      largestItem: 'water-bottle',
      extraRoom: 'just-enough',
      primaryUse: 'everyday',
    });

    assert.equal(result.primary?.product.id, 'small-nylon-crescent-bag');
  });

  it('prefers more capacity when the shopper asks for flexibility', () => {
    const result = recommendationFor({
      dailyCarry: 'water-bottle',
      largestItem: 'water-bottle',
      extraRoom: 'maximum',
      primaryUse: 'everyday',
    });

    assert.equal(result.primary?.product.id, 'medium-nylon-bowler-bag');
  });

  it('excludes products with unknown required fit', () => {
    const profile: BagFinderProfile = {
      requiredFits: ['waterBottle'],
      targetCarryLevel: 'everyday',
      extraRoomPreference: 'some',
      primaryUse: 'everyday',
      selectedAnswerLabels: [],
    };

    const eligible = getEligibleBags(profile);

    assert.equal(
      eligible.some((product) => product.id === 'small-nylon-bowler-bag'),
      false,
    );
  });

  it('uses stable ordering to break equal ranking', () => {
    const profile: BagFinderProfile = {
      requiredFits: ['phone'],
      targetCarryLevel: 'light',
      extraRoomPreference: 'minimal',
      primaryUse: 'everyday',
      selectedAnswerLabels: [],
    };

    const ranked = rankBagRecommendations(
      profile,
      bagSizeData.filter((product) =>
        ['nylon-bowler-bag', 'small-nylon-crescent-bag'].includes(product.id),
      ),
    );

    assert.equal(ranked[0].product.id, 'nylon-bowler-bag');
  });

  it('does not force a primary recommendation when no product meets the full combination', () => {
    const result = recommendationFor({
      dailyCarry: 'laptop',
      largestItem: 'groceries',
      extraRoom: 'maximum',
      primaryUse: 'groceries',
    });

    assert.equal(result.primary, undefined);
    assert.ok(result.nearMatches.length > 0);
  });

  it('does not treat unknown product attributes as confirmed support', () => {
    const profile: BagFinderProfile = {
      requiredFits: ['tablet'],
      targetCarryLevel: 'everyday',
      extraRoomPreference: 'some',
      primaryUse: 'workSchool',
      selectedAnswerLabels: [],
    };
    const productWithUnknownTablet = makeProductWithUnknownTablet();

    const eligible = getEligibleBags(profile, [productWithUnknownTablet]);

    assert.deepEqual(eligible, []);
  });
});

function makeProductWithUnknownTablet(): ProductSizeFact {
  return {
    id: 'unknown-tablet-test-product',
    canonicalName: 'Unknown Tablet Test Product',
    productFamily: 'Test',
    sizeLabel: 'Test',
    sourceUrl: 'https://example.com',
    whatItFits: ['phone'],
    relatedSizeIds: [],
    attributes: {
      carryLevel: 'everyday',
      fitsPhone: true,
      fitsWaterBottle: 'unknown',
      fitsBook: 'unknown',
      fitsTablet: 'unknown',
      fitsLaptop: 'unknown',
      fitsExtraLayer: 'unknown',
      goodForTravel: 'unknown',
      goodForGroceries: 'unknown',
    },
  };
}
