import apiClient from '@/api/client';
import { Endpoints } from '@/api/endpoints';
import { Expense, NewExpensePayload } from '@/api/types';

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await apiClient.get<Expense[]>(Endpoints.expenses.list);
  return response.data;
};

export const getExpense = async (id: string): Promise<Expense> => {
  const response = await apiClient.get<Expense>(Endpoints.expenses.detail(id));
  return response.data;
};

export const createExpense = async (
  payload: NewExpensePayload,
): Promise<Expense> => {
  const response = await apiClient.post<Expense>(
    Endpoints.expenses.create,
    payload,
  );
  return response.data;
};

export const updateExpense = async (
  id: string,
  payload: Partial<NewExpensePayload>,
): Promise<Expense> => {
  const response = await apiClient.put<Expense>(
    Endpoints.expenses.update(id),
    payload,
  );
  return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await apiClient.delete(Endpoints.expenses.delete(id));
};
