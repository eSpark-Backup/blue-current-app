import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import MyText from '../MyText';
import { hp, wp } from '../../utils';

type SettingsCardProps = {
  title?: string;
  subtitle?: string; // 👈 new
  rightText?: string; // 👈 new
  onPress?: () => void;
  icon?: React.ReactNode;
  isProfile?: boolean;
};

const SettingsCard: React.FC<SettingsCardProps> = ({
  title = 'App Settings',
  subtitle,
  rightText,
  onPress,
  icon,
  isProfile = false,
}) => (
  <TouchableOpacity
    style={styles.cardRow}
    onPress={onPress}
    activeOpacity={isProfile || subtitle ? 1 : 0.7}
  >
    {/* Left Section */}
    <View style={styles.leftSection}>
      <View style={[styles.avatarContainer, isProfile && styles.avatarProfile]}>
        {icon}
      </View>
      <View>
        <MyText
          fontFamily={isProfile ? 'Outfit-Regular' : 'Outfit-SemiBold'}
          fontSize={hp(2.25)}
        >
          {title}
        </MyText>
        {subtitle && (
          <MyText
            fontFamily="Outfit-Regular"
            fontSize={hp(1.6)}
            color="#5E6272"
            style={{ marginTop: hp(0.4) }}
          >
            {subtitle}
          </MyText>
        )}
      </View>
    </View>

    {/* Right-aligned text */}
    {rightText && (
      <MyText fontFamily="Outfit-Regular" fontSize={hp(1.6)} color="#5E6272">
        {rightText}
      </MyText>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 👈 keeps rightText aligned right
    paddingHorizontal: wp(3.8),
    paddingVertical: hp(1.2),
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(1.8),
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
});

export default SettingsCard;
