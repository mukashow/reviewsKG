import React, { FC } from 'react';
import { Path, Svg } from 'react-native-svg';

export const Phone: FC = props => {
  return (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.68791 8.81492C10.3473 11.4736 10.9506 8.39781 12.6438 10.0899C14.2763 11.7218 15.2145 12.0488 13.1462 14.1165C12.8872 14.3247 11.2412 16.8295 5.45648 11.0464C-0.328904 5.26266 2.17447 3.61496 2.38273 3.35596C4.45599 1.28256 4.77732 2.22625 6.40974 3.85822C8.10299 5.55099 5.02852 6.15627 7.68791 8.81492Z"
        fill="white"
      />
    </Svg>
  );
};
