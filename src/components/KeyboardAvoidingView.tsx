import React, { FC } from 'react';
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

interface Props extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
}

export const KeyboardAvoidingView: FC<Props> = ({ children, style, ...props }) => {
  const headerHeight = useHeaderHeight();

  return (
    <RNKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[style, { flex: 1 }]}
      keyboardVerticalOffset={headerHeight}
      {...props}
    >
      {children}
    </RNKeyboardAvoidingView>
  );
};
