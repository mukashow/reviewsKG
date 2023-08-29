import React, { FC } from 'react';
import { Path, Svg, Rect, G, Defs, ClipPath } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const Logo: FC<Props> = props => {
  return (
    <Svg width="49" height="48" viewBox="0 0 49 48" fill="none" {...props}>
      <Rect x="0.5" width="48" height="48" rx="13.7143" fill="#15A3F2" />
      <G clipPath="url(#clip0_101_307)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.5 13.125C33.8 13.125 36.5 15.825 36.5 19.125V25.875C36.5 29.175 33.8 31.875 30.5 31.875H19.475C18.8 31.875 18.2 32.1 17.675 32.475L14.9 34.575C14.225 35.1 13.325 34.95 12.8 34.275C12.575 34.05 12.5 33.675 12.5 33.375V19.125C12.5 15.825 15.2 13.125 18.5 13.125H30.5ZM28.55 20.7C28.175 20.55 27.725 20.7 27.575 21.075C27.05 22.125 25.85 22.875 24.5 22.875C23.15 22.875 21.95 22.125 21.425 21.075C21.275 20.7 20.825 20.55 20.45 20.7C20.075 20.85 19.925 21.3 20.075 21.675C20.825 23.25 22.625 24.375 24.5 24.375C26.375 24.375 28.175 23.325 28.925 21.675C29.075 21.3 28.925 20.85 28.55 20.7Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_101_307">
          <Rect width="24" height="24" fill="white" transform="translate(12.5 12)" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
