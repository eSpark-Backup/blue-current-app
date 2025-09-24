import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import MyText from '../MyText';
import { hp, wp } from '../../utils';

type SettingsCardProps = {
  title?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  isProfile?: boolean;
};

const SettingsCard: React.FC<SettingsCardProps> = ({
  title = 'App Settings',
  onPress,
  icon,
  isProfile = false,
}) => (
  <TouchableOpacity
    style={styles.cardRow}
    onPress={onPress}
    activeOpacity={isProfile ? 1 : 0.7}
    disabled={isProfile}
  >
    <View style={[styles.avatarContainer, isProfile && styles.avatarProfile]}>
      {icon}
    </View>
    <MyText
      fontFamily={isProfile ? 'Outfit-Regular' : 'Outfit-SemiBold'}
      fontSize={hp(2.25)}
      style={styles.text}
    >
      {title}
    </MyText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    gap: hp(1.8),
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.2),
    alignItems: 'center',
  },
  avatarContainer: {
    height: hp(5),
    width: hp(5),
    backgroundColor: '#112830b6',
    borderRadius: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarProfile: {
    backgroundColor: 'transparent',
  },
  text: {
    textAlignVertical: 'center',
  },
});

export default SettingsCard;
