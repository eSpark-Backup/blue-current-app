import React, { use } from 'react';
import { Touchable, TouchableOpacity, View, StyleSheet } from 'react-native';
import { LeftArrow, NotificationSvg, ProfileSvg } from '../../assets/svg';
import Space from '../Space';
import { hp, wp } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, useTheme } from '@react-navigation/native';

const Header = ({
  isBack = false,
  onBackPress = () => {},
  isNotification = false,
  onNotificationPress = () => {},
  isProfile = false,
  onProfilePress = () => {},
}) => {
  const insets = useSafeAreaInsets();
  const theme: Theme = useTheme();
  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top,
          borderBottomColor: theme.colors.primary,
        },
      ]}
    >
      <View>
        {isBack && (
          <TouchableOpacity onPress={onBackPress}>
            <LeftArrow />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.rightContainer}>
        {isNotification && (
          <TouchableOpacity onPress={onNotificationPress}>
            <NotificationSvg />
          </TouchableOpacity>
        )}
        <Space mR={hp(1)} />
        {isProfile && (
          <TouchableOpacity onPress={onProfilePress}>
            <ProfileSvg />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.2),
    width: wp(100),
    paddingBottom: hp(1.8),
    borderBottomWidth: 0.5,
    marginBottom: hp(1.2),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
