import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { LeftArrow, NotificationSvg, ProfileSvg } from '../../assets/svg';
import Space from '../Space';
import { hp, wp } from '../../utils';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import MyText from '../MyText';

export interface HeaderProps {
  isBack?: boolean;
  onBackPress?: () => void;
  isNotification?: boolean;
  onNotificationPress?: () => void;
  isProfile?: boolean;
  onProfilePress?: () => void;
  activeScreen?: 'Notification' | 'Profile' | null;
  title?: string | null;
}

const Header: React.FC<HeaderProps> = ({
  isBack = false,
  onBackPress = () => {},
  isNotification = false,
  onNotificationPress = null,
  isProfile = false,
  onProfilePress = () => {},
  activeScreen = null,
  title = null,
}) => {
  const insets = useSafeAreaInsets();
  const theme: Theme = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={[
          styles.header,
          {
            // paddingTop: insets.top,
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

        {title && (
          <View>
            <MyText fontFamily="Gilroy-SemiBold" fontSize={hp(2.1)}>
              {title}
            </MyText>
          </View>
        )}
        <View style={styles.rightContainer}>
          {isNotification && (
            <TouchableOpacity
              onPress={() => {
                if (onNotificationPress) {
                  onNotificationPress();
                } else {
                  navigation?.navigate?.('Notification' as never);
                }
              }}
            >
              <NotificationSvg
                color={
                  activeScreen == 'Notification' ? theme.colors.primary : '#fff'
                }
              />
            </TouchableOpacity>
          )}
          <Space mR={hp(1)} />
          {isProfile && (
            <TouchableOpacity onPress={onProfilePress}>
              <ProfileSvg
                color={
                  activeScreen == 'Profile' ? theme.colors.primary : '#fff'
                }
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
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
