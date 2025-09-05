import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/user/HomeScreen';
import FirmwareScreen from '../screens/user/FirmwareScreen';
import ScanScreen from '../screens/user/ScanScreen';
import ExploreScreen from '../screens/user/ExploreScreen';
import SettingsScreen from '../screens/user/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Firmware" component={FirmwareScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
