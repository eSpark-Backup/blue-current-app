import React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import MyText from '../../components/MyText';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import Space from '../../components/Space';
import { hp, wp } from '../../utils';
import {
  InstalledDateIcon,
  IOTChip,
  LastServiceIcon,
  WarningIcon,
} from '../../assets/images';
import HealthMetricCard from '../../components/HealthMetricCard';
import GradientButton from '../../components/GradientButton';
import LoadingSheet from '../../components/LoadingSheet';
import ConfirmationModal from '../../components/ConfirmationModal';
import { ModalSuccessSvg } from '../../assets/svg';

export default function DeviceVersion() {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [showLoader, setShowLoader] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const gridData = [
    {
      title: '2,3,4',
      description: 'Current\nFirm Ware Version',
      icon: null,
    },
    { title: '5,3,4', description: 'Current\nLog sets', icon: null },
    { title: '2,3,4', description: 'Watchlist\nDevices', icon: null },
    {
      title: '2,3,4',
      description: 'Services Settings',
      icon: <Image source={InstalledDateIcon} />,
    },
    {
      title: '2,3,4',
      description: 'Calculators',
      icon: <Image source={LastServiceIcon} />,
    },
    {
      title: '2,3,4',
      description: 'History Usage',
      icon: <Image source={WarningIcon} />,
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.goBack?.()}
      />
      <View style={styles.innerContainer}>
        <Space mB={hp(2)} />
        <View style={styles.centeredView}>
          <Image source={IOTChip} style={styles.iotChip} />
          <MyText
            fontFamily="Outfit-Regular"
            fontSize={18}
            style={styles.currentVersionText}
          >
            Current Version
          </MyText>
          <MyText fontFamily="Outfit-Medium" fontSize={20} color="#979797">
            v1.2.3
          </MyText>
        </View>
        <Space mB={hp(3)} />
        <HealthMetricCard
          icon={InstalledDateIcon}
          title="Installed Date"
          date="12/03/2023"
          update="Update 10weeks ago"
        />
        <Space mB={hp(1)} />
        <HealthMetricCard
          icon={LastServiceIcon}
          title="Last Services"
          date="12/03/2023"
          update="Update 10weeks ago"
        />
        <Space mB={hp(2)} />
        <View style={styles.whatsNewContainer}>
          <MyText fontFamily="Outfit-Regular" fontSize={15.5}>
            What's New
          </MyText>
          <Space mB={hp(2)} />
          <MyText fontFamily="Outfit-Regular" fontSize={13} color="#939399">
            Released on:
          </MyText>
          <MyText fontFamily="Outfit-Regular" fontSize={15.5}>
            26-07-2502
          </MyText>
          <Space mB={hp(2)} />
          <MyText fontFamily="Outfit-Regular" fontSize={13} color="#939399">
            Features:
          </MyText>
          {[
            'Improved flow measurement accuracy',
            'Enhanced device connectivity',
            'Bug fixes and performance improvements',
          ].map((feature, idx) => (
            <MyText fontFamily="Outfit-Regular" fontSize={15.5} key={idx}>
              {`\u2022 ${feature}`}
            </MyText>
          ))}

          <GradientButton
            title="Update Now"
            onPress={() => {
              setShowLoader(true);
            }}
            buttonStyle={styles.updateButton}
          />
        </View>
      </View>

      <LoadingSheet
        visible={showLoader}
        onComplete={() => {
          setShowLoader(false);
          setShowConfirmation(true);
        }}
        title="Updating New Version"
        headerTitle='Detected'
        setVisible={setShowLoader}
        isHeader={true}
      />

      <ConfirmationModal
        icon={<ModalSuccessSvg />}
        isVisible={showConfirmation}
        setIsVisible={setShowConfirmation}
        title="Successfully Update"
        description="Your new firmware version is updates"
        onContinue={() => setShowConfirmation(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: wp(4),
    flex: 1,
  },
  centeredView: {
    alignItems: 'center',
  },
  iotChip: {
    width: wp(25),
    height: hp(11.5),
  },
  currentVersionText: {
    marginTop: hp(1),
  },
  whatsNewContainer: {
    padding: wp(4),
  },
  updateButton: {
    borderRadius: 10,
    height: hp(5),
    marginTop: hp(3),
    alignSelf: 'center',
  },
});
