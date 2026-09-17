export const serviceKeys = ['seo', 'web', 'visual', 'social'];

export const quizBlueprint = [
  {
    "id": "goal",
    "answers": {
      "visibility": {
        "seo": 6,
        "web": 2
      },
      "clarity": {
        "web": 6,
        "visual": 2
      },
      "recognition": {
        "visual": 6
      },
      "publishing": {
        "social": 6
      }
    }
  },
  {
    "id": "foundation",
    "answers": {
      "fragile": {
        "web": 4
      },
      "unclear": {
        "web": 3,
        "visual": 1
      },
      "stable": {
        "seo": 1,
        "visual": 1,
        "social": 1
      },
      "unknown": {
        "web": 2,
        "seo": 1,
        "visual": 1,
        "social": 1
      }
    }
  },
  {
    "id": "discovery",
    "answers": {
      "google": {
        "seo": 4,
        "web": 1
      },
      "social": {
        "social": 4
      },
      "referral": {
        "visual": 3,
        "web": 2
      },
      "mixed": {
        "seo": 1,
        "web": 1,
        "visual": 1,
        "social": 1
      }
    }
  },
  {
    "id": "capacity",
    "answers": {
      "managed": {
        "seo": 1,
        "social": 3
      },
      "direction": {
        "visual": 3,
        "seo": 1
      },
      "development": {
        "web": 4
      },
      "focused": {
        "seo": 1,
        "web": 1,
        "visual": 1,
        "social": 1
      }
    }
  },
  {
    "id": "outcome",
    "answers": {
      "pipeline": {
        "seo": 5,
        "web": 1
      },
      "recognition": {
        "visual": 5,
        "social": 1
      },
      "conversion": {
        "web": 5,
        "visual": 1
      },
      "cadence": {
        "social": 5,
        "visual": 1
      }
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
