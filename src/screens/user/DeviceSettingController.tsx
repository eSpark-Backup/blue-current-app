import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import MyText from '../../components/MyText';
import ToggleCard from '../../components/ToggleCard';
import Space from '../../components/Space';
import { hp, wp } from '../../utils';
import Header from '../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList, UserStackParamList } from '../../navigation';

const TOGGLE_OPTIONS = [
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
  'Lorem Ipsum',
];

export default function DeviceSettingController() {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();
  const params = useRoute().params as { title?: string };

  return (
    <View>
      <Header
        isBack
        isNotification
        isProfile
        onBackPress={() => navigation?.navigate('DeviceOverview')}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Space mB={hp(2.5)} />
        <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
          {params?.title ?? 'Turbidity'}
        </MyText>
        <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.4)} color="#5E6272">
          Resolve the issuesby:
        </MyText>
        <Space mB={hp(3.5)} />

        {TOGGLE_OPTIONS.map((title, index) => (
          <ToggleCard
            trackOnColor="#246BFD"
            key={`${index}-${title}`}
            title={title}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: wp(6),
  },
});
