import React, { FC } from 'react';
import { Colors, Dialog, PanningProvider, Text } from 'react-native-ui-lib';
import { StyleSheet, View } from 'react-native';
import { Button } from './Button';

interface Props {
  visible: boolean;
  close: () => void;
  title: string;
  children?: React.ReactNode;
  submitColor?: 'danger';
  onSubmit: () => void;
}

export const Modal: FC<Props> = ({ visible, close, title, submitColor, onSubmit, children }) => {
  return (
    <Dialog
      overlayBackgroundColor="rgba(0, 0, 0, 0.4)"
      containerStyle={style.root}
      visible={visible}
      onDismiss={close}
      panDirection={PanningProvider.Directions.DOWN}
    >
      <Text text65 center>
        {title}
      </Text>
      {children}
      <View style={style.action}>
        <Button label="Отмена" style={{ width: '48%' }} onPress={close} />
        <Button
          label="Подвердить"
          style={{ width: '48%', marginLeft: 'auto' }}
          {...(submitColor === 'danger' && { backgroundColor: Colors.red20 })}
          onPress={onSubmit}
        />
      </View>
    </Dialog>
  );
};

const style = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 32,
  },
  action: {
    flexDirection: 'row',
    marginTop: 24,
  },
});
