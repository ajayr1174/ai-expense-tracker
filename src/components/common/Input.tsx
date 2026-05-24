import React, { forwardRef, useState } from 'react';
import {
  View,
  TextInput,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Text } from './Text';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * Input component variants
 */
type InputVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

/**
 * Input component sizes
 */
type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input component props
 */
interface InputProps {
  /** Input variant for styling */
  variant?: InputVariant;
  /** Input size */
  size?: InputSize;
  /** Label text displayed above input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text displayed below input */
  helperText?: string;
  /** Error message (sets variant to error) */
  error?: string;
  /** Leading icon/element */
  leadingIcon?: React.ReactNode;
  /** Trailing icon/element */
  trailingIcon?: React.ReactNode;
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'number' | 'phone' | 'url';
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Character count limit */
  maxLength?: number;
  /** Show character counter */
  showCharCounter?: boolean;
  /** Whether to show password toggle (for password type) */
  showPasswordToggle?: boolean;
  /** Custom style for container */
  containerStyle?: ViewStyle;
  /** Custom style for input */
  inputStyle?: TextStyle;
  /** Input value */
  value?: string;
  /** On value change callback */
  onChange?: (text: string) => void;
  /** On blur callback */
  onBlur?: () => void;
  /** On focus callback */
  onFocus?: () => void;
  /** Custom keyboard type */
  keyboardType?:
  | 'default'
  | 'numeric'
  | 'decimal-pad'
  | 'phone-pad'
  | 'email-address'
  | 'url';
  /** Multiline input */
  multiline?: boolean;
  /** Number of lines for multiline input */
  numberOfLines?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
/**
 * Container-level classes: border + background only.
 * Text colour is handled separately via inline style on TextInput.
 */
const getContainerVariantClasses = (
  variant: InputVariant,
  disabled: boolean,
): string => {
  if (disabled) return 'bg-background-secondary border border-border-secondary';

  switch (variant) {
    case 'error': return 'bg-surface border border-error';
    case 'success': return 'bg-surface border border-success';
    case 'warning': return 'bg-surface border border-warning';
    case 'info': return 'bg-surface border border-info';
    default: return 'bg-surface border border-border';
  }
};

/**
 * Text colour value for the TextInput (applied as inline style).
 */
const getTextColor = (variant: InputVariant, disabled: boolean): string => {
  if (disabled) return '#98A2B3'; // text-muted
  return '#171C33';               // text-primary
};

/**
 * Size-specific classes.
 * - `container`: horizontal padding + min-height applied to the outer row View
 * - `input`:     font size only — no padding (container owns spacing)
 */
const getSizeClasses = (
  size: InputSize,
): { container: string; input: string } => {
  switch (size) {
    case 'sm':
      return { container: 'px-3 h-9', input: 'text-sm' };
    case 'lg':
      return { container: 'px-4 h-13', input: 'text-lg' };
    case 'md':
    default:
      return { container: 'px-3 h-12', input: 'text-base' };
  }
};

/**
 * Get label color based on variant
 */
const getLabelColor = (variant: InputVariant, disabled: boolean): string => {
  if (disabled) return 'text-text-muted';

  switch (variant) {
    case 'error':
      return 'text-error-DEFAULT';
    case 'success':
      return 'text-success-DEFAULT';
    case 'warning':
      return 'text-warning-DEFAULT';
    case 'info':
      return 'text-info-DEFAULT';
    default:
      return 'text-text-primary';
  }
};

/**
 * Get helper text color based on variant
 */
const getHelperTextColor = (variant: InputVariant): string => {
  switch (variant) {
    case 'error':
      return 'text-error-600';
    case 'success':
      return 'text-success-600';
    case 'warning':
      return 'text-warning-600';
    case 'info':
      return 'text-info-600';
    default:
      return 'text-text-secondary';
  }
};

/**
 * Reusable Input Component
 *
 * A comprehensive, accessible input component with multiple variants and sizes.
 * Supports icons, labels, error messages, and more.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={setEmail}
 *   error={emailError}
 * />
 *
 * <Input
 *   label="Amount"
 *   type="number"
 *   size="lg"
 *   variant="success"
 *   leadingIcon={<DollarIcon />}
 *   placeholder="0.00"
 *   value={amount}
 *   onChange={setAmount}
 * />
 * ```
 */
export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      placeholder,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
      type = 'text',
      disabled = false,
      required = false,
      maxLength,
      showCharCounter = false,
      showPasswordToggle = true,
      containerStyle,
      inputStyle,
      value = '',
      onChange,
      onBlur,
      onFocus,
      keyboardType = 'default',
      multiline = false,
      numberOfLines = 1,
      className = '',
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Determine actual variant based on error state
    const actualVariant = error ? 'error' : variant;
    const containerVariantClasses = getContainerVariantClasses(actualVariant, disabled);
    const inputTextColor = getTextColor(actualVariant, disabled);
    const sizeClasses = getSizeClasses(size);
    const labelColor = getLabelColor(actualVariant, disabled);
    const helperColor = getHelperTextColor(actualVariant);

    // Determine input type
    let inputType = type;
    if (type === 'password' && showPassword) {
      inputType = 'text';
    }

    // Map type to keyboard type if not explicitly set
    let finalKeyboardType = keyboardType;
    if (keyboardType === 'default') {
      switch (type) {
        case 'email':
          finalKeyboardType = 'email-address';
          break;
        case 'phone':
          finalKeyboardType = 'phone-pad';
          break;
        case 'number':
          finalKeyboardType = 'numeric';
          break;
        case 'url':
          finalKeyboardType = 'url';
          break;
      }
    }

    const characterCount = value.length;
    const showCounter = showCharCounter && maxLength;

    return (
      <View style={[containerStyle]}>
        {/* Label */}
        {label && (
          <View className="flex-row items-center gap-1">
            <Text
              variant="label"
              className={`text-sm font-medium ${labelColor} ${disabled ? 'opacity-60' : ''
                }`}
            >
              {label}
            </Text>
            {required && (
              <Text className="text-error-DEFAULT font-semibold">*</Text>
            )}
          </View>
        )}

        {/* Input Container */}
        <View
          className={`flex-row items-center gap-2 rounded-md ${containerVariantClasses} ${sizeClasses.container}`}
        >
          {/* Leading Icon */}
          {leadingIcon && <View className="flex-shrink-0">{leadingIcon}</View>}

          {/* TextInput — no padding, no border, no background; container owns all of that */}
          <TextInput
            ref={ref}
            style={[{ color: inputTextColor, flex: 1, padding: 0 }, inputStyle]}
            className={`${sizeClasses.input} ${disabled ? 'opacity-60' : ''} ${className}`}
            placeholder={placeholder}
            placeholderTextColor="#98A2B3"
            value={value}
            onChangeText={onChange}
            onBlur={() => { setIsFocused(false); onBlur?.(); }}
            onFocus={() => { setIsFocused(true); onFocus?.(); }}
            editable={!disabled}
            secureTextEntry={inputType === 'password'}
            keyboardType={finalKeyboardType as any}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            scrollEnabled={multiline}
          />

          {/* Trailing Icon / Password Toggle / Character Counter */}
          <View className="flex-row items-center gap-2 flex-shrink-0">
            {type === 'password' && showPasswordToggle && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="p-1"
                disabled={disabled}
                accessibilityLabel={
                  showPassword ? 'Hide password' : 'Show password'
                }
                accessibilityRole="button"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </TouchableOpacity>
            )}

            {showCounter && (
              <Text className="text-2xs text-text-muted whitespace-nowrap">
                {characterCount}/{maxLength}
              </Text>
            )}

            {trailingIcon && !showCounter && (
              <View className="flex-shrink-0">{trailingIcon}</View>
            )}
          </View>
        </View>

        {/* Error / Helper Text */}
        {(error || helperText) && (
          <Text
            variant="caption"
            className={`text-xs mt-1 ${error ? 'text-error-DEFAULT' : helperColor
              }`}
          >
            {error || helperText}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

// Placeholder icon components (replace with your actual icons)
const EyeIcon = () => <Ionicons name='eye-outline' size={20} color="#98A2B3" />;
const EyeOffIcon = () => <Ionicons name='eye-off-outline' size={20} color="#98A2B3" />;
