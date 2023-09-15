import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  svg?: SvgProps;
}

export const BackButton = ({ svg, ...props }: Props) => {
  return (
    <TouchableOpacity {...props}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...svg}>
        <Path
          d="M13.9933 18.1427L14.1332 18.2801L14.2733 18.1429L15.1399 17.2945L15.2856 17.1518L15.1401 17.0089L10.0171 11.9768L15.1054 6.99288L15.2511 6.85017L15.1056 6.70729L14.2398 5.85729L14.0999 5.71987L13.9598 5.85713L7.86004 11.8329L7.7144 11.9756L7.85985 12.1185L13.9933 18.1427Z"
          fill="#0E1232"
          stroke="#0E1232"
          strokeWidth="0.4"
        />
      </Svg>
    </TouchableOpacity>
  );
};
