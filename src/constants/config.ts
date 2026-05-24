export const config = {
  api: {
    baseUrl: 'https://api.example.com/v1',
    timeoutMs: 15000,
    defaultHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  query: {
    retry: 1,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    mutationsRetry: false,
  },
  storageKeys: {
    authToken: 'auth_token',
  },
};
