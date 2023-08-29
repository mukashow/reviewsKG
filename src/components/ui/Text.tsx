import React from 'react';
import { TextProps, TextStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Color } from '../../types';

interface Props extends TextProps {
  label: string;
  color?: Color;
  fz?: number;
  mb?: number | 'auto';
  mt?: number | 'auto';
  mr?: number | 'auto';
  ml?: number | 'auto';
  fw?: TextStyle['fontWeight'];
  centered?: boolean;
  width?: number | string;
}

interface StyleProps {
  $color?: Color;
  $fz?: number;
  $mb?: number | 'auto';
  $mt?: number | 'auto';
  $mr?: number | 'auto';
  $ml?: number | 'auto';
  $fw?: TextStyle['fontWeight'];
  $centered?: boolean;
  $width?: number | string;
}

export const Text: React.FC<Props> = ({
  label,
  color = '#0A0D1F',
  fw = 'normal',
  fz = 14,
  mb = 0,
  mt = 0,
  mr = 0,
  ml = 0,
  centered = false,
  width = 'auto',
  ...props
}) => {
  return (
    <Root
      $color={color}
      $fz={fz}
      $mb={mb}
      $mt={mt}
      $mr={mr}
      $ml={ml}
      $fw={fw}
      $centered={centered}
      $width={width}
      {...props}
    >
      {label}
    </Root>
  );
};

const Root = styled.Text<StyleProps>`
  ${({ $color, $fz, $mb, $mt, $mr, $ml, $fw, $centered, $width }) => css`
    color: ${$color};
    font-size: ${$fz}px;
    margin-bottom: ${typeof $mb === 'number' ? `${$mb}px` : $mb};
    margin-top: ${typeof $mt === 'number' ? `${$mt}px` : $mt};
    margin-right: ${typeof $mr === 'number' ? `${$mr}px` : $mr};
    margin-left: ${typeof $ml === 'number' ? `${$ml}px` : $ml};
    font-weight: ${$fw};
    text-align: ${$centered ? 'center' : 'left'};
    width: ${typeof $width === 'number' ? `${$width}px` : $width};
  `}
`;
