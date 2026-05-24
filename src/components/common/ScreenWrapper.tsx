import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Platform,
  StatusBarStyle,
  ViewStyle,
} from 'react-native';

interface ScreenWrapperProps {
  /** Child content */
  children: React.ReactNode;
  /** Background colour class applied to the outer wrapper, default: bg-background */
  className?: string;
  /** Colour of the status bar icons. Default: dark-content */
  statusBarStyle?: StatusBarStyle;
  /** Background colour string forwarded to the native StatusBar */
  statusBarColor?: string;
  /** When true the children are NOT wrapped in a ScrollView */
  noScroll?: boolean;
  /** Extra style for the ScrollView's contentContainer */
  contentContainerStyle?: ViewStyle;
}

/**
 * ScreenWrapper
 *
 * Provides the standard screen scaffold:
 *  - StatusBar control
 *  - KeyboardAvoidingView (iOS: padding, Android: height)
 *  - Optional ScrollView with flexGrow:1 so short content still fills the screen
 *
 * @example
 * <ScreenWrapper statusBarStyle="light-content" statusBarColor="#7C4DFF">
 *   <View>...</View>
 * </ScreenWrapper>
 */
export default function ScreenWrapper({
  children,
  className = 'flex-1 bg-background',
  statusBarStyle = 'dark-content',
  statusBarColor,
  noScroll = false,
  contentContainerStyle,
}: ScreenWrapperProps) {
  return (
    <KeyboardAvoidingView
      className={className}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarColor}
        translucent={false}
      />

      {noScroll ? (
        children
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
