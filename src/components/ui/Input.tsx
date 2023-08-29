import React, { useState } from 'react';
import { TextInputProps, TextStyle, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useController, UseControllerProps } from 'react-hook-form';
import { Color } from '../../types';
import { ArrowRight, Flag as FlagIcon } from '../../assets/icon';
import { Text } from './Text';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

interface Props extends TextInputProps {
  color?: Color;
  fz?: number;
  mb?: number;
  mt?: number;
  mr?: number;
  ml?: number;
  fw?: TextStyle['fontWeight'];
  padding?: string;
  background?: Color;
  height?: number;
  isPhoneNumber?: boolean;
  error?: string;
  bottomSheetField?: boolean;
  as?: React.ElementType;
  showCharactersCount?: boolean;
  multilineHeight?: number;
  isSelectBtn?: boolean;
}

interface FormInputProps extends Props, UseControllerProps {
  name: string;
  defaultValue?: string;
}

export const FormInput = ({
  defaultValue,
  name,
  bottomSheetField,
  as,
  ...props
}: FormInputProps) => {
  const { field } = useController({ name, defaultValue });

  return (
    <Input
      {...(bottomSheetField && { as: BottomSheetTextInput })}
      {...props}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    />
  );
};

export const Input = ({
  color = '#0A0D1F',
  fw = 'normal',
  fz = 14,
  mb = 0,
  mt = 0,
  mr = 0,
  ml = 0,
  padding = '0 12px',
  height = 44,
  background = '#f9f9f9',
  isPhoneNumber = false,
  error,
  showCharactersCount,
  multilineHeight,
  isSelectBtn,
  ...props
}: Props) => {
  const [contentHeight, setContentHeight] = useState(17);

  return (
    <Container $mb={mb} $mt={mt} $mr={mr} $ml={ml}>
      <Root
        $height={
          isPhoneNumber ? 48 : props.multiline ? multilineHeight || contentHeight + 28 : height
        }
        $background={background}
      >
        {isPhoneNumber && (
          <Flag>
            <FlagIcon />
            <Text label="+996" ml={5} color="#000" fw="500" />
          </Flag>
        )}
        <Field
          editable={!isSelectBtn}
          $fz={fz}
          $color={color}
          $fw={isPhoneNumber ? '500' : fw}
          $padding={props.multiline ? '14px 12px' : padding}
          placeholderTextColor="#636378"
          maxLength={isPhoneNumber ? 9 : undefined}
          {...(props.multiline && {
            onContentSizeChange: e => setContentHeight(e.nativeEvent.contentSize.height),
          })}
          {...props}
        />
        {isSelectBtn && (
          <View style={{ marginRight: 12 }}>
            <ArrowRight />
          </View>
        )}
      </Root>
      <Footer>
        {error && (
          <Text label={error} style={{ alignSelf: 'flex-start' }} mt={2} color="#DF3B57" fz={12} />
        )}
        {showCharactersCount && (
          <Text
            label={`${props.value?.length || 0} / ${props.maxLength}`}
            mt={6}
            ml="auto"
            color="#636378"
            style={{ textAlign: 'right' }}
          />
        )}
      </Footer>
    </Container>
  );
};

interface RootStyle {
  $height: number;
  $background: Color;
}

interface ContainerStyle {
  $mb: number;
  $mt: number;
  $mr: number;
  $ml: number;
}

interface FieldStyle {
  $fz: number;
  $fw: TextStyle['fontWeight'];
  $color: Color;
  $padding: string;
}

const Container = styled.View<ContainerStyle>`
  ${({ $mb, $mt, $mr, $ml }) => css`
    margin-bottom: ${$mb}px;
    margin-top: ${$mt}px;
    margin-right: ${$mr}px;
    margin-left: ${$ml}px;
  `}
`;

const Root = styled.View<RootStyle>`
  border-radius: 12px;
  flex-direction: row;
  align-items: center;

  ${({ $height, $background }) => css`
    height: ${$height}px;
    background-color: ${$background};
  `}
`;

const fieldStyle = css<FieldStyle>`
  height: 100%;
  flex-grow: 1;

  ${({ $fz, $fw, $color, $padding }) => css`
    font-size: ${$fz}px;
    color: ${$color};
    padding: ${$padding};
    font-weight: ${$fw};
  `}
`;

const Field = styled.TextInput<FieldStyle>`
  ${fieldStyle}
`;

const BottomSheetField = styled(BottomSheetTextInput)<FieldStyle>`
  ${fieldStyle}
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Flag = styled.View`
  flex-direction: row;
  padding: 6px 8px 6px 4px;
  border-radius: 15px;
  background: #fff;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin-left: 10px;
`;
