import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { hp, wp } from '../../utils';
import MyText from '../../components/MyText';
import CustomToggle from '../../components/CustomToggle';
import Space from '../../components/Space';
import GradientButton from '../../components/GradientButton';
import { useNavigation } from '@react-navigation/native';
import { EngineerStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const ServiceSetting = () => {
  const [toggleValue, setToggleValue] = React.useState(false);
  const navigation = useNavigation<StackNavigationProp<EngineerStackParamList>>();
  return (
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.goBack?.()}
      />
      <View style={styles.upcomingServiceBox}>
        <MyText fontFamily="Outfit-SemiBold" fontSize={hp(1.8)}>
          Up Coming service request
        </MyText>
        <CustomToggle
          size="small"
          value={toggleValue}
          onChange={setToggleValue}
        />
      </View>
      <Space mB={hp(1)} />
      <View style={styles.deviceBox}>
        <View style={styles.deviceBoxHeader}>
          <MyText fontFamily="Outfit-SemiBold" fontSize={hp(2.4)}>
            Paired with Device
          </MyText>
          <View style={styles.deviceStatusDot} />
        </View>
        <Space mB={hp(1)} />
        <MyText fontFamily="Outfit-Regular" fontSize={hp(1.4)} color="#5E6272">
          05-08-5 - Today
        </MyText>
        <Space mB={hp(0.5)} />
        <MyText fontFamily="Outfit-Regular" fontSize={hp(1.4)}>
          Service Mode Active
        </MyText>
        <Space mB={hp(0.5)} />
        <GradientButton
          buttonStyle={styles.worksheetButton}
          onPress={() => navigation.navigate('WorkSheet')}
          title="Create WorkSheet"
        />
        <Space mB={hp(1)} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upcomingServiceBox: {
    borderRadius: wp(2.5),
    borderWidth: 0.5,
    borderColor: '#00C9FF',
    paddingHorizontal: wp(4),
    marginHorizontal: wp(4),
    marginTop: hp(2),
    paddingVertical: hp(2),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceBox: {
    margin: wp(4),
    paddingHorizontal: wp(4),
    backgroundColor: '#262A344F',
    paddingVertical: hp(2),
    borderRadius: wp(2.5),
    borderWidth: 1,
    borderColor: '#9797971C',
  },
  deviceBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceStatusDot: {
    backgroundColor: '#6FFF00',
    height: hp(1.8),
    width: hp(1.8),
    borderRadius: 100,
  },
  worksheetButton: {
    marginTop: hp(2),
    width: '50%',
    alignSelf: 'flex-end',
  },
});

export default ServiceSetting;
