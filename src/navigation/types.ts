import { NavigationAction } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  MainTabs: undefined;
  ExpenseDetails: { expenseId: string };
  Budgets: undefined;
  BudgetDetails: { budgetId?: string };
  PaymentMethods: undefined;
  Assistant: undefined;
};

export type OnboardingStackParamList = {
  Splash: undefined;
  OnboardingOne: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  OTPVerification: undefined;
};
export type BottomTabParamList = {
  Dashboard: undefined;
  AddExpense: undefined;
  Expenses: undefined;
  Insights: undefined;
  Profile: undefined;
};
