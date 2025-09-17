import React from 'react';
import { Pressable, StyleProp, ViewStyle, TextStyle, DimensionValue } from 'react-native';
import MyText from './MyText';

type AllowedFontFamily =
  | 'Outfit-Regular'
  | 'Gilroy-SemiBold'
  | 'Gilroy-Black'
  | 'Gilroy-BlackItalic'
  | 'Gilroy-BoldItalic'
  | 'Gilroy-ExtraBold'
  | 'Gilroy-HeavyItalic'
  | 'Gilroy-Light'
  | 'Gilroy-LightItalic'
  | 'Gilroy-MediumItalic'
  | 'Gilroy-Medium'
  | 'Gilroy-Regular'
  | 'Gilroy-SemiBoldItalic'
  | 'Gilroy-Thin'
  | 'Gilroy-ThinItalic';

interface MyButtonProps {
  onPress: () => void;
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  height?: DimensionValue;
  width?: DimensionValue;
  disabled?: boolean;
  fontFamily?: AllowedFontFamily;
}

const MyButton: React.FC<MyButtonProps> = ({
  onPress,
  title,
  containerStyle,
  textStyle,
  height,
  width,
  disabled = false,
  fontFamily = 'Outfit-Regular',
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          height: height,
          width: width,
          alignItems: 'center',
          justifyContent: 'center',
        } as ViewStyle,
        containerStyle,
      ]}
      disabled={disabled}
    >
      <MyText fontFamily={fontFamily} style={textStyle as any}>{title}</MyText>
    </Pressable>
  );
};

export default MyButton;