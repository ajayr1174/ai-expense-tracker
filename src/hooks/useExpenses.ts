import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from '@/services/expense.service';
import { Expense, NewExpensePayload } from '@/api/types';
import { queryKeys } from '@/hooks/queryKeys';

export const useExpenses = () =>
  useQuery<Expense[], Error>({
    queryKey: queryKeys.expenses.all,
    queryFn: getExpenses,
  });

export const useExpense = (expenseId: string) =>
  useQuery<Expense, Error>({
    queryKey: queryKeys.expenses.detail(expenseId),
    queryFn: () => getExpense(expenseId),
    enabled: Boolean(expenseId),
  });

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<Expense, Error, NewExpensePayload>({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
    },
  });
};

export type UpdateExpenseVariables = {
  id: string;
  data: Partial<NewExpensePayload>;
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<Expense, Error, UpdateExpenseVariables>({
    mutationFn: ({ id, data }) => updateExpense(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.detail(variables.id),
      });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteExpense,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.detail(id),
      });
    },
  });
};
