import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import MyText from '../../components/MyText';
import { hp } from '../../utils';
import Header from '../../components/Header';
import { upcomingJobs } from '../../utils/constants';
import JobCard from '../../components/JobCard';
import { useNavigation } from '@react-navigation/native';
import { EngineerStackParamList } from '../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const CompleteJobs = () => {
  const navigation = useNavigation<StackNavigationProp<EngineerStackParamList>>();
  return (
    <View style={{ flex: 1 }}>
      <Header isBack onBackPress={() => navigation?.canGoBack() ? navigation.goBack() : null} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp(10), flexGrow: 1 }}
      >
        <View style={{ padding: hp(2) }}>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(2.8)}>
            Completed Jobs
          </MyText>
        </View>
        <FlatList
          scrollEnabled={false}
          data={[...upcomingJobs, ...upcomingJobs, ...upcomingJobs]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <JobCard
              title={item.title}
              technician={item.technician}
              serviceType={item.serviceType}
              daysRemaining={item.daysRemaining}
              isCompleted
              style={{ marginBottom: hp(2), marginHorizontal: hp(2) }}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default CompleteJobs;
