import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled, { css } from 'styled-components/native';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import {
  CodeField,
  Cursor,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StackActions } from '@react-navigation/native';
import { Button, Container, Input, KeyboardAvoidingView, Text } from '../components';
import { useAppDispatch } from '../store';
import { signIn } from '../store/auth/action';
import { AppStackParamList } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'CodeVerification'>;

export const CodeVerification = ({ navigation: { dispatch }, route: { params } }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [time, setTime] = useState(60);
  const reduxDispatch = useAppDispatch();
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const confirmCode = async () => {
    console.log('request...', value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Yuo are LOH');
    }, 3000);
    try {
      // const { user }: FirebaseAuthTypes.UserCredential = await params!.confirmation.confirm(value);
      // await reduxDispatch(signIn(user));
    } catch (e) {
      const error = e as ReactNativeFirebase.NativeFirebaseError;
      // setStatus({
      //   status: 'error',
      //   message:
      //     error.code === 'auth/invalid-verification-value'
      //       ? 'Введите правильный код'
      //       : 'Код подтверждение устарел, попробуйте запросить код заново',
      // });
    }
  };

  const timer = useMemo(() => {
    const m = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${m}:${s}`;
  }, [time]);

  useEffect(() => {
    if (value.length === 6) confirmCode();
  }, [value]);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (waiting) {
      intervalId = setInterval(() => {
        setTime(time => {
          if (time === 1) {
            setTime(60);
            clearInterval(intervalId);
            setWaiting(false);
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [waiting]);

  const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
    let textChild = null;

    if (symbol) {
      textChild = symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Cell
        $status={!!error ? 'error' : value.length === 6 ? 'filled' : 'init'}
        style={{ borderRadius: 12 }}
        key={index}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Cell>
    );
  };

  return (
    <KeyboardAvoidingView>
      <Root>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text label="Код - подтвержения" fz={22} fw="500" centered />
            <Text
              label="Мы отправили на ваш номер код подтверждения"
              fz={14}
              color="#636378"
              mt={4}
              width={300}
              centered
              mb={24}
            />
            <CodeField
              onFocus={() => {
                setValue('');
                setError('');
              }}
              autoFocus
              rootStyle={{ width: 336, alignSelf: 'center', marginBottom: 20 }}
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={6}
              keyboardType="number-pad"
              renderCell={renderCell}
              pointerEvents={loading ? 'none' : 'auto'}
              textContentType="oneTimeCode"
            />
            {error && (
              <Text
                label={error}
                fz={16}
                color="#D51F3A"
                style={{ letterSpacing: -0.5 }}
                centered
              />
            )}
          </View>
        </View>
        <Button
          disabled={waiting || loading}
          loading={loading}
          label="Отправить снова"
          onPress={() => setWaiting(true)}
          rightText={waiting ? timer : undefined}
        />
      </Root>
    </KeyboardAvoidingView>
  );
};

interface CellStyle {
  $status: 'filled' | 'error' | 'init';
}

const Root = styled(Container)`
  padding-bottom: 24px;
  padding-top: 32px;
  justify-content: space-around;
`;

const Cell = styled.Text<CellStyle>`
  height: 58px;
  width: 50px;
  line-height: 58px;
  font-size: 28px;
  font-weight: 500;
  color: #182245;
  text-align: center;
  overflow: hidden;

  ${({ $status }) => {
    switch ($status) {
      case 'filled':
        return css`
          border: 1px solid #b4f5de;
          background: #f1fff9;
        `;
      case 'error':
        return css`
          border: 1px solid #f5b4b4;
          background: #fff1f1;
        `;
      default:
        return css`
          border: 1px solid #efefef;
          background: #f9f9f9;
        `;
    }
  }}
`;
