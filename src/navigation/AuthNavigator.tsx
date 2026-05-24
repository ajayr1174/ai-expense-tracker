import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@/screens/auth/LoginScreen';

import SignupScreen from '@/screens/auth/SignupScreen';

import ForgotPasswordScreen from '@/screens/auth/ForgotPasswordScreen';

import OTPVerificationScreen from '@/screens/auth/OTPVerificationScreen';
import { AuthStackParamList } from './types';
import { routes } from '@/constants/routes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={routes.auth.login}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name={routes.auth.login} component={LoginScreen} />
      <Stack.Screen name={routes.auth.signup} component={SignupScreen} />
      <Stack.Screen
        name={routes.auth.forgotPassword}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={routes.auth.otpVerification}
        component={OTPVerificationScreen}
      />
    </Stack.Navigator>
  );
}
