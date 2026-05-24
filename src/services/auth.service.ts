import apiClient from '@/api/client';
import { Endpoints } from '@/api/endpoints';
import { AuthResponse, LoginPayload, SignupPayload } from '@/api/types';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    Endpoints.auth.login,
    payload,
  );
  return response.data;
};

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    Endpoints.auth.signup,
    payload,
  );
  return response.data;
};

export const requestPasswordReset = async (
  email: string,
): Promise<{ success: boolean }> => {
  const response = await apiClient.post<{ success: boolean }>(
    Endpoints.auth.forgotPassword,
    { email },
  );
  return response.data;
};

export const verifyOtp = async (
  email: string,
  otp: string,
): Promise<{ success: boolean }> => {
  const response = await apiClient.post<{ success: boolean }>(
    Endpoints.auth.verifyOtp,
    { email, otp },
  );
  return response.data;
};
