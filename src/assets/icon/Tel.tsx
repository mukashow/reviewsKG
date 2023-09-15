import React from 'react';
import {
  Path,
  Svg,
  SvgProps,
  G,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from 'react-native-svg';

export const Tel = (props: SvgProps): JSX.Element => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_369_606)">
        <Path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="url(#paint0_linear_369_606)"
        />
        <Path
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
          fill="url(#paint1_linear_369_606)"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7268 12.2756C14.0537 14.6019 14.5816 11.9106 16.0632 13.3912C17.4916 14.8191 18.3125 15.1052 16.5028 16.9145C16.2761 17.0966 14.8359 19.2884 9.77427 14.2282C4.71206 9.16737 6.90251 7.72563 7.08473 7.49901C8.89884 5.68478 9.18001 6.51051 10.6084 7.93848C12.09 9.41966 9.3998 9.94928 11.7268 12.2756Z"
          fill="white"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_369_606"
          x1="12"
          y1="0"
          x2="12"
          y2="23.8125"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2AABEE" />
          <Stop offset="1" stopColor="#229ED9" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_369_606"
          x1="1.5"
          y1="-3.07336e-07"
          x2="21"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#3ED62C" />
          <Stop offset="1" stopColor="#29A71A" />
        </LinearGradient>
        <ClipPath id="clip0_369_606">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
