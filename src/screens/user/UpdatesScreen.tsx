import React, { memo, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import MyText from '../../components/MyText';
import Space from '../../components/Space';
import SettingsCard from '../../components/SettingsCard';
import MyButton from '../../components/MyButton';
import SubscriptionList from '../../components/SubscriptionList';
import PaymentSheet from '../../components/PaymentSheet';
import ConfirmationModal from '../../components/ConfirmationModal';
import LoadingSheet from '../../components/LoadingSheet';

import {
  DeviceLogo,
  InstallLogo,
  ModalSuccessSvg,
  VersionLogo,
} from '../../assets/svg';
import { hp, wp } from '../../utils';
import { UserStackParamList } from '../../navigation';

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

const FeatureItem = memo(({ text }: { text: string }) => (
  <View style={styles.featureItem}>
    <View style={styles.bullet} />
    <MyText fontSize={hp(1.6)}>{text}</MyText>
  </View>
));

type UpdatesRouteProp = RouteProp<UserStackParamList, 'Updates'>;

export default function UpdatesScreen() {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();
  const route = useRoute<UpdatesRouteProp>();
  const isUpdating = route.params?.isUpdating;

  const [showPayment, setShowPayment] = useState(false); // ⬅️ state to toggle sheet
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPackageLoader, setShowPackageLoader] = useState(false);

  useEffect(() => {
    if (isUpdating) {
      setShowPackageLoader(true); // open loader immediately
    }
  }, [isUpdating]);

  const handleUpgradePress = (planTitle: string) => {
    setSelectedPlan(planTitle);
    setShowPayment(true);
  };

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
      onPress: () => handleUpgradePress('Better Subscription'),
    },
    {
      title: 'Golden Subscription',
      price: '$24.99/wk',
      features: FEATURES,
      onPress: () => handleUpgradePress('Golden Subscription'),
    },
  ];
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
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
          onPress={() => {
            setShowLoader(true);
          }}
          containerStyle={styles.button}
        />

        <MyText>Current Subscription</MyText>
        <SubscriptionList data={SUBSCRIPTIONS} />
      </ScrollView>
      <LoadingSheet
        visible={showLoader}
        onComplete={() => {
          setShowLoader(false);
          setShowConfirmation(true);
        }}
        title="Updating New Version"
        headerTitle="Detected"
        setVisible={setShowLoader}
        isHeader={true}
      />
      <LoadingSheet
        visible={showPackageLoader}
        onComplete={() => {
          setShowPackageLoader(false);
          setShowConfirmation(true);
        }}
        title="Updating your package"
        headerTitle="Processing"
        setVisible={setShowPackageLoader}
        isHeader={true}
      />
      <ConfirmationModal
        icon={<ModalSuccessSvg />}
        isVisible={showConfirmation}
        setIsVisible={setShowConfirmation}
        title="Successfully Update"
        description={
          'Your new ' +
          (isUpdating ? 'package' : 'firmware version') +
          '  is updated successfully.'
        }
        onContinue={() => setShowConfirmation(false)}
      />
      <PaymentSheet
        visible={showPayment}
        setVisible={setShowPayment}
        onPress={() => {
          navigation.navigate('CardDetails', { plan: selectedPlan! });
          setShowPayment(false);
        }}
      />
    </>
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
