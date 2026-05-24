export const routes = {
  root: {
    onboarding: 'Onboarding' as const,
    auth: 'Auth' as const,
    mainTabs: 'MainTabs' as const,
    expenseDetails: 'ExpenseDetails' as const,
    budgets: 'Budgets' as const,
    budgetDetails: 'BudgetDetails' as const,
    paymentMethods: 'PaymentMethods' as const,
    assistant: 'Assistant' as const,
  },
  auth: {
    login: 'Login' as const,
    signup: 'Signup' as const,
    forgotPassword: 'ForgotPassword' as const,
    otpVerification: 'OTPVerification' as const,
  },
  tabs: {
    dashboard: 'Dashboard' as const,
    addExpense: 'AddExpense' as const,
    expenses: 'Expenses' as const,
    insights: 'Insights' as const,
    profile: 'Profile' as const,
  },
};

export type Routes = typeof routes;
