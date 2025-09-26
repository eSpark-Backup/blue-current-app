import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MyText from '../../components/MyText';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import GradientButton from '../../components/GradientButton';
import SelectableGrid from '../../components/SelectableGrid';
import Space from '../../components/Space';
import { hp, wp } from '../../utils';
import { CalculatorStats, HistoryStats, SettingStats } from '../../assets/svg';
import { InstalledDateIcon, LastServiceIcon, WarningIcon } from '../../assets/images';
import HealthMetricCard from '../../components/HealthMetricCard';
import CustomToggle from '../../components/CustomToggle';

export default function ExploreScreen() {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [selected, setSelected] = useState(0);
  const gridData = [
    { title: '2,3,4', description: 'Current\nFirm Ware Version', icon: null },
    { title: '5,3,4', description: 'Current\nLog sets', icon: null },
    { title: 'Off', description: 'Watchlist\nDevices', icon: null, isDisabled: true },
    { title: '2,3,4', description: 'Services Settings', icon: <SettingStats /> },
    { title: '2,3,4', description: 'Calculators', icon: <CalculatorStats /> },
    { title: '2,3,4', description: 'History Usage', icon: <HistoryStats /> },
  ];

  return (
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.goBack?.()}
      />
      <View style={styles.headerRow}>
        <View>
          <MyText fontFamily="Outfit-SemiBold" fontSize={36}>
            Dev123
          </MyText>
          <MyText fontFamily="Outfit-SemiBold" fontSize={14} color="#5E6272">
            Jimmy johnes
          </MyText>
        </View>
        <GradientButton
          title="Device Overview"
          onPress={() => navigation.navigate('DeviceOverview')}
          buttonStyle={styles.deviceOverviewButton}
        />
      </View>
      <View style={styles.divider80} />
      <View style={styles.contentContainer}>
        <Space mB={hp(1)} />
        <SelectableGrid
          data={gridData}
          selectedIndex={selected}
          onSelect={(e) => {
            setSelected(e);
            if (e === 0) {
              navigation.navigate('DeviceVersion');
            }else if (e === 1) {
              navigation.navigate('LogSets');
            }else if (e === 2) {
              navigation.navigate('ServiceSetting');
            }else if (e === 3) {
              navigation.navigate('ServiceSetting');
            }
          }}
          numColumns={3}
          children={(item, idx, isSelected) => (
            <View
              style={[
                styles.gridItem,
                item?.icon && styles.gridItemCenter,
              ]}
            >
              {item?.icon ? (
                <View style={styles.gridIcon}>{item?.icon}</View>
              ) : (
                <MyText fontFamily="Outfit-SemiBold" fontSize={24}>
                  {item.title}
                </MyText>
              )}
              <MyText fontFamily="Outfit-Medium" fontSize={10}>
                {item.description}
              </MyText>
            </View>
          )}
        />
        <Space mB={hp(1.3)} />
        <View style={styles.divider85} />
        <View style={styles.metricsContainer}>
          <MyText
            fontFamily="Outfit-SemiBold"
            fontSize={24}
            style={styles.metricsTitle}
          >
            Health Metrics
          </MyText>
          <Space mB={hp(1.3)} />
          <HealthMetricCard
            icon={InstalledDateIcon}
            title="Installed Date"
            date="12/03/2023"
            update="Update 10weeks ago"
          />
          <Space mB={hp(1.3)} />
          <HealthMetricCard
            icon={LastServiceIcon}
            title="Last Services"
            date="12/03/2023"
            update="Update 10weeks ago"
          />
          <Space mB={hp(1.3)} />
          <HealthMetricCard
            icon={WarningIcon}
            title="Warning"
            date="12/03/2023"
            update="Update 10weeks ago"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    padding: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: wp(2.5),
  },
  deviceOverviewButton: {
    borderRadius: wp(2),
  },
  divider80: {
    height: 0.4,
    width: '80%',
    backgroundColor: '#5E6272',
    alignSelf: 'center',
  },
  divider85: {
    height: 0.4,
    width: '85%',
    backgroundColor: '#5E6272',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  gridItem: {
    paddingVertical: hp(0.6),
    paddingHorizontal: wp(4),
    alignItems: 'flex-start',
  },
  gridItemCenter: {
    alignItems: 'center',
  },
  gridIcon: {
    marginBottom: hp(1.2),
  },
  metricsContainer: {
    paddingHorizontal: wp(3.5),
  },
  metricsTitle: {
    marginTop: hp(1.3),
  },
});