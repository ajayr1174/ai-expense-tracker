export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Expense {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  description: string;
  transactionId?: string;
}

export interface NewExpensePayload {
  merchant?: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  description: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: string;
  notifyWhenPercent: number;
}

export interface PaymentMethod {
  id: string;
  type: string;
  label: string;
  last4?: string;
  isDefault: boolean;
}

export interface InsightOverview {
  totalSpend: number;
  monthlyChange: number;
  topCategory: string;
}

export interface AiRequest {
  text: string;
}

export interface AiResponse {
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  summary: string;
}
