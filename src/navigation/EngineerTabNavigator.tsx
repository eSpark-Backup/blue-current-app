import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/engineer/HomeScreen';
import FirmwareScreen from '../screens/engineer/FirmwareScreen';
import ScanScreen from '../screens/engineer/ScanScreen';
import ExploreScreen from '../screens/engineer/ExploreScreen';
import SettingsScreen from '../screens/engineer/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function EngineerTabNavigator() {
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
