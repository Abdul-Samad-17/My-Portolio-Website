import test from "node:test";
import assert from "node:assert/strict";

import { getCachedChipAnswer } from "../src/lib/cached-answers.ts";
import { chatSuggestions } from "../src/data/portfolio.ts";

test("every predefined suggestion chip in chatSuggestions resolves to a cached answer", () => {
  for (const suggestion of chatSuggestions) {
    const cached = getCachedChipAnswer(suggestion);
    assert.ok(
      cached !== null,
      `Suggestion chip "${suggestion}" must resolve to a pre-written cached answer.`
    );
    assert.ok(cached.answer.length > 50, `Cached answer for "${suggestion}" must be substantive.`);
    assert.ok(Array.isArray(cached.suggestions), `Cached suggestions for "${suggestion}" must be an array.`);
    assert.ok(cached.suggestions.length > 0, `Cached suggestions for "${suggestion}" must have follow-ups.`);
  }
});

test("common visitor inquiries resolve to grounded cached answers", () => {
  const commonQueries = [
    "What is Abdul's background in Applied AI?",
    "How does Abdul approach system evaluation?",
    "Tell me about Example System B and agent tools",
    "Walk me through a complex architectural problem Abdul solved",
    "What technologies does Abdul work with most?",
    "What is Abdul Samad's educational background?",
    "Which project should I open first?",
    "Could you share your LinkedIn?",
  ];

  for (const query of commonQueries) {
    const cached = getCachedChipAnswer(query);
    assert.ok(cached !== null, `Expected cached answer for "${query}"`);
  }
});

test("unknown or novel queries return null to allow normal LLM processing", () => {
  assert.equal(getCachedChipAnswer("How do I bake sourdough bread?"), null);
  assert.equal(getCachedChipAnswer("Tell me a random joke"), null);
});
