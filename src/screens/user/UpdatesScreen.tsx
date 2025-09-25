import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import MyText from '../../components/MyText';
import Space from '../../components/Space';
import SettingsCard from '../../components/SettingsCard';

import { DeviceLogo, InstallLogo, VersionLogo } from '../../assets/svg';
import { hp, wp } from '../../utils';

const CURRENT_VERSION = 'v1.2.3';
const INSTALLED_DATE = '20-08-2025';
const INSTALLED_TIME = '10:30 AM';
const NEW_VERSION = 'V.5678';

export default function UpdatesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <DeviceLogo width={hp(10)} height={hp(10)} />
        <Space mB={hp(1)} />
        <MyText>Current Version</MyText>
        <MyText color="#979797">{CURRENT_VERSION}</MyText>
      </View>
      <SettingsCard
        icon={<InstallLogo />}
        title="Installed Date"
        subtitle={INSTALLED_DATE}
        rightText={INSTALLED_TIME}
      />
      <SettingsCard
        icon={<VersionLogo />}
        title="New Version Available"
        subtitle={NEW_VERSION}
        rightText="Updated"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
  },
  content: {
    paddingVertical: hp(2),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
});
