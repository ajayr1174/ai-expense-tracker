import React, { useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type {
  AuthStackParamList,
  BottomTabParamList,
} from '@/navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/Text';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { routes } from '@/constants/routes';

type SignupNavProp = NativeStackNavigationProp<
  AuthStackParamList & BottomTabParamList,
  'Signup'
>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

// ─── Validation schema ─────────────────────────────────────────────────────────

const SignupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .matches(
      /^[a-zA-Z\s'-]*$/,
      'First name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .matches(
      /^[a-zA-Z\s'-]*$/,
      'Last name can only contain letters, spaces, hyphens, and apostrophes',
    )
    .required('Last name is required'),
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      'Password must contain a special character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms')
    .required(),
});

// ─── Icon helpers ─────────────────────────────────────────────────────────────

const UserIcon = () => (
  <Ionicons name="person-outline" size={18} color="#98A2B3" />
);

const EmailIcon = () => (
  <Ionicons name="mail-outline" size={18} color="#98A2B3" />
);

const LockIcon = () => (
  <Ionicons name="lock-closed-outline" size={18} color="#98A2B3" />
);

const CheckIcon = ({ filled }: { filled: boolean }) => (
  <View
    className={`w-5 h-5 rounded border-2 items-center justify-center ${
      filled ? 'bg-primary border-primary' : 'border-border'
    }`}
  >
    {filled && <Ionicons name="checkmark" size={14} color="white" />}
  </View>
);

// ─── Password strength calculator ──────────────────────────────────────────────

const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) return 'weak';

  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'fair';
  if (strength <= 4) return 'good';
  return 'strong';
};

const getPasswordStrengthColor = (strength: PasswordStrength): string => {
  switch (strength) {
    case 'weak':
      return '#FF6B6B';
    case 'fair':
      return '#FFA500';
    case 'good':
      return '#4ECDC4';
    case 'strong':
      return '#2ECC71';
    default:
      return '#98A2B3';
  }
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function SignupScreen() {
  const navigation = useNavigation<SignupNavProp>();

  // ── Formik setup ───────────────────────────────────────────────────────────
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
    validationSchema: SignupValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async values => {
      try {
        // TODO: Replace with actual auth API call
        // const response = await authService.signup({
        //   firstName: values.firstName,
        //   lastName: values.lastName,
        //   email: values.email,
        //   password: values.password,
        // });

        // Simulate API call
        await new Promise(resolve =>
          setTimeout(() => resolve(undefined), 2000),
        );

        // Navigate to OTP verification or directly to the main app
        navigation.replace(routes.root.mainTabs as any);
      } catch (error) {
        // Handle signup error
        console.error('Signup error:', error);
      }
    },
  });

  // ── Computed values ────────────────────────────────────────────────────────
  const passwordStrength = useMemo(
    () => calculatePasswordStrength(formik.values.password),
    [formik.values.password],
  );

  const isFormValid = formik.isValid && formik.dirty;

  return (
    <ScreenWrapper
      className="flex-1 bg-primary"
      statusBarStyle="light-content"
      statusBarColor="#7C4DFF"
    >
      {/* ── Decorative header ──────────────────────────────────────────────── */}
      <View className="bg-primary pt-10 pb-10 px-6 items-center overflow-hidden relative">
        {/* Decorative blobs */}
        <View
          className="absolute w-40 h-40 rounded-full bg-primary-400 opacity-40"
          style={{ top: -40, right: -40 }}
        />
        <View
          className="absolute w-36 h-36 rounded-full bg-primary-700 opacity-50"
          style={{ bottom: -50, left: -30 }}
        />

        {/* Logo */}
        <View className="w-20 h-20 rounded-full bg-white items-center justify-center shadow-purple">
          <Ionicons name="wallet-outline" size={40} color="#7C4DFF" />
        </View>

        <Text
          variant="h3"
          color="inverse"
          weight="bold"
          align="center"
          className="mt-3"
        >
          Join SpendWise
        </Text>
        <Text
          color="inverse"
          align="center"
          className="mt-1 text-sm opacity-75"
        >
          Start tracking smarter today
        </Text>
      </View>

      {/* ── Form card ─────────────────────────────────────────────────────── */}
      <Card
        variant="flat"
        className="flex-1 rounded-t-3xl -mt-5 px-6 pt-7 pb-10"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEventThrottle={16}
        >
          <Text variant="h4" color="primary" weight="bold">
            Create account 🚀
          </Text>
          <Text color="secondary" className="mt-1 mb-6 text-sm">
            Fill in your details to get started
          </Text>

          {/* Name fields row */}
          <View className="gap-4 mb-4">
            {/* First name */}
            <View className="flex-1">
              <Input
                label="First name"
                placeholder="John"
                value={formik.values.firstName}
                onChange={formik.handleChange('firstName')}
                onBlur={() => formik.setFieldTouched('firstName', true)}
                error={formik.touched.firstName ? formik.errors.firstName : ''}
                required
                leadingIcon={<UserIcon />}
                disabled={formik.isSubmitting}
                maxLength={50}
              />
            </View>

            {/* Last name */}
            <View className="flex-1">
              <Input
                label="Last name"
                placeholder="Doe"
                value={formik.values.lastName}
                onChange={formik.handleChange('lastName')}
                onBlur={() => formik.setFieldTouched('lastName', true)}
                error={formik.touched.lastName ? formik.errors.lastName : ''}
                required
                leadingIcon={<UserIcon />}
                disabled={formik.isSubmitting}
                maxLength={50}
              />
            </View>
          </View>

          {/* Email */}
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={() => formik.setFieldTouched('email', true)}
            error={formik.touched.email ? formik.errors.email : ''}
            required
            leadingIcon={<EmailIcon />}
            keyboardType="email-address"
            disabled={formik.isSubmitting}
            maxLength={100}
          />

          {/* Password */}
          <View className="mt-4">
            <Input
              label="Password"
              type={'password'}
              placeholder="Create a strong password"
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={() => formik.setFieldTouched('password', true)}
              error={formik.touched.password ? formik.errors.password : ''}
              required
              leadingIcon={<LockIcon />}
              disabled={formik.isSubmitting}
              maxLength={128}
            />

            {/* Password strength indicator */}
            {formik.values.password && (
              <View className="mt-2">
                <View className="flex-row items-center gap-2 mb-1">
                  <View className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <View
                      className="h-full"
                      style={{
                        width: `${
                          ((['weak', 'fair', 'good', 'strong'].indexOf(
                            passwordStrength,
                          ) +
                            1) /
                            4) *
                          100
                        }%`,
                        backgroundColor:
                          getPasswordStrengthColor(passwordStrength),
                      }}
                    />
                  </View>
                  <Text
                    className="text-xs capitalize"
                    style={{
                      color: getPasswordStrengthColor(passwordStrength),
                    }}
                    weight="medium"
                  >
                    {passwordStrength}
                  </Text>
                </View>
                <Text color="muted" className="text-xs">
                  8+ chars, uppercase, lowercase, number & special character
                </Text>
              </View>
            )}
          </View>

          {/* Confirm password */}
          <View className="mt-4">
            <Input
              label="Confirm password"
              type={'password'}
              placeholder="Re-enter your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange('confirmPassword')}
              onBlur={() => formik.setFieldTouched('confirmPassword', true)}
              error={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : ''
              }
              required
              leadingIcon={<LockIcon />}
              disabled={formik.isSubmitting}
              maxLength={128}
            />
          </View>

          {/* Terms and conditions */}
          <TouchableOpacity
            onPress={() =>
              formik.setFieldValue('agreeToTerms', !formik.values.agreeToTerms)
            }
            disabled={formik.isSubmitting}
            className="flex-row items-center gap-3 mt-6 mb-2"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: formik.values.agreeToTerms }}
            accessibilityLabel="I agree to Terms and Conditions"
          >
            <CheckIcon filled={formik.values.agreeToTerms} />
            <View className="flex-1">
              <Text color="secondary" className="text-sm">
                I agree to the{' '}
                <Text
                  color="primary"
                  weight="semibold"
                  className="text-sm"
                  onPress={() => console.log('Navigate to terms')}
                >
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text
                  color="primary"
                  weight="semibold"
                  className="text-sm"
                  onPress={() => console.log('Navigate to privacy')}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
            <Text color="primary" className="text-xs ml-8 mb-4">
              {formik.errors.agreeToTerms}
            </Text>
          )}

          {/* Sign up button */}
          <View className="mt-6">
            <Button
              title="Create Account"
              onPress={() => formik.handleSubmit()}
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting || !isFormValid}
              width="full"
            />
          </View>

          {/* Divider */}
          <View className="flex-row items-center gap-3 my-5">
            <View className="flex-1 h-px bg-border" />
            <Text color="muted" className="text-xs">
              OR
            </Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Social signup */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border border-border bg-surface disabled:opacity-50"
              disabled={formik.isSubmitting}
              accessibilityRole="button"
              accessibilityLabel="Sign up with Google"
            >
              {formik.isSubmitting ? (
                <ActivityIndicator size="small" color="#7C4DFF" />
              ) : (
                <>
                  <Ionicons name="logo-google" size={18} color="#EA4335" />
                  <Text color="primary" weight="medium" className="text-sm">
                    Google
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl border border-border bg-surface disabled:opacity-50"
              disabled={formik.isSubmitting}
              accessibilityRole="button"
              accessibilityLabel="Sign up with Apple"
            >
              {formik.isSubmitting ? (
                <ActivityIndicator size="small" color="#7C4DFF" />
              ) : (
                <>
                  <Ionicons name="logo-apple" size={18} color="#171C33" />
                  <Text color="primary" weight="medium" className="text-sm">
                    Apple
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Sign in link */}
          <View className="flex-row justify-center items-center mt-6 gap-1">
            <Text color="secondary" className="text-sm">
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.auth.login)}
              disabled={formik.isSubmitting}
              accessibilityRole="button"
              accessibilityLabel="Sign in"
            >
              <Text color="primary" weight="semibold" className="text-sm">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Card>
    </ScreenWrapper>
  );
}
