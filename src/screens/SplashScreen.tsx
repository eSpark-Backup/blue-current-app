import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AuthBackgroundWrapper from '../components/AuthBackgroundWrapper';
import { hp } from '../utils';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <AuthBackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/SplashLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </AuthBackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: hp(35),
    height: hp(35),
  },
});

export default SplashScreen;
