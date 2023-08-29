import React from 'react';
import { ActivityIndicator, TouchableOpacityProps, ViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Text } from './Text';

interface Props extends TouchableOpacityProps {
  loading?: boolean;
  label: string;
  rightText?: string;
  Icon?: React.FC<ViewProps>;
  mb?: number | 'auto';
  mt?: number | 'auto';
  mr?: number | 'auto';
  ml?: number | 'auto';
  variant?: 'gray' | 'default';
}

export const Button: React.FC<Props> = ({
  loading = false,
  Icon,
  disabled = false,
  rightText = '',
  label,
  variant = 'default',
  mb = 0,
  mt = 0,
  mr = 0,
  ml = 0,
  ...props
}) => {
  return (
    <Root
      {...props}
      disabled={disabled || loading}
      $hasRightText={!!rightText}
      $mb={mb}
      $mt={mt}
      $mr={mr}
      $ml={ml}
      $disabled={disabled}
      $loading={loading}
      $variant={variant}
    >
      {Icon && !loading && <Icon style={{ marginRight: 4 }} />}
      {loading && <ActivityIndicator style={{ margin: 'auto' }} color="white" />}
      {!loading && <Text label={label} fw="500" color={variant === 'gray' ? '#15A3F2' : '#FFF'} />}
      {rightText && !loading && (
        <Text label={rightText} fw="500" color={variant === 'gray' ? '#15A3F2' : '#FFF'} />
      )}
    </Root>
  );
};

interface RootStyle {
  $disabled: boolean;
  $hasRightText: boolean;
  $loading: boolean;
  $mb: number | 'auto';
  $mt: number | 'auto';
  $mr: number | 'auto';
  $ml: number | 'auto';
  $variant: 'gray' | 'default';
}

const Root = styled.TouchableOpacity<RootStyle>`
  width: 100%;
  height: 44px;
  border-radius: 12px;
  align-items: center;
  flex-direction: row;
  padding: 0 16px;

  ${({ $mb, $mt, $mr, $ml, $disabled, $hasRightText, $loading, $variant }) => css`
    margin-bottom: ${typeof $mb === 'number' ? `${$mb}px` : $mb};
    margin-top: ${typeof $mt === 'number' ? `${$mt}px` : $mt};
    margin-right: ${typeof $mr === 'number' ? `${$mr}px` : $mr};
    margin-left: ${typeof $ml === 'number' ? `${$ml}px` : $ml};
    justify-content: ${!$loading && $hasRightText ? 'space-between' : 'center'};
    ${$variant === 'gray'
      ? css`
          background: ${$disabled ? '#eaeaea' : '#F9F9F9'};
        `
      : css`
          background: ${$disabled ? '#9FBBCB' : '#15a3f2'};
        `}
  `}
`;
