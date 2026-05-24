import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createBudget,
  deleteBudget,
  getBudget,
  getBudgets,
  updateBudget,
} from '@/services/budget.service';
import { Budget } from '@/api/types';
import { queryKeys } from '@/hooks/queryKeys';

export const useBudgets = () =>
  useQuery<Budget[], Error>({
    queryKey: queryKeys.budgets.all,
    queryFn: getBudgets,
  });

export const useBudget = (budgetId: string) =>
  useQuery<Budget, Error>({
    queryKey: queryKeys.budgets.detail(budgetId),
    queryFn: () => getBudget(budgetId),
    enabled: Boolean(budgetId),
  });

export const useCreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation<Budget, Error, Omit<Budget, 'id'>>({
    mutationFn: createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all });
    },
  });
};

export type UpdateBudgetVariables = {
  id: string;
  data: Partial<Omit<Budget, 'id'>>;
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation<Budget, Error, UpdateBudgetVariables>({
    mutationFn: ({ id, data }) => updateBudget(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.budgets.detail(variables.id),
      });
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteBudget,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets.detail(id) });
    },
  });
};
