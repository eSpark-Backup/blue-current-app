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
import ServiceHubScreen from '../screens/engineer/ServiceHubScreen';
import DeviceCheckInScreen from '../screens/engineer/DeviceCheckInScreen';
import CompleteJobs from '../screens/engineer/CompleteJobs';
import UserNotes from '../screens/engineer/UserNotes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function EngineerTabNavigator() {
  function TabsOnly() {
    return (
      <Tab.Navigator
        tabBar={props => <EngineerBottomTabBar {...props} />}
        screenOptions={({ route }) => ({
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
        <Tab.Screen
          name="ServiceHubScreen"
          component={ServiceHubScreen}
          options={{
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="CompleteJobs"
          component={CompleteJobs}
          options={{
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="UserNotes"
          component={UserNotes}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabsOnly} />
      <Stack.Screen name="DeviceCheckInScreen" component={DeviceCheckInScreen} />
    </Stack.Navigator>
  );
}
