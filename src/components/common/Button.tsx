import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Text } from './Text';

/**
 * Button component variants
 */
type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'link';

/**
 * Button component sizes
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 */
interface ButtonProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Button label/title */
  title: string;
  /** On press callback */
  onPress: () => void;
  /** Leading icon/element */
  leadingIcon?: React.ReactNode;
  /** Trailing icon/element */
  trailingIcon?: React.ReactNode;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Button width - 'full' for full width */
  width?: 'auto' | 'full';
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Get variant-specific classes
 */
const getVariantClasses = (
  variant: ButtonVariant,
  disabled: boolean,
): string => {
  if (disabled) {
    return 'bg-background-secondary border border-border-secondary';
  }

  switch (variant) {
    case 'secondary':
      return 'bg-surface-secondary border border-border hover:bg-background-tertiary active:bg-background-tertiary';
    case 'outlined':
      return 'bg-surface border border-primary active:bg-primary-50';
    case 'link':
      return '';
    case 'primary':
    default:
      return 'bg-primary active:bg-primary-700 shadow-md';
  }
};

/**
 * Get text color based on variant
 */
const getTextColor = (
  variant: ButtonVariant,
  disabled: boolean,
): 'primary' | 'secondary' | 'inverse' | 'muted' => {
  if (disabled) {
    return 'muted';
  }

  switch (variant) {
    case 'secondary':
      return 'primary';
    case 'outlined':
      return 'primary';
    case 'link':
      return 'secondary';
    case 'primary':
    default:
      return 'inverse';
  }
};

/**
 * Get size-specific classes
 */
const getSizeClasses = (size: ButtonSize): { button: string; text: string } => {
  switch (size) {
    case 'sm':
      return {
        button: 'px-4 py-2.5 rounded-md',
        text: 'text-sm font-semibold',
      };
    case 'lg':
      return {
        button: 'px-6 py-4 rounded-lg',
        text: 'text-lg font-semibold',
      };
    case 'md':
    default:
      return {
        button: 'px-6 py-4 rounded-md',
        text: 'text-base font-semibold',
      };
  }
};

/**
 * Reusable Button Component
 *
 * A comprehensive, accessible button component with multiple variants and sizes.
 * Supports icons, loading states, and more.
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button
 *   title="Save"
 *   onPress={() => console.log('Pressed')}
 * />
 *
 * // Secondary button
 * <Button
 *   variant="secondary"
 *   title="Cancel"
 *   onPress={() => console.log('Cancelled')}
 * />
 *
 * // Outlined button with icon
 * <Button
 *   variant="outlined"
 *   title="Add Expense"
 *   leadingIcon={<PlusIcon />}
 *   onPress={() => console.log('Add')}
 * />
 *
 * // Full width loading button
 * <Button
 *   title="Submit"
 *   width="full"
 *   loading={isLoading}
 *   onPress={handleSubmit}
 * />
 * ```
 */
export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      title,
      onPress,
      leadingIcon,
      trailingIcon,
      disabled = false,
      loading = false,
      width = 'auto',
      containerStyle,
      textStyle,
      className = '',
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const variantClasses = getVariantClasses(variant, isDisabled);
    const textColor = getTextColor(variant, isDisabled);
    const sizeClasses = getSizeClasses(size);

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
        style={[containerStyle]}
        className={`
          flex-row items-center justify-center gap-2
          ${sizeClasses.button}
          ${variantClasses}
          ${width === 'full' ? 'w-full' : 'self-start'}
          ${isDisabled ? 'opacity-60' : 'opacity-100'}
          ${className}
        `}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        accessibilityLabel={title}
      >
        {/* Leading Icon */}
        {leadingIcon && !loading && (
          <View className="flex-shrink-0">{leadingIcon}</View>
        )}

        {/* Loading Spinner */}
        {loading && (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? '#FFFFFF' : '#7C4DFF'}
          />
        )}

        {/* Button Title */}
        <Text
          style={[textStyle]}
          color={textColor}
          weight="semibold"
          className={sizeClasses.text}
        >
          {title}
        </Text>

        {/* Trailing Icon */}
        {trailingIcon && !loading && (
          <View className="flex-shrink-0">{trailingIcon}</View>
        )}
      </TouchableOpacity>
    );
  },
);

Button.displayName = 'Button';

export default Button;
