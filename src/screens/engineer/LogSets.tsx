import React, { useState } from 'react';
import CustomTabBar from '../../components/CustomTabBar';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { EngineerStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { hp, wp } from '../../utils';
import HealthMetricCard from '../../components/HealthMetricCard';
import { WarningIcon } from '../../assets/images';
import Space from '../../components/Space';

const LogSets = () => {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [activeTab, setActiveTab] = useState('info');

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
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.goBack?.()}
      />
      <View style={{ width: '100%', paddingHorizontal: wp(4) }}>
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
        />
        <Space mB={hp(1.5)} />
        <HealthMetricCard
          icon={WarningIcon}
          title="Info"
          date="20-08-2025"
          update="Update 10weeks ago"
        />
      </View>
    </View>
  );
};

export default LogSets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    marginBottom: 32,
  },
});
