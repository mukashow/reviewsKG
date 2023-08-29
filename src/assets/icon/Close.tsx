import React from 'react';
import { Line, Svg } from 'react-native-svg';
import { Pressable, PressableProps } from 'react-native';

export const Close = (props: PressableProps) => {
  return (
    <Pressable {...props}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Line
          x1="6.93284"
          y1="6.96665"
          x2="16.8323"
          y2="16.8661"
          stroke="black"
          strokeWidth="1.8"
        />
        <Line
          x1="6.96335"
          y1="16.8628"
          x2="16.8628"
          y2="6.96335"
          stroke="black"
          strokeWidth="1.8"
        />
      </Svg>
    </Pressable>
  );
};
