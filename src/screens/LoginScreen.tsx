import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AuthBackgroundWrapper from '../components/AuthBackgroundWrapper';
import MyText from '../components/MyText';
import { Theme, useTheme } from '@react-navigation/native';
import MyInput from '../components/MyInput';
import { hp, wp } from '../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import Space from '../components/Space';

export default function LoginScreen() {
  const theme: Theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <AuthBackgroundWrapper>
      <View style={styles.container}>
        <MyText
          fontSize={hp(4)}
          fontFamily="Outfit-Bold"
          color={theme.colors.primary}
          style={styles.title}
        >
          Login{' '}
        </MyText>
        <MyText
          color={'#909194'}
          fontFamily="Outfit-Regular"
          fontSize={hp(1.3)}
          style={styles.subtitle}
        >
          Put your information & login in to the app
        </MyText>

        <Space mB={hp(3)} />
        <MyInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          variant="underline"
          style={styles.inputSpacing}
        />
        <MyInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          variant="underline"
          secureTextEntry
          style={styles.inputSpacing2}
        />

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <EIcon name="mail" size={wp(6)} color="#fff" />
            <MyText fontSize={hp(2.2)} fontFamily="Outfit-SemiBold">
              Continue with Email
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </AuthBackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    justifyContent: 'center',
  },
  title: {
    marginBottom: hp(1.5),
  },
  subtitle: {
    marginBottom: hp(1),
  },
  inputSpacing: {
    marginTop: hp(4),
  },
  inputSpacing2: {
    marginTop: hp(2),
  },
  buttonWrapper: {
    marginTop: hp(4),
  },
  button: {
    backgroundColor: '#212222',
    borderRadius: wp(8),
    alignItems: 'center',
    paddingVertical: hp(2.2),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(2.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.3) },
    shadowOpacity: 0.3,
    shadowRadius: hp(0.5),
    elevation: 5,
  },
});
