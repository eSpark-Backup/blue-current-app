import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import MyText from '../../components/MyText';
import ToggleCard from '../../components/ToggleCard';
import Space from '../../components/Space';
import { hp, wp } from '../../utils';
import Header from '../../components/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { EngineerStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';

const TOGGLE_OPTIONS = [
  'Update',
  'Notifications',
  'Reminders Alert',
  'Mode (Dark/Light)',
];

export default function EngineerAppSettings() {
  const [toggleValue, setToggleValue] = useState(false); //tbu
  const navigation =
    useNavigation<StackNavigationProp<EngineerStackParamList>>();
  return (
    <View>
      <Header
        isBack
        onBackPress={() => navigation?.navigate?.("Settings")}
        isProfile
        isNotification
      />
      <ScrollView style={styles.container}>
        <Space mB={hp(2.5)} />
        <MyText fontFamily="Outfit-Bold" fontSize={hp(3.6)}>
          App Settings
        </MyText>
        <MyText fontFamily="Gilroy-Regular" fontSize={hp(1.4)} color="#5E6272">
          Settings
        </MyText>
        <Space mB={hp(3.5)} />

        {TOGGLE_OPTIONS.map(title => (
          <ToggleCard key={title} title={title} />
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
