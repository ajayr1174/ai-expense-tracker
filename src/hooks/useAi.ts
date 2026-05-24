import { useMutation } from '@tanstack/react-query';
import { analyzeExpense } from '@/services/ai.service';
import { AiRequest, AiResponse } from '@/api/types';
import { queryKeys } from '@/hooks/queryKeys';

export const useAnalyzeExpense = () =>
  useMutation<AiResponse, Error, AiRequest>({
    mutationKey: queryKeys.ai.analyze,
    mutationFn: analyzeExpense,
  });
