import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
} from 'react-native';
import MyText from '../../components/MyText';
import Header from '../../components/Header';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import { hp } from '../../utils';

import JobCard from '../../components/JobCard';
import { upcomingJobs } from '../../utils/constants';
import { Filter } from '../../assets/svg';
import MapView, { Marker } from 'react-native-maps';
import { FilterActionSheet, FilterOption } from '../../components/FilterActionSheet';
// Example marker data
const jobMarkers = [
  {
    id: 1,
    title: 'Job 1',
    description: 'GrippaMax RODI System',
    coordinate: { latitude: 51.521, longitude: -0.227 },
  },
  {
    id: 2,
    title: 'Job 2',
    description: 'Maintenance Service',
    coordinate: { latitude: 51.523, longitude: -0.225 },
  },
  {
    id: 3,
    title: 'Job 3',
    description: 'Other Service',
    coordinate: { latitude: 51.519, longitude: -0.229 },
  },
];

const ServiceHubScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [activeTab, setActiveTab] = useState<'calendar' | 'list' | 'map'>(
    'calendar',
  );
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false)
  const [filters, setFilters] = useState<FilterOption[]>([
    { id: "completed", label: "Completed", checked: true },
    { id: "todo", label: "To do", checked: true },
    { id: "overdue", label: "Overdue", checked: true },
  ])

  const handleFilterToggle = (filterId: string) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => (filter.id === filterId ? { ...filter, checked: !filter.checked } : filter)),
    )
  }

  const openActionSheet = () => {
    setIsActionSheetVisible(true)
  }

  const closeActionSheet = () => {
    setIsActionSheetVisible(false)
  }

  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Header
        isBack
        onBackPress={() =>
          navigation?.canGoBack?.() ? navigation?.goBack() : null
        }
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

        {/* Tab Content Section */}
        {activeTab === 'calendar' && (
          <>
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

            <TouchableOpacity
              onPress={() => navigation.navigate('CompleteJobs')}
              style={styles.completedJobsButton}
            >
              <MyText
                fontFamily="Gilroy-SemiBold"
                style={styles.completedJobsText}
              >
                View Completed Jobs
              </MyText>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'list' && (
          <View style={styles.section}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 10,
                marginBottom: 20,
              }}
              onPress={openActionSheet}
            >
              <Filter />
              <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(2.4)}>
                Filter
              </MyText>
            </Pressable>
            {upcomingJobs.map((job, index) => (
              <JobCard
                key={index}
                title={job.title}
                technician={job.technician}
                serviceType={job.serviceType}
                daysRemaining={job.daysRemaining}
                isPending
                onStartJob={() => navigation.navigate('UserNotes')}
              />
            ))}
          </View>
        )}

        {activeTab === 'map' && (
          <View style={[styles.section, { flex: 1, minHeight: hp(70) }]}> 
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 51.521,
                longitude: -0.227,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {jobMarkers.map(marker => (
                <Marker
                  key={marker.id}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                />
              ))}
            </MapView>
          </View>
        )}
      </ScrollView>
      <FilterActionSheet
        visible={isActionSheetVisible}
        onClose={closeActionSheet}
        filters={filters}
        onFilterToggle={handleFilterToggle}
      />
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
    map: {
      width: '100%',
      height: hp(60),
      borderRadius: 12,
      marginBottom: 16,
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
