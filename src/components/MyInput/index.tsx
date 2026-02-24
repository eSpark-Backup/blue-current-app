import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MyText from '../MyText';
import { Theme, useTheme } from '@react-navigation/native';
import { hp } from '../../utils';

export type MyInputVariant = 'underline' | 'rounded';

interface MyInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  variant?: MyInputVariant;
  secureTextEntry?: boolean;
  style?: any;
  uColor?: string;
  bgColor?: string;
  labelColor?: string;
}

export default function MyInput({
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
}: MyInputProps) {
  const theme: Theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <MyText
        fontSize={hp(1.9)}
        color={labelColor || '#3A3D46'}
        fontFamily="Outfit-SemiBold"
        style={{ marginBottom: hp(1) }}
      >
        {label}
      </MyText>
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {!!value && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            style={styles.clearIcon}
          >
            <Icon name="close-circle" size={20} color="#3A3D46" />
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
    paddingVertical: hp(1.2),
    minHeight: hp(5.5),
    fontFamily: 'Outfit-Regular',
  },
  clearIcon: {
    marginLeft: 8,
  },
  underline: {
    height: 2,
    marginTop: 2,
    borderRadius: 2,
  },
});
