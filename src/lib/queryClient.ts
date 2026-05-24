import { QueryClient } from '@tanstack/react-query';
import { config } from '@/constants/config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: config.query.retry,
      staleTime: config.query.staleTime,
      refetchOnWindowFocus: config.query.refetchOnWindowFocus,
      refetchOnReconnect: config.query.refetchOnReconnect,
      refetchOnMount: config.query.refetchOnMount,
    },
    mutations: {
      retry: config.query.mutationsRetry,
    },
  },
});
