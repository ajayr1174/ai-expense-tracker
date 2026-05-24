import { useMutation } from '@tanstack/react-query';
import {
  login as loginApi,
  signup as signupApi,
  requestPasswordReset,
  verifyOtp,
} from '@/services/auth.service';
import { AuthResponse, LoginPayload, SignupPayload } from '@/api/types';
import { setAuthToken } from '@/api/client';

export const useLogin = () =>
  useMutation<AuthResponse, Error, LoginPayload>({
    mutationKey: ['auth', 'login'],
    mutationFn: loginApi,
    onSuccess: (response: AuthResponse) => {
      setAuthToken(response.token);
    },
  });

export const useSignup = () =>
  useMutation<AuthResponse, Error, SignupPayload>({
    mutationKey: ['auth', 'signup'],
    mutationFn: signupApi,
    onSuccess: (response: AuthResponse) => {
      setAuthToken(response.token);
    },
  });

export const useRequestPasswordReset = () =>
  useMutation<{ success: boolean }, Error, string>({
    mutationKey: ['auth', 'forgotPassword'],
    mutationFn: requestPasswordReset,
  });

export const useVerifyOtp = () =>
  useMutation<{ success: boolean }, Error, { email: string; otp: string }>({
    mutationKey: ['auth', 'verifyOtp'],
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyOtp(email, otp),
  });
