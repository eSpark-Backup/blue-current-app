import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyText from './MyText';

import { DimensionValue } from 'react-native';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  colors?: string[];
  height?: DimensionValue;
  width?: DimensionValue;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  activeOpacity?: number;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  colors = ['#1396B9', '#004F65'],
  height = 48,
  width = 142,
  buttonStyle,
  textStyle,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  activeOpacity = 0.8,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={[
          {
            height,
            width,
            borderRadius: 5.42,
            justifyContent: 'center',
            alignItems: 'center',
          },
          buttonStyle,
        ]}
      >
        <MyText style={[
          { color: '#fff', fontSize: 16, fontWeight: '600' as const },
          ...((textStyle ? (Array.isArray(textStyle) ? textStyle : [textStyle]) : []) as TextStyle[])
        ]}>{title}</MyText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
