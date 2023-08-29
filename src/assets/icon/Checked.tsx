import React from 'react';
import { Path, Svg, Rect, SvgProps, RectProps } from 'react-native-svg';

interface Props extends SvgProps {
  rect?: RectProps;
}

export const Checked = ({ rect, ...props }: Props) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Rect width="16" height="16" rx="4" fill="#23A2FE" {...rect} />
      <Path
        d="M4.65922 7.7929L4.58876 7.72244L4.51805 7.79265L3.86118 8.44489L3.78997 8.5156L3.86093 8.58656L6.44677 11.1724L6.51748 11.2431L6.58819 11.1724L12.1392 5.62139L12.2099 5.55068L12.1392 5.47997L11.487 4.82773L11.4163 4.75705L11.3456 4.82769L6.51751 9.65119L4.65922 7.7929Z"
        fill="white"
        stroke="white"
        strokeWidth="0.2"
      />
    </Svg>
  );
};
