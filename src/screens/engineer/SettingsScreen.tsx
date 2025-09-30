import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import MyText from '../../components/MyText';
import SettingsCard from '../../components/SettingsCard';
import Space from '../../components/Space';

import { hp, wp } from '../../utils';
import { EngineerStackParamList, UserStackParamList } from '../../navigation';
import { ProfileSvg, Settings } from '../../assets/svg';
import Header from '../../components/Header';

const SETTINGS_OPTIONS = [
  {
    icon: <Settings />,
    title: undefined,
    navigateTo: 'EngineerAppSettings',
  },
  {
    icon: <ProfileSvg />,
    title: 'Profile Settings',
    navigateTo: 'EngineerProfile',
  },
];

export default function EngineerSettingsScreen() {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();

  return (
    <View>
      <Header
        isBack
        onBackPress={() => navigation?.goBack?.()}
        isProfile
        isNotification
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Space mB={hp(2.5)} />
        <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
          Settings
        </MyText>
        <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.4)} color="#5E6272">
          Details
        </MyText>
        <View style={styles.divider} />
        {SETTINGS_OPTIONS.map(({ icon, title, navigateTo }, idx) => (
          <React.Fragment key={navigateTo}>
            <SettingsCard
              icon={icon}
              title={title}
              onPress={() => navigation.navigate(navigateTo as any)}
            />
            {idx < SETTINGS_OPTIONS.length - 1 && <Space mB={hp(1.5)} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: wp(6),
  },
  divider: {
    height: 0.4,
    width: '100%',
    backgroundColor: '#5E6272',
    alignSelf: 'center',
    marginVertical: hp(2),
  },
});
