import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import MyText from '../../components/MyText';
import Header from '../../components/Header';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import { hp } from '../../utils';

interface JobCardProps {
  title: string;
  technician: string;
  serviceType: string;
  daysRemaining: number;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  technician,
  serviceType,
  daysRemaining,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.jobCard}>
      <View style={styles.jobInfo}>
        <MyText fontFamily='Gilroy-SemiBold' style={styles.jobTitle}>{title}</MyText>
        <MyText fontFamily='Gilroy-Regular' style={styles.jobTechnician}>{technician}</MyText>
        <MyText fontFamily='Gilroy-Regular' style={styles.jobServiceType}>{serviceType}</MyText>
      </View>
      <View style={styles.daysContainer}>
        <MyText fontFamily='Gilroy-SemiBold' style={styles.daysNumber}>{daysRemaining}</MyText>
        <MyText fontFamily='Gilroy-Regular' style={styles.daysText}>Days</MyText>
      </View>
    </View>
  );
};

const ServiceHubScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [activeTab, setActiveTab] = useState<'calendar' | 'list' | 'map'>(
    'calendar',
  );

  const upcomingJobs = [
    {
      title: 'GrippaMax RODI System',
      technician: 'John Doe',
      serviceType: 'Maintenance Service',
      daysRemaining: 3,
    },
    {
      title: 'GrippaMax RODI System',
      technician: 'John Doe',
      serviceType: 'Maintenance Service',
      daysRemaining: 3,
    },
    {
      title: 'GrippaMax RODI System',
      technician: 'John Doe',
      serviceType: 'Maintenance Service',
      daysRemaining: 3,
    },
  ];

  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header
        isBack
        onBackPress={() =>
          navigation?.canGoBack?.() ? navigation?.goBack() : null
        }
        title={'Service Worksheet'}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(2.8)}>
            Service Hub
          </MyText>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'calendar' && styles.activeTab]}
            onPress={() => setActiveTab('calendar')}
          >
            <MyText
              fontFamily="Gilroy-SemiBold"
              style={[
                styles.tabText,
                activeTab === 'calendar' && styles.activeTabText,
              ]}
            >
              Calendar
            </MyText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'list' && styles.activeTab]}
            onPress={() => setActiveTab('list')}
          >
            <MyText
              fontFamily="Gilroy-SemiBold"
              style={[
                styles.tabText,
                activeTab === 'list' && styles.activeTabText,
              ]}
            >
              list
            </MyText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'map' && styles.activeTab]}
            onPress={() => setActiveTab('map')}
          >
            <MyText
              fontFamily="Gilroy-SemiBold"
              style={[
                styles.tabText,
                activeTab === 'map' && styles.activeTabText,
              ]}
            >
              Map
            </MyText>
          </TouchableOpacity>
        </View>

        {/* Upcoming Jobs Section */}
        <View style={styles.section}>
          <MyText fontFamily="Gilroy-SemiBold" style={styles.sectionTitle}>
            Upcoming Jobs
          </MyText>

          {upcomingJobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              technician={job.technician}
              serviceType={job.serviceType}
              daysRemaining={job.daysRemaining}
            />
          ))}
        </View>

        {/* View Completed Jobs Button */}
        <TouchableOpacity style={styles.completedJobsButton}>
          <MyText fontFamily="Gilroy-SemiBold" style={styles.completedJobsText}>
            View Completed Jobs
          </MyText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ServiceHubScreen;

const useStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 24,
    },
    header: {
      marginTop: 20,
      marginBottom: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: 32,
      gap: 0,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#181A209C',
      borderWidth: 1,
      borderColor: '#9797971C',
    },
    tab: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: colors.primary,
      borderRadius: 10,
    },
    tabText: {
      //   fontSize: 16,
      //   fontWeight: '500',
      fontSize: hp(1.8),
      color: '#9CA3AF',
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    section: {
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 24,
      color: '#FFFFFF',
      marginBottom: 20,
    },
    jobCard: {
      backgroundColor: '#181A209C',
      borderWidth: 1,
      borderColor: '#9797971C',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    jobInfo: {
      flex: 1,
    },
    jobTitle: {
      fontSize: 18,
      color: '#FFFFFF',
      marginBottom: 4,
    },
    jobTechnician: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom: 2,
    },
    jobServiceType: {
      fontSize: 14,
      color: '#6B7280',
    },
    daysContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 16,
    },
    daysNumber: {
      fontSize: 48,
      color: colors.primary,
      lineHeight: 48,
    },
    daysText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
    completedJobsButton: {
      backgroundColor: '#181A209C',
      borderWidth: 1,
      borderColor: '#9797971C',
      borderRadius: 12,
      paddingVertical: 20,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
    },
    completedJobsText: {
      fontSize: hp(2.1),
    },
  });
};
