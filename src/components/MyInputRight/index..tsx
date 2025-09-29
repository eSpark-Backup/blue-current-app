import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import MyText from '../MyText';
import { hp } from '../../utils';

export type MyInputVariant = 'underline' | 'rounded';

interface MyInputRightProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  variant?: MyInputVariant;
  secureTextEntry?: boolean;
  style?: any;
  uColor?: string;
  bgColor?: string;
  labelColor?: string;
  /** 👇 New prop */
  RightComponent?: React.ReactNode;
  onRightPress?: () => void;
}

export default function MyInputRight({
  label,
  value,
  onChangeText,
  placeholder,
  variant = 'underline',
  secureTextEntry,
  style,
  uColor,
  bgColor,
  labelColor,
  RightComponent,
  onRightPress,
}: MyInputRightProps) {
  const theme: Theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <MyText
          fontSize={14}
          color={labelColor || '#3A3D46'}
          fontFamily="Outfit-Bold"
          style={{ marginBottom: 4 }}
        >
          {label}
        </MyText>
      )}
      <View
        style={
          variant === 'rounded'
            ? [
                styles.roundedWrapper,
                {
                  borderColor: theme.colors.primary,
                  backgroundColor: bgColor || '#222',
                },
              ]
            : styles.underlineWrapper
        }
      >
        <TextInput
          style={[
            styles.input,
            variant === 'rounded' && { paddingHorizontal: 12 },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#888"
          secureTextEntry={secureTextEntry}
          editable={false}
        />

        {RightComponent && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRightPress}
            style={styles.rightContainer}
          >
            {RightComponent}
          </TouchableOpacity>
        )}
      </View>

      {variant === 'underline' && (
        <View
          style={[styles.underline, { backgroundColor: uColor || '#A5F59C' }]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  underlineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00C9FF',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: hp(1.8),
    paddingVertical: hp(1.5),
    fontFamily: 'Outfit-Regular',
  },
  rightContainer: {
    marginLeft: 8,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    height: 2,
    marginTop: 2,
    borderRadius: 2,
  },
});
