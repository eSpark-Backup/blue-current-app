import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import MyText from '../../components/MyText';
import SettingsCard from '../../components/SettingsCard';
import Space from '../../components/Space';
import GradientButton from '../../components/GradientButton';

import { hp, wp } from '../../utils';
import { Mail, Phone, ProfileHead } from '../../assets/svg';

const PROFILE = {
  name: 'Olly Smith',
  email: 'Olly@gmail.com',
  phone: '+1234562',
  avatar: 'https://picsum.photos/200',
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Space mB={hp(2.5)} />
      <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
        Profile Settings
      </MyText>
      <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.4)} color="#5E6272">
        Settings
      </MyText>
      <Space mB={hp(2.5)} />
      <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
      <Space mB={hp(3.5)} />
      <SettingsCard icon={<ProfileHead />} title={PROFILE.name} isProfile />
      <SettingsCard icon={<Mail />} title={PROFILE.email} isProfile />
      <SettingsCard icon={<Phone />} title={PROFILE.phone} isProfile />
      <Space mB={hp(3.5)} />
      <GradientButton
        title="Edit"
        onPress={() => {}}
        height={hp(4.85)}
        colors={['#212222', '#004F65']}
        buttonStyle={styles.editButton}
        textStyle={styles.editButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
  },
  avatar: {
    height: hp(15),
    width: hp(15),
    borderRadius: hp(7.5),
    alignSelf: 'center',
  },
  editButton: {
    alignSelf: 'center',
  },
  editButtonText: {
    fontSize: hp(1.6),
    fontFamily: 'Outfit-Medium',
  },
});
