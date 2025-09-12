import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import EngineerBottomTabBar from '../components/EngineerBottomTabBar';
import HomeScreen from '../screens/engineer/HomeScreen';
import FirmwareScreen from '../screens/engineer/FirmwareScreen';
import ScanScreen from '../screens/engineer/ScanScreen';
import ExploreScreen from '../screens/engineer/ExploreScreen';
import SettingsScreen from '../screens/engineer/SettingsScreen';
import NotificationScreen from '../screens/engineer/NotificationScreen';
import ProfileScreen from '../screens/engineer/ProfileScreen';
import { hp } from '../utils';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function EngineerTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <EngineerBottomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#000',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Firmware" component={FirmwareScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
