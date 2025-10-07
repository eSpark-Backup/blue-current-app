import React, { useState } from 'react';
import { View, FlatList, ScrollView, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import MyText from '../../components/MyText';
import Header from '../../components/Header';
import Space from '../../components/Space';
import DeviceCard from '../../components/DeviceCard';
import CustomizationSheet from '../../components/CustomizationSheet';
import HomeJobCard from '../../components/HomeJobCard';

import { hp, wp } from '../../utils';
import {
  HomeNearbyDevices,
  HomeNearbyDevicesWhite,
  HomeSchedService,
  HomeSchedServiceWhite,
  HomeScheduleIconSvg,
  HomeScheduleServiceWhite,
  HomeStartServiceIcon,
  HomeStartServiceWhite,
  HomeStartTask,
  HomeStartTaskWhite,
  HomeSystemIcon,
  HomeSystemWhite,
} from '../../assets/svg';

import { connectedDevices, inProgressJobs } from '../../utils/constants';
import { EngineerStackParamList } from '../../navigation';

export default function HomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  const [customizationVisible, setCustomizationVisible] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([
    'system',
    'schedule',
    'start',
  ]);

  const tiles = [
    {
      id: 'system',
      title: 'Check my System',
      icon: <HomeSystemIcon />,
      sheetIcon: <HomeSystemWhite />,
    },
    {
      id: 'schedule',
      title: 'View my Schedule',
      icon: <HomeScheduleIconSvg />,
      sheetIcon: <HomeScheduleServiceWhite />,
    },
    {
      id: 'start',
      title: 'Start a Service',
      icon: <HomeStartServiceIcon />,
      sheetIcon: <HomeStartServiceWhite />,
    },
    {
      id: 'devices',
      title: 'Nearby Devices',
      icon: <HomeNearbyDevices />,
      sheetIcon: <HomeNearbyDevicesWhite />,
    },
    {
      id: 'service',
      title: 'Schedule Service',
      icon: <HomeSchedService />,
      sheetIcon: <HomeSchedServiceWhite />,
    },
    {
      id: 'task',
      title: 'Start New Task',
      icon: <HomeStartTask />,
      sheetIcon: <HomeStartTaskWhite />,
    },
  ];
  const displayedTiles = tiles.filter(t => selectedTiles.includes(t.id));

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
            {displayedTiles.map(tile => (
              <Pressable
                key={tile.id}
                onLongPress={() => setCustomizationVisible(true)}
                style={styles.card}
              >
                {tile.icon}
                <MyText
                  style={{ textAlign: 'center' }}
                  fontFamily="Gilroy-Medium"
                  fontSize={hp(1.6)}
                >
                  {tile.title}
                </MyText>
              </Pressable>
            ))}
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

      <CustomizationSheet
        visible={customizationVisible}
        setVisible={setCustomizationVisible}
        selectedTiles={selectedTiles}
        setSelectedTiles={setSelectedTiles}
        allTiles={tiles}
      />
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
