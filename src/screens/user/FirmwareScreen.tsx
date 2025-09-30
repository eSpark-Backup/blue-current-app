import React, { useState } from 'react';
import CustomTabBar from '../../components/CustomTabBar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Space from '../../components/Space';
import MyText from '../../components/MyText';
import HealthMetricCard from '../../components/HealthMetricCard';

import { UserStackParamList } from '../../navigation';
import { hp, wp } from '../../utils';
import { WarningIcon } from '../../assets/images';

type FirmwareRouteProp = RouteProp<UserStackParamList, 'Firmware'>;

const FirmwareScreen = () => {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();
  const [activeTab, setActiveTab] = useState('info');
  const route = useRoute<FirmwareRouteProp>();

  const fromRequestEngineer = route.params?.fromRequestEngineer;

  const handleSelectLog = (logId: string) => {
    if (fromRequestEngineer) {
      navigation.navigate('RequestEngineer', { selectedLog: logId }); // ✅ send back
    }
  };

  const tabs = [
    { id: 'info', label: 'Info' },
    { id: 'warning', label: 'Warning' },
    { id: 'error', label: 'Error' },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Active tab changed to:', tabId);
  };
  return (
    <ScrollView style={styles.container}>
      <Space mB={hp(2.5)} />
      <MyText fontFamily="Outfit-Bold" fontSize={hp(2.8)}>
        Log Sets
      </MyText>
      <Space mB={hp(2.5)} />
      <View>
        <CustomTabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          style={styles.tabBarContainer}
        />
        <Space mB={hp(5)} />
        <HealthMetricCard
          icon={WarningIcon}
          title="Info"
          date="20-08-2025"
          update="Update 10weeks ago"
          onPress={() => handleSelectLog('log1')}
        />
        <Space mB={hp(1.5)} />
        <HealthMetricCard
          icon={WarningIcon}
          title="Info"
          date="20-08-2025"
          onPress={() => handleSelectLog('log2')}
          update="Update 10weeks ago"
        />
      </View>
    </ScrollView>
  );
};

export default FirmwareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
  },
  tabBarContainer: {
    // marginBottom: 32,
  },
});
