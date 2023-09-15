import React, { RefObject, useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import styled from 'styled-components/native';
import { Text } from './ui/Text';
import { Close } from '../assets/icon';

interface Props {
  bottomSheetRef: RefObject<BottomSheetModal>;
  // actionSheetRef: RefObject<ActionSheetRef>;
  children: React.ReactNode;
  snapPoints?: Array<string | number>;
  index?: number;
  label?: string;
}

export const BottomSheet = ({
  bottomSheetRef,
  // actionSheetRef,
  children,
  snapPoints,
  label = '',
  index = 0,
}: Props) => {
  const { height: windowHeight } = useWindowDimensions();
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [snapPoints]);
  const { top } = useSafeAreaInsets();
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  return (
    <BottomSheetModal
      index={index}
      topInset={top}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      enablePanDownToClose
      keyboardBehavior="interactive"
      handleComponent={() => null}
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
      <Root onLayout={handleContentLayout}>
        <Header>
          <Text label={label} color="#090816" fz={16} fw="500" />
          <Close onPress={() => bottomSheetRef.current?.close()} />
        </Header>
        {children}
      </Root>
    </BottomSheetModal>
    // <ActionSheet ref={actionSheetRef}>{children}</ActionSheet>
  );
};

const Root = styled(BottomSheetView)`
  padding: 20px 16px 32px;
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 18px;
`;
