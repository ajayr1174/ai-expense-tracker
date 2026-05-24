import apiClient from '@/api/client';
import { Endpoints } from '@/api/endpoints';
import { Budget } from '@/api/types';

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await apiClient.get<Budget[]>(Endpoints.budgets.list);
  return response.data;
};

export const getBudget = async (id: string): Promise<Budget> => {
  const response = await apiClient.get<Budget>(Endpoints.budgets.detail(id));
  return response.data;
};

export const createBudget = async (
  budget: Omit<Budget, 'id'>,
): Promise<Budget> => {
  const response = await apiClient.post<Budget>(
    Endpoints.budgets.create,
    budget,
  );
  return response.data;
};

export const updateBudget = async (
  id: string,
  budget: Partial<Omit<Budget, 'id'>>,
): Promise<Budget> => {
  const response = await apiClient.put<Budget>(
    Endpoints.budgets.update(id),
    budget,
  );
  return response.data;
};

export const deleteBudget = async (id: string): Promise<void> => {
  await apiClient.delete(Endpoints.budgets.delete(id));
};
