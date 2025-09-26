import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Theme, useTheme } from '@react-navigation/native';

import { hp, wp } from '../utils';
import {
  ActiveUpdates,
  ActiveFirmware,
  ActiveHome,
  ActiveSettings,
  Updates,
  Firmware,
  Home,
  Scan,
  Settings,
  DeviceOverview,
  ActiveDeviceOverview,
} from '../assets/svg';
import { ActiveScan, DeviceOverviewMinted } from '../assets/images';

const PRIMARY_COLOR = '#00C9FF';

export default function UserBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const theme: Theme = useTheme();

  const TAB_ICONS = [
    {
      name: 'Home',
      type: 'svg',
      icon: (isFocused: boolean) =>
        isFocused ? (
          <ActiveHome width={hp(5)} height={hp(5)} />
        ) : (
          <Home width={hp(5)} height={hp(5)} />
        ),
    },
    {
      name: 'Firmware',
      type: 'svg',
      icon: (isFocused: boolean) =>
        isFocused ? (
          <ActiveFirmware width={hp(5)} height={hp(5)} />
        ) : (
          <Firmware width={hp(5)} height={hp(5)} />
        ),
    },
    {
      name: 'DeviceOverview',
      type: 'svg',
      icon: (isFocused: boolean) => (
        <>
          {isFocused ? (
            <ActiveDeviceOverview
              width={hp(10)}
              height={hp(10)}
              style={{ position: 'absolute', top: -hp(11.3), left: -hp(5) }}
            />
          ) : (
            <DeviceOverview
              width={hp(10)}
              height={hp(10)}
              style={{ position: 'absolute', top: -hp(11.3), left: -hp(5) }}
            />
          )}
        </>
      ),
    },
    {
      name: 'Updates',
      type: 'svg',
      icon: (isFocused: boolean) => (
        <>
          {isFocused ? (
            <ActiveUpdates width={hp(5)} height={hp(5)} />
          ) : (
            <Updates width={hp(5)} height={hp(5)} />
          )}
        </>
      ),
    },
    {
      name: 'Settings',
      type: 'svg',
      icon: (isFocused: boolean) => (
        <>
          {isFocused ? (
            <ActiveSettings width={hp(5)} height={hp(5)} />
          ) : (
            <Settings width={hp(5)} height={hp(5)} />
          )}
        </>
      ),
    },
  ];

  return (
    <View style={{ backgroundColor: '#000' }}>
      <View style={styles.container}>
        {TAB_ICONS.map((tab, idx) => {
          const isScan = tab.name === 'Scan';
          const isFocused = state.index === idx;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes[idx].key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name);
            }
          };
          return (
            <TouchableOpacity
              key={tab.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={isScan ? styles.scanTab : styles.tab}
              activeOpacity={0.7}
            >
              {/* {tab.type === 'vector' ? (
                <Icon
                  name={tab.icon}
                  size={isScan ? hp(4) : hp(3)}
                  color={isFocused ? theme.colors.primary : '#888'}
                  style={isScan ? styles.scanIcon : undefined}
                />
              ) : ( */}
              <View
                style={
                  isScan ? { position: 'absolute', bottom: -hp(1) } : undefined
                }
              >
                {tab?.icon(isFocused)}
              </View>
              {/* )} */}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#000',
    borderRadius: hp(2.5),
    borderColor: PRIMARY_COLOR,
    borderWidth: wp(0.1),
    borderBottomWidth: 0,
    width: wp(101),
    right: wp(0.4),
    // height: hp(7),
    paddingVertical: hp(0.5),
    // marginHorizontal: wp(2),
    // marginBottom: hp(1),
    // paddingHorizontal: wp(1),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    marginBottom: hp(1),
  },
  scanTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -hp(5),
    zIndex: 2,
  },
  scanIcon: {
    shadowColor: '#000',
    shadowOffset: { width: wp(0), height: hp(0.25) },
    shadowOpacity: 0.3,
    shadowRadius: wp(1),
    elevation: 5,
  },
});
