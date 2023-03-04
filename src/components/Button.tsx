import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button as ButtonUiLib, ButtonProps } from 'react-native-ui-lib';

type Props = ButtonProps & {
  loading?: boolean;
};

export const Button: React.FC<Props> = ({ loading = false, disabled = false, ...rest }) => {
  return (
    <ButtonUiLib
      disabled={loading || disabled}
      iconSource={() =>
        loading && <ActivityIndicator style={{ position: 'absolute' }} color="black" />
      }
      iconOnRight
      labelStyle={{ opacity: loading ? 0 : 1 }}
      enableShadow
      {...rest}
    />
  );
};
