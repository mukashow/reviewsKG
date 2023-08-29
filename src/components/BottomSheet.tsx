import React, { Dispatch, RefObject, SetStateAction, useEffect, useMemo } from 'react';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetDraggableView,
} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { Text } from './ui/Text';
import { Close } from '../assets/icon';
import { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions, View } from 'react-native';
import { Container } from './Container';

interface Props {
  bottomSheetRef: RefObject<BottomSheetModal>;
  children: React.ReactNode;
  snapPoints?: Array<string | number>;
  index?: number;
}
const CONTENT_HEIGHT = 'CONTENT_HEIGHT';

export const BottomSheet = ({ bottomSheetRef, children, snapPoints, index = 0 }: Props) => {
  const { height: windowHeight } = useWindowDimensions();
  const initialSnapPoints = useMemo(() => ['100%'], [snapPoints]);
  const { top } = useSafeAreaInsets();

  return (
    <BottomSheetModal
      index={index}
      topInset={top}
      snapPoints={initialSnapPoints}
      enablePanDownToClose
      keyboardBehavior="interactive"
      handleStyle={{ paddingBottom: 0, paddingTop: 4 }}
      ref={bottomSheetRef}
      backgroundStyle={{ backgroundColor: '#F9F9F9', borderRadius: 12 }}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          enableTouchThrough
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <View style={{ flex: 1 }}>
        <Header>
          <Text label="Асан Асанов" color="#090816" fz={16} fw="500" />
          <CloseButton onPress={() => bottomSheetRef.current?.close()} />
        </Header>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </BottomSheetModal>
  );
};

const Header = styled.View`
  padding: 12px 14px 18px 14px;
  align-items: center;
  position: relative;
  border-bottom-style: solid;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 1px;
`;

const CloseButton = styled(Close)`
  position: absolute;
  top: 10px;
  right: 20px;
`;
