import React, { FC } from 'react';
import { Path, Svg, SvgProps } from 'react-native-svg';

export const ArrowRight: FC<SvgProps> = props => {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <Path
        d="M8.29214 5.42866L8.22218 5.35994L8.15211 5.42854L7.42996 6.13553L7.35709 6.20687L7.42984 6.27833L11.7475 10.5194L7.45872 14.7202L7.38587 14.7916L7.45864 14.863L8.1801 15.5714L8.25008 15.6401L8.32014 15.5714L13.4032 10.5916L13.4761 10.5203L13.4033 10.4488L8.29214 5.42866Z"
        fill="#15A3F2"
        stroke="#15A3F2"
        strokeWidth="0.2"
      />
    </Svg>
  );
};
