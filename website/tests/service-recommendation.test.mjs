import assert from 'node:assert/strict';
import test from 'node:test';
import { quizBlueprint, recommendServices, serviceKeys } from '../src/scripts/service-recommendation.mjs';

const cases = {
  seo: {
    goal: 'visibility',
    foundation: 'stable',
    discovery: 'google',
    capacity: 'focused',
    outcome: 'pipeline'
  },
  visual: { goal:'recognition', foundation:'stable', discovery:'referral', capacity:'direction', outcome:'recognition' },
  social: { goal:'publishing', foundation:'stable', discovery:'social', capacity:'managed', outcome:'cadence' },
  web: {
    goal: 'clarity',
    foundation: 'fragile',
    discovery: 'referral',
    capacity: 'development',
    outcome: 'conversion'
  }
};

for (const [expected, answers] of Object.entries(cases)) {
  test(`returns ${expected} for a strong ${expected} scenario`, () => {
    assert.equal(recommendServices(answers).primary, expected);
  });
}

test('validates all 1,024 answer combinations', () => {
  const answerSets = quizBlueprint.map((question) => Object.keys(question.answers));
  let count = 0;

  for (const goal of answerSets[0]) {
    for (const foundation of answerSets[1]) {
      for (const discovery of answerSets[2]) {
        for (const capacity of answerSets[3]) {
          for (const outcome of answerSets[4]) {
            const result = recommendServices({ goal, foundation, discovery, capacity, outcome });
            assert.ok(serviceKeys.includes(result.primary));
            assert.ok(result.supporting.length <= 1);
            assert.equal(new Set(result.ranked).size, serviceKeys.length);
            assert.ok(result.ranked.every((key, index, ranked) => index === 0 || result.scores[ranked[index - 1]] >= result.scores[key]));
            count += 1;
          }
        }
      }
    }
  }

  assert.equal(count, 1024);
});

test('rejects incomplete scenarios', () => {
  assert.throws(() => recommendServices({ goal: 'visibility' }), /Missing or invalid answer/);
});

test('keeps a complementary discipline when needs overlap', () => {
  const result = recommendServices({ goal:'visibility', foundation:'fragile', discovery:'mixed', capacity:'development', outcome:'pipeline' });
  assert.equal(result.primary, 'seo');
  assert.deepEqual(result.supporting, ['web']);
});
