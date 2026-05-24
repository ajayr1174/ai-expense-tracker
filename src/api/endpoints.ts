export const Endpoints = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    forgotPassword: '/auth/forgot-password',
    verifyOtp: '/auth/verify-otp',
  },
  expenses: {
    list: '/expenses',
    detail: (id: string) => `/expenses/${id}`,
    create: '/expenses',
    update: (id: string) => `/expenses/${id}`,
    delete: (id: string) => `/expenses/${id}`,
  },
  budgets: {
    list: '/budgets',
    detail: (id: string) => `/budgets/${id}`,
    create: '/budgets',
    update: (id: string) => `/budgets/${id}`,
    delete: (id: string) => `/budgets/${id}`,
  },
  paymentMethods: {
    list: '/payment-methods',
    create: '/payment-methods',
    delete: (id: string) => `/payment-methods/${id}`,
  },
  insights: {
    overview: '/insights/overview',
    categories: '/insights/categories',
  },
  ai: {
    analyze: '/ai/expense',
  },
};
