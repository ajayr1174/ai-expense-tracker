import { useQuery } from '@tanstack/react-query';
import {
  getCategoryInsights,
  getInsightOverview,
} from '@/services/insights.service';
import { InsightOverview } from '@/api/types';
import { queryKeys } from '@/hooks/queryKeys';

export const useInsightOverview = () =>
  useQuery<InsightOverview, Error>({
    queryKey: queryKeys.insights.overview,
    queryFn: getInsightOverview,
  });

export const useCategoryInsights = () =>
  useQuery<InsightOverview[], Error>({
    queryKey: queryKeys.insights.categories,
    queryFn: getCategoryInsights,
  });
