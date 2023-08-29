import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import {
  Modal,
  ModalProps,
  NativeModules,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { Text } from 'react-native-ui-lib';
import { useAppDispatch, useAppSelector } from '../store';
import { Button } from './ui/Button';
import { addService } from '../store/services/action';

interface Props extends ModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const SlideUp: FC<Props> = ({ visible, setVisible }) => {
  const { userServices } = useAppSelector(state => ({
    userServices: state.auth.services,
  }));
  const services = useAppSelector(state => state.main.services);
  const [checkedService, setCheckedService] = useState<number | null>(null);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const dispatch = useAppDispatch();

  const onAddService = () => {
    dispatch(addService(checkedService!)).then(() => {
      setVisible(false);
      setCheckedService(null);
    });
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      NativeModules.StatusBarManager.getHeight(({ height }: { height: number }) => {
        setStatusBarHeight(height);
      });
    } else {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          paddingTop: statusBarHeight + 10,
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}
      >
        <Pressable
          onPress={() => {
            setVisible(false);
            setCheckedService(null);
          }}
        >
          <Text>Закрыть</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{
          backgroundColor: 'white',
          paddingTop: 24,
          paddingHorizontal: 10,
          flex: 1,
        }}
      >
        {services?.map(({ id, title }) => (
          <Pressable
            key={id}
            style={{ paddingVertical: 10 }}
            onPress={() => setCheckedService(id)}
            disabled={userServices?.some(service => service.id === id)}
          >
            <Text text70>
              {title}{' '}
              {(checkedService === id || userServices?.some(service => service.id === id)) && '✔'}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={{ paddingBottom: 50, backgroundColor: 'white', paddingHorizontal: 10 }}>
        <Button label="Добавить" onPress={onAddService} disabled={!checkedService} />
      </View>
    </Modal>
  );
};
