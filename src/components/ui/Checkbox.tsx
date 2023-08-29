import React from 'react';
import { Checked } from '../../assets/icon/Checked';

interface Props {
  checked: boolean;
}

export const Checkbox = ({ checked }: Props) => {
  return <Checked rect={{ fill: checked ? '#23A2FE' : 'white' }} />;
};
