import React from 'react';
import { ActivityIndicator, TouchableOpacityProps, View, ViewProps } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Text } from './Text';
import { ArrowRight } from '../../assets/icon';

interface Props extends TouchableOpacityProps {
  loading?: boolean;
  label: string;
  rightText?: string;
  Icon?: React.FC<ViewProps>;
  mb?: number | 'auto';
  mt?: number | 'auto';
  mr?: number | 'auto';
  ml?: number | 'auto';
  variant?: 'gray' | 'default' | 'small' | 'sort' | 'contact' | 'filter';
  contactLabel?: string;
  fz?: number;
}

enum Color {
  gray = '#15A3F2',
  default = '#FFF',
  small = '#000',
  sort = '#000',
  contact = '#090816',
  filter = '#090816',
}

export const Button: React.FC<Props> = ({
  loading = false,
  Icon,
  disabled = false,
  rightText = '',
  contactLabel,
  label,
  variant = 'default',
  mb = 0,
  mt = 0,
  mr = 0,
  ml = 0,
  fz = 14,
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
      {Icon && !loading && (
        <Icon style={{ marginRight: variant === 'contact' ? 12 : variant === 'filter' ? 8 : 4 }} />
      )}
      {loading && <ActivityIndicator style={{ margin: 'auto' }} color="white" />}
      {!loading && (
        <View>
          <Text
            label={label}
            fw={variant === 'sort' ? '400' : '500'}
            color={Color[variant]}
            fz={variant === 'small' ? 12 : variant === 'contact' ? 16 : fz}
          />
          {variant === 'contact' && contactLabel && <Text label={contactLabel} color="#555967" />}
        </View>
      )}
      {variant.match(/sort|contact/) && (
        <ArrowRight
          fill="#0E1232"
          width={variant === 'sort' ? 16 : 20}
          height={variant === 'sort' ? 16 : 21}
          style={{
            transform: [{ rotate: variant === 'sort' ? '90deg' : '0deg' }],
            marginLeft: variant === 'sort' ? 8 : 'auto',
          }}
        />
      )}
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
  $mb: Props['mb'];
  $mt: Props['mt'];
  $mr: Props['mr'];
  $ml: Props['ml'];
  $variant: Props['variant'];
}

const Root = styled.TouchableOpacity<RootStyle>`
  width: 100%;
  height: 44px;
  border-radius: 12px;
  align-items: center;
  flex-direction: row;
  padding: 0 16px;

  ${({ $mb, $mt, $mr, $ml, $hasRightText, $loading }) => css`
    margin-bottom: ${typeof $mb === 'number' ? `${$mb}px` : $mb};
    margin-top: ${typeof $mt === 'number' ? `${$mt}px` : $mt};
    margin-right: ${typeof $mr === 'number' ? `${$mr}px` : $mr};
    margin-left: ${typeof $ml === 'number' ? `${$ml}px` : $ml};
    justify-content: ${!$loading && $hasRightText ? 'space-between' : 'center'};
  `}

  ${({ $variant, $disabled }) => {
    switch ($variant) {
      case 'gray':
        return css`
          background: ${$disabled ? '#eaeaea' : '#F9F9F9'};
        `;
      case 'small':
        return css`
          padding: 6px 10px;
          border-radius: 8px;
          background: #fff;
          height: 28px;
          width: auto;
        `;
      case 'sort':
        return css`
          height: 33px;
          background-color: #f9f9f9;
          width: auto;
          padding: 0 8px;
        `;
      case 'contact':
        return css`
          height: 56px;
          background-color: white;
          padding: 10px 12px;
          justify-content: flex-start;
        `;
      case 'filter':
        return css`
          height: 48px;
          background-color: white;
          padding: 12px;
          justify-content: flex-start;
        `;
      default:
        return css`
          background: ${$disabled ? '#9FBBCB' : '#15a3f2'};
        `;
    }
  }}
`;
