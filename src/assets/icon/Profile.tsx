import React from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

export const Profile = ({ fill = '#8B8B8B', width = 19, height = 19 }: SvgProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 19" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.4705 5.96829C13.4705 8.17106 11.7043 9.93733 9.5 9.93733C7.29642 9.93733 5.52951 8.17106 5.52951 5.96829C5.52951 3.76552 7.29642 2 9.5 2C11.7043 2 13.4705 3.76552 13.4705 5.96829ZM9.5 17C6.24678 17 3.5 16.4712 3.5 14.4312C3.5 12.3905 6.26404 11.8804 9.5 11.8804C12.754 11.8804 15.5 12.4092 15.5 14.4492C15.5 16.49 12.736 17 9.5 17Z"
        fill={fill}
      />
    </Svg>
  );
};
