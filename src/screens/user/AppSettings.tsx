import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import MyText from '../../components/MyText';
import ToggleCard from '../../components/ToggleCard';
import Space from '../../components/Space';
import { hp, wp } from '../../utils';

const TOGGLE_OPTIONS = [
  'Update',
  'Notifications',
  'Reminders Alert',
  'Mode (Dark/Light)',
];

export default function AppSettingsScreen() {
  const [toggleValue, setToggleValue] = useState(false); //tbu

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
  },
});
