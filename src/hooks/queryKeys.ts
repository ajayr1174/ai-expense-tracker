export const queryKeys = {
  auth: {
    user: ['auth', 'user'] as const,
  },
  expenses: {
    all: ['expenses'] as const,
    detail: (id: string) => ['expenses', id] as const,
  },
  budgets: {
    all: ['budgets'] as const,
    detail: (id: string) => ['budgets', id] as const,
  },
  insights: {
    overview: ['insights', 'overview'] as const,
    categories: ['insights', 'categories'] as const,
  },
  paymentMethods: {
    all: ['paymentMethods'] as const,
  },
  ai: {
    analyze: ['ai', 'analyze'] as const,
  },
};
