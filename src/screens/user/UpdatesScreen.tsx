import React, { memo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import MyText from '../../components/MyText';
import Space from '../../components/Space';
import SettingsCard from '../../components/SettingsCard';
import MyButton from '../../components/MyButton';
import SubscriptionList from '../../components/SubscriptionList';

import { DeviceLogo, InstallLogo, VersionLogo } from '../../assets/svg';
import { hp, wp } from '../../utils';

const CURRENT_VERSION = 'v1.2.3';
const INSTALLED_DATE = '20-08-2025';
const INSTALLED_TIME = '10:30 AM';
const NEW_VERSION = 'V.5678';
const RELEASE_DATE = '26-07-2025';

const FEATURES = [
  'Improved flow measurement accuracy',
  'Bug Fixes in data logging',
  'Optimized battery consumption',
];

const SUBSCRIPTIONS = [
  {
    title: 'Basic Subscription',
    price: '$0.00/mn',
    features: FEATURES,
    isCurrent: true,
    onPress: () => {},
  },
  {
    title: 'Better Subscription',
    price: '$12.99/wk',
    features: FEATURES,
    onPress: () => console.log('Upgrade clicked'),
  },
  {
    title: 'Golden Subscription',
    price: '$24.99/wk',
    features: FEATURES,
    onPress: () => console.log('Upgrade clicked'),
  },
];

const FeatureItem = memo(({ text }: { text: string }) => (
  <View style={styles.featureItem}>
    <View style={styles.bullet} />
    <MyText fontSize={hp(1.6)}>{text}</MyText>
  </View>
));

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
      <Space mB={hp(2.5)} />

      <View>
        <MyText>What's New</MyText>
        <Space mB={hp(2.5)} />

        <MyText fontSize={hp(1.5)} color="#979797">
          Released On
        </MyText>
        <MyText fontSize={hp(1.6)}>{RELEASE_DATE}</MyText>
        <Space mB={hp(2.5)} />

        <MyText fontSize={hp(1.5)} color="#979797">
          Features
        </MyText>
        {FEATURES.map(feature => (
          <FeatureItem key={feature} text={feature} />
        ))}
      </View>

      <MyButton
        title="Update"
        onPress={() => {}}
        containerStyle={styles.button}
      />

      <MyText>Current Subscription</MyText>
      <SubscriptionList data={SUBSCRIPTIONS} />
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
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    paddingLeft: wp(2),
    marginBottom: hp(0.1),
  },
  bullet: {
    width: 3,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  button: {
    backgroundColor: '#00C9FF',
    borderRadius: 8,
    paddingVertical: hp(0.5),
    width: '40%',
    alignSelf: 'center',
    marginVertical: hp(3.4),
  },
});
