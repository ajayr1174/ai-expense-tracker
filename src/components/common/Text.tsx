import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

/**
 * Text component variants
 */
type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'label'
  | 'caption'
  | 'badge';

/**
 * Text component weight
 */
type TextWeight =
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';

/**
 * Text component color
 */
type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'dark'
  | 'accent-purple'
  | 'accent-indigo'
  | 'accent-violet'
  | 'accent-blue'
  | 'accent-pink'
  | 'accent-orange'
  | 'accent-green';

/**
 * Extended Text props
 */
interface TextProps extends Omit<RNTextProps, 'style'> {
  /** Text variant for predefined styling */
  variant?: TextVariant;
  /** Font weight override */
  weight?: TextWeight;
  /** Text color */
  color?: TextColor;
  /** Additional CSS classes (Tailwind) */
  className?: string;
  /** Custom styles */
  style?: any;
  /** Number of lines to truncate */
  numberOfLines?: number;
  /** Text alignment */
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

/**
 * Get variant-specific Tailwind classes
 */
const getVariantClasses = (variant: TextVariant = 'body'): string => {
  switch (variant) {
    case 'h1':
      return 'text-4xl font-bold leading-11';
    case 'h2':
      return 'text-3xl font-bold leading-9';
    case 'h3':
      return 'text-2xl font-semibold leading-8';
    case 'h4':
      return 'text-xl font-semibold leading-7';
    case 'h5':
      return 'text-lg font-semibold leading-7';
    case 'h6':
      return 'text-base font-semibold leading-6';
    case 'label':
      return 'text-sm font-medium leading-5';
    case 'caption':
      return 'text-xs font-normal leading-4';
    case 'badge':
      return 'text-2xs font-semibold leading-3';
    case 'body':
    default:
      return 'text-base font-normal leading-6';
  }
};

/**
 * Get Tailwind color classes
 */
const getColorClasses = (color: TextColor = 'primary'): string => {
  const colorMap: Record<TextColor, string> = {
    // Text colors
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    muted: 'text-text-muted',
    inverse: 'text-text-inverse',
    dark: 'text-text-dark',

    // Semantic colors
    error: 'text-error',
    success: 'text-success',
    warning: 'text-warning',
    info: 'text-info',

    // Accent colors
    'accent-purple': 'text-accent-purple',
    'accent-indigo': 'text-accent-indigo',
    'accent-violet': 'text-accent-violet',
    'accent-blue': 'text-accent-blue',
    'accent-pink': 'text-accent-pink',
    'accent-orange': 'text-accent-orange',
    'accent-green': 'text-accent-green',
  };
  return colorMap[color];
};

/**
 * Get font weight Tailwind classes
 */
const getWeightClasses = (weight: TextWeight): string => {
  const weightMap: Record<TextWeight, string> = {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };
  return weightMap[weight];
};

/**
 * Get text align Tailwind classes
 */
const getAlignClasses = (align: string): string => {
  const alignMap: Record<string, string> = {
    auto: 'text-auto',
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
    justify: 'text-justify',
  };
  return alignMap[align] || '';
};

export const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      variant = 'body',
      weight,
      color = 'primary',
      className = '',
      style,
      align = 'auto',
      numberOfLines,
      children,
      ...props
    },
    ref,
  ) => {
    // Build Tailwind classes
    const variantClasses = getVariantClasses(variant);
    const colorClasses = getColorClasses(color);
    const weightClasses = weight ? getWeightClasses(weight) : '';
    const alignClasses = getAlignClasses(align);

    // Combine all classes
    const finalClasses = `
      ${variantClasses}
      ${colorClasses}
      ${weightClasses}
      ${alignClasses}
      ${className}
    `
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .join(' ');

    return (
      <RNText
        ref={ref}
        numberOfLines={numberOfLines}
        className={finalClasses}
        style={style}
        {...props}
      >
        {children}
      </RNText>
    );
  },
);

Text.displayName = 'Text';
