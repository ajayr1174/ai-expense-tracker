import apiClient from '@/api/client';
import { Endpoints } from '@/api/endpoints';
import { AiRequest, AiResponse } from '@/api/types';

export const analyzeExpense = async (
  payload: AiRequest,
): Promise<AiResponse> => {
  const response = await apiClient.post<AiResponse>(
    Endpoints.ai.analyze,
    payload,
  );
  return response.data;
};
