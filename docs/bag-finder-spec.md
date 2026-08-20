# BAGGU Bag Finder Spec

## Purpose

The BAGGU Bag Finder is a guided bag-selection flow that helps shoppers choose a bag when browsing the full catalog feels too broad. It should replace part of the existing shopping experience with a short, answer-driven path that narrows the shopper from intent to a small set of recommended bags.

This spec defines the first product shape. It does not define BAGGU-specific visual rules, final product copy, product data contracts, or implementation details.

## User Goal

The shopper wants to find the right BAGGU bag for their actual use case without needing to understand every BAGGU product category first.

Success means the shopper can:

- Answer a small number of plain-language questions.
- Receive one primary recommendation and a small set of alternatives.
- Understand why each bag was recommended.
- Compare recommended bags on the attributes that affected the recommendation.
- Continue into the normal shopping path once they are ready to view details or buy.

## Current Shopping Context

BAGGU's existing bag shopping experience is category- and product-grid driven. Public BAGGU shopping surfaces currently expose bag categories such as reusable bags, totes, fanny packs, travel, pouches, cases and sleeves, backpacks, and crossbody bags. Product-list pages also rely on browsing, filtering, sorting, color variants, product cards, and product detail links.

The Bag Finder should complement that browsing model by starting from shopper intent instead of product taxonomy.

## Guided Questions

The first version should ask enough to distinguish bag families without making the flow feel like a long quiz.

Recommended question set:

1. What are you carrying most often?
   - Just the essentials.
   - Everyday items.
   - Work, school, or a laptop.
   - Groceries, errands, or bulky extras.
   - Travel or organization.

2. How do you want to carry it?
   - Crossbody or hands-free.
   - Over the shoulder.
   - In hand or as a tote.
   - Packed inside another bag.
   - No strong preference.

3. When will you use it most?
   - Daily errands.
   - Commuting.
   - Shopping.
   - Travel.
   - Going out.

4. How much structure do you want?
   - Soft and slouchy.
   - Some shape, but still casual.
   - Structured and protective.
   - Not sure.

5. What matters most after fit?
   - Compact size.
   - Maximum capacity.
   - Hands-free wear.
   - Organization.
   - Giftability or broad appeal.

Optional follow-up questions, if product data supports them:

- Do you need to fit a laptop?
- Are you shopping under a specific budget?
- Do you prefer solids, prints, or either?
- Are you looking for machine-washable materials?

## Answer Model

Each answer should map to shopper needs instead of directly mapping to a single product. Suggested need dimensions:

- Capacity: small, medium, large, oversized.
- Carry mode: crossbody, shoulder, tote, handheld, packable.
- Use case: daily, commute, shopping, travel, evening, organization.
- Structure: soft, semi-structured, protective.
- Priority: compact, capacity, hands-free, organization, giftable.
- Constraints: laptop fit, budget, material care, print or color preference.

The UI should preserve the shopper's answers so they can revise earlier choices without restarting.

## Recommendation Logic

The first implementation should use deterministic scoring rather than AI-generated recommendations.

Recommended approach:

- Maintain a curated list of candidate bag types with attributes for capacity, carry mode, use case, structure, and notable strengths.
- Convert each answer into weighted need dimensions.
- Score each candidate against the selected needs.
- Return one primary recommendation, two to three alternatives, and a short explanation for each.
- Prefer useful diversity in alternatives instead of showing near-duplicates.

Primary recommendation behavior:

- Choose the highest-scoring bag when there is a clear fit.
- If two products are close, choose the more broadly useful option as primary and present the other as an alternative.
- If answers conflict, show the best compromise and explain the tradeoff.
- If the shopper says "not sure" repeatedly, bias toward popular, flexible everyday options.

Recommendation explanations should be specific and grounded in the user's answers. Example explanation pattern:

> Recommended because you wanted hands-free carry, everyday capacity, and a soft casual shape.

## Comparison Behavior

The results view should let shoppers compare the primary recommendation against alternatives without opening multiple product detail pages.

Comparison should include:

- Bag name or bag family.
- Best for.
- Capacity summary.
- Carry style.
- Organization or pocket summary, if known.
- Laptop or device fit, if relevant and known.
- Price or price range, if product data is available.
- Available colors or variant count, if product data is available.
- Why this matched the shopper's answers.
- Key tradeoff versus the primary recommendation.

Comparison behavior:

- Highlight the primary recommendation first.
- Show alternatives in a compact comparison layout.
- Make differences easier to scan than shared traits.
- Provide clear next actions for viewing product details or restarting the finder.
- Do not hide important caveats, such as "does not fit laptop" or "best for light carry."

## Unresolved Product Decisions

- Where the Bag Finder enters the shopping experience: navigation, bags collection page, homepage module, product-list replacement, or campaign landing page.
- Whether the flow recommends bag families, specific products, or specific product variants.
- Which BAGGU products are eligible for v1 recommendations.
- Whether recommendations should include only in-stock products.
- Whether price, color, material, sustainability details, care instructions, and inventory are required ranking inputs or display-only attributes.
- Whether the guided flow should support gifts as a first-class use case.
- Whether the shopper can select multiple answers per question.
- Whether comparison includes live product data or curated static content for v1.
- Whether BAGGU wants a quiz-like interaction, a step-by-step assistant, or a filter-like guided flow.
- Final content tone, microcopy, visual design, and brand-specific interaction details.
- Analytics events and success metrics.
- Accessibility acceptance criteria beyond baseline semantic HTML, keyboard support, focus visibility, and responsive behavior.

## Initial Acceptance Criteria

- The flow can be completed in five or fewer required questions.
- The shopper receives one primary recommendation plus alternatives.
- Each result includes a reason tied to the shopper's answers.
- The shopper can compare recommended bags on decision-relevant attributes.
- The shopper can revise answers or restart.
- The flow does not require BAGGU-specific design assumptions that have not been defined.
