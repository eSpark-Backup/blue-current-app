
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

interface SpaceProps {
  mT?: number;
  mB?: number;
  mR?: number;
  mL?: number;
  mH?: number;
  mV?: number;
  children?: React.ReactNode;
}

const Space: React.FC<SpaceProps> = ({
  mT = 0,
  mB = 0,
  mR = 0,
  mL = 0,
  mH = 0,
  mV = 0,
  children = null,
}) => {
  const style = styles(mT, mB, mR, mL, mH, mV);
  return <View style={style.container}>{children && children}</View>;
};

export default Space;
