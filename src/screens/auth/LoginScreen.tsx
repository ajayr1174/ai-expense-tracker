import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  AuthStackParamList,
  BottomTabParamList,
} from '@/navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { routes } from '@/constants/routes';

type LoginNavProp = NativeStackNavigationProp<
  AuthStackParamList & BottomTabParamList,
  'Login'
>;

// ─── Icon helpers ─────────────────────────────────────────────────────────────

const EmailIcon = () => (
  <Ionicons name="mail-outline" size={18} color="#98A2B3" />
);
const LockIcon = () => (
  <Ionicons name="lock-closed-outline" size={18} color="#98A2B3" />
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateEmail = (v: string) => {
    if (!v) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email';
    return '';
  };

  const validatePassword = (v: string) => {
    if (!v) return 'Password is required';
    if (v.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleLogin = () => {
    // const eErr = validateEmail(email);
    // const pErr = validatePassword(password);
    // setEmailError(eErr);
    // setPasswordError(pErr);
    // if (eErr || pErr) return;

    // setLoading(true);
    // // TODO: replace with real auth call
    // setTimeout(() => setLoading(false), 2000);
    navigation.replace(routes.root.mainTabs as any);
  };

  return (
    <ScreenWrapper
      className="flex-1 bg-primary"
      statusBarStyle="light-content"
      statusBarColor="#7C4DFF"
    >
      {/* ── Decorative header ──────────────────────────────────────────────── */}
      <View className="bg-primary pt-14 pb-14 px-6 items-center overflow-hidden relative">
        {/* Decorative blobs – absolute offsets use non-standard px, kept inline */}
        <View
          className="absolute w-40 h-40 rounded-full bg-primary-400 opacity-40"
          style={{ top: -40, right: -40 }}
        />
        <View
          className="absolute w-36 h-36 rounded-full bg-primary-700 opacity-50"
          style={{ bottom: -50, left: -30 }}
        />

        {/* Logo */}
        <View className="w-24 h-24 rounded-full bg-white items-center justify-center shadow-purple">
          <Ionicons name="wallet-outline" size={46} color="#7C4DFF" />
        </View>

        <Text
          variant="h3"
          color="inverse"
          weight="bold"
          align="center"
          className="mt-4"
        >
          SpendWise
        </Text>
        <Text
          color="inverse"
          align="center"
          className="mt-1 text-sm opacity-75"
        >
          Smart expense tracking
        </Text>
      </View>

      {/* ── Form card ─────────────────────────────────────────────────────── */}
      <Card
        variant="flat"
        className="flex-1 rounded-t-3xl -mt-5 px-6 pt-7 pb-10"
      >
        <Text variant="h4" color="primary" weight="bold">
          Welcome back 👋
        </Text>
        <Text color="secondary" className="mt-1 mb-6 text-sm">
          Sign in to continue managing your finances
        </Text>
        <View className="gap-4">
          {/* Email */}
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={text => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            error={emailError}
            required
            leadingIcon={<EmailIcon />}
            keyboardType="email-address"
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={text => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            error={passwordError}
            required
            leadingIcon={<LockIcon />}
          />
        </View>

        {/* Forgot password */}
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.auth.forgotPassword)}
          className="mt-2 self-end"
          accessibilityRole="button"
          accessibilityLabel="Forgot password"
        >
          <Text color="primary" weight="semibold" className="text-sm">
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login button */}
        <View className="mt-6">
          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            width="full"
          />
        </View>

        {/* Divider */}
        <View className="flex-row items-center gap-3 my-6">
          <View className="flex-1 h-px bg-border" />
          <Text color="muted" className="text-xs">
            OR
          </Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* Social login */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border border-border bg-surface"
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
          >
            <Ionicons name="logo-google" size={18} color="#EA4335" />
            <Text color="primary" weight="medium" className="text-sm">
              Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border border-border bg-surface"
            accessibilityRole="button"
            accessibilityLabel="Continue with Apple"
          >
            <Ionicons name="logo-apple" size={18} color="#171C33" />
            <Text color="primary" weight="medium" className="text-sm">
              Apple
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign up link */}
        <View className="flex-row justify-center items-center mt-8 gap-1">
          <Text color="secondary" className="text-sm">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.auth.signup)}
            accessibilityRole="button"
            accessibilityLabel="Create account"
          >
            <Text color="primary" weight="semibold" className="text-sm">
              Create account
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ScreenWrapper>
  );
}
