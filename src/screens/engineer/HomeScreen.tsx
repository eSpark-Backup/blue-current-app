import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import MyText from '../../components/MyText';
import Header from '../../components/Header';
import { hp, wp } from '../../utils';
import { StyleSheet } from 'react-native';
import Space from '../../components/Space';
import {
  HomeScheduleIconSvg,
  HomeStartServiceIcon,
  HomeSystemIcon,
} from '../../assets/svg';
import DeviceCard from '../../components/DeviceCard';
import { connectedDevices, inProgressJobs } from '../../utils/constants';
import HomeJobCard from '../../components/HomeJobCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<EngineerStackParamList>>();
  return (
    <View style={styles.container}>
      <Header
        isBack
        isNotification
        isProfile
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        nestedScrollEnabled={true}
      >
        <View>
          <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
            Hello Olly,
          </MyText>
          <MyText
            fontFamily="Gilroy-Regular"
            fontSize={hp(1.4)}
            color="#5E6272"
          >
            GOOD MORNING
          </MyText>
        </View>
        <Space mB={hp(2)} />
        <View>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(1.8)}>
            What Would you like to do today?
          </MyText>
          <View style={styles.cardRow}>
            <View style={styles.card}>
              <HomeSystemIcon />
              <MyText
                style={{ textAlign: 'center' }}
                fontFamily="Gilroy-Medium"
                fontSize={hp(1.6)}
              >
                Check my System
              </MyText>
            </View>
            <View style={styles.card}>
              <HomeScheduleIconSvg />
              <MyText
                style={{ textAlign: 'center' }}
                fontFamily="Gilroy-Medium"
                fontSize={hp(1.6)}
              >
                View my Schedule
              </MyText>
            </View>
            <View style={styles.card}>
              <HomeStartServiceIcon />
              <MyText
                style={{ textAlign: 'center' }}
                fontFamily="Gilroy-Medium"
                fontSize={hp(1.6)}
              >
                Start a Service
              </MyText>
            </View>
          </View>
        </View>
        <Space mB={hp(2)} />
        <View>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(1.8)}>
            In Progress & Next 24 hours Jobs
          </MyText>
          <Space mB={hp(2)} />
          <FlatList
            data={inProgressJobs}
            renderItem={({ item }) => <DeviceCard {...item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <Space mR={wp(4)} />}
          />
        </View>
        <Space mB={hp(2)} />
        <View>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(1.8)}>
            Connected Devices
          </MyText>
          <Space mB={hp(2)} />
          <FlatList
            data={connectedDevices}
            renderItem={({ item }) => <DeviceCard {...item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <Space mR={wp(4)} />}
          />
        </View>
        <Space mB={hp(2)} />
        <View>
          <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(1.8)}>
            Connected Devices
          </MyText>
          <Space mB={hp(2)} />
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item, index }) => (
              <HomeJobCard key={index.toString()} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <Space mR={wp(4)} />}
            scrollEnabled={false}
          />
          <Space mB={hp(2)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    paddingHorizontal: wp(6),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  card: {
    backgroundColor: '#00131B',
    height: hp(12),
    width: wp(28),
    borderRadius: wp(3),
    padding: wp(3),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
