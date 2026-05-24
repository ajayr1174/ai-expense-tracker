import apiClient from '@/api/client';
import { Endpoints } from '@/api/endpoints';
import { InsightOverview } from '@/api/types';

export const getInsightOverview = async (): Promise<InsightOverview> => {
  const response = await apiClient.get<InsightOverview>(
    Endpoints.insights.overview,
  );
  return response.data;
};

export const getCategoryInsights = async (): Promise<InsightOverview[]> => {
  const response = await apiClient.get<InsightOverview[]>(
    Endpoints.insights.categories,
  );
  return response.data;
};
