export const serviceKeys = ['seo', 'web'];

export const quizBlueprint = [
  {
    id: 'goal',
    answers: {
      visibility: { seo: 4, web: 0 },
      clarity: { seo: 1, web: 4 },
      ai: { seo: 4, web: 1 },
      publishing: { seo: 3, web: 1 }
    }
  },
  {
    id: 'foundation',
    answers: {
      fragile: { seo: 0, web: 4 },
      unclear: { seo: 1, web: 3 },
      stable: { seo: 2, web: 1 },
      unknown: { seo: 1, web: 3 }
    }
  },
  {
    id: 'discovery',
    answers: {
      google: { seo: 4, web: 0 },
      answers: { seo: 4, web: 1 },
      referral: { seo: 2, web: 2 },
      mixed: { seo: 2, web: 2 }
    }
  },
  {
    id: 'capacity',
    answers: {
      managed: { seo: 3, web: 1 },
      direction: { seo: 3, web: 1 },
      development: { seo: 1, web: 4 },
      focused: { seo: 2, web: 2 }
    }
  },
  {
    id: 'outcome',
    answers: {
      pipeline: { seo: 4, web: 1 },
      referenced: { seo: 4, web: 1 },
      conversion: { seo: 1, web: 4 },
      cadence: { seo: 3, web: 1 }
    }
  }
];

const order = new Map(serviceKeys.map((key, index) => [key, index]));

export function recommendServices(answers) {
  const scores = Object.fromEntries(serviceKeys.map((key) => [key, 0]));

  for (const question of quizBlueprint) {
    const answerId = answers[question.id];
    const weights = question.answers[answerId];
    if (!weights) {
      throw new Error(`Missing or invalid answer for ${question.id}`);
    }

    for (const key of serviceKeys) {
      scores[key] += weights[key] ?? 0;
    }
  }

  const ranked = [...serviceKeys].sort((a, b) => {
    const scoreDifference = scores[b] - scores[a];
    return scoreDifference || order.get(a) - order.get(b);
  });

  const primary = ranked[0];
  const supporting = ranked
    .slice(1)
    .filter((key) => scores[key] >= 4 && scores[key] >= scores[primary] - 2)
    .slice(0, 1);

  return {
    primary,
    supporting,
    scores,
    ranked
  };
}
