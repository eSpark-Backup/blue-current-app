import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import MyText from '../../components/MyText';
import SettingsCard from '../../components/SettingsCard';
import Space from '../../components/Space';

import { hp, wp } from '../../utils';
import { UserStackParamList } from '../../navigation';
import { ProfileSvg, Settings } from '../../assets/svg';

const SETTINGS_OPTIONS = [
  {
    icon: <Settings />,
    title: undefined,
    navigateTo: 'AppSettings',
  },
  {
    icon: <ProfileSvg />,
    title: 'Profile Settings',
    navigateTo: 'Profile',
  },
];

export default function SettingsScreen() {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();

  return (
    <View style={styles.container}>
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
            onPress={() =>
              navigation.navigate(navigateTo as keyof UserStackParamList)
            }
          />
          {idx < SETTINGS_OPTIONS.length - 1 && <Space mB={hp(1.5)} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
