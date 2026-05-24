import React from 'react';
import { View, ViewStyle } from 'react-native';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

interface CardProps {
  /** Card style variant */
  variant?: CardVariant;
  /** Child content */
  children: React.ReactNode;
  /** Additional Tailwind classes */
  className?: string;
  /** Custom style overrides */
  style?: ViewStyle;
}

/**
 * Card
 *
 * A versatile surface container with rounded corners.
 * Use `variant` to control the visual weight:
 *  - `default`  – white background, subtle shadow
 *  - `elevated` – white background, stronger shadow + purple tint
 *  - `outlined` – white background, visible border, no shadow
 *  - `flat`     – secondary background, no shadow or border
 *
 * @example
 * <Card variant="elevated" className="p-4">
 *   <Text>Hello</Text>
 * </Card>
 */
export default function Card({
  variant = 'default',
  children,
  className = '',
  style,
}: CardProps) {
  const variantClasses: Record<CardVariant, string> = {
    default: 'bg-surface rounded-xl shadow-sm',
    elevated: 'bg-surface rounded-xl shadow-card',
    outlined: 'bg-surface rounded-xl border border-border',
    flat: 'bg-surface-secondary rounded-xl',
  };

  return (
    <View
      className={`${variantClasses[variant]} ${className}`}
      style={style}
    >
      {children}
    </View>
  );
}
