import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/user/HomeScreen';
import FirmwareScreen from '../screens/user/FirmwareScreen';
import SettingsScreen from '../screens/user/SettingsScreen';
import UserBottomTabBar from '../components/UserBottomTabBar';
import Header from '../components/Header';
import NotificationScreen from '../screens/user/NotificationScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import AppSettingsScreen from '../screens/user/AppSettings';
import DeviceOverviewScreen from '../screens/user/DeviceOverviewScreen';
import UpdatesScreen from '../screens/user/UpdatesScreen';

const Tab = createBottomTabNavigator();

export default function UserTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <UserBottomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#000',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              isBack
              isNotification
              isProfile
              onNotificationPress={() => navigation.navigate('Notification')}
              onProfilePress={() => navigation.navigate('Profile')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Firmware"
        component={FirmwareScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              isBack
              isNotification
              isProfile
              onNotificationPress={() => navigation.navigate('Notification')}
              onProfilePress={() => navigation.navigate('Profile')}
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name="DeviceOverview"
        component={DeviceOverviewScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              title={'Device Overview'}
              isBack
              isNotification
              isProfile
              onNotificationPress={() => navigation.navigate('Notification')}
              onProfilePress={() => navigation.navigate('Profile')}
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Updates"
        component={UpdatesScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              title={'Subscription & Updates'}
              isBack
              isNotification
              isProfile
              onNotificationPress={() => navigation.navigate('Notification')}
              onProfilePress={() => navigation.navigate('Profile')}
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              isBack
              isNotification
              isProfile
              onNotificationPress={() => navigation.navigate('Notification')}
              onProfilePress={() => navigation.navigate('Profile')}
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={({ navigation }) => ({
          tabBarButton: () => null,
          headerShown: true,
          header: () => (
            <Header
              isBack
              isNotification
              isProfile
              onNotificationPress={() => navigation.navigate('Notification')}
              onProfilePress={() => navigation.navigate('Profile')}
              onBackPress={() => navigation.goBack()}
              activeScreen={'Notification'}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          tabBarButton: () => null,
          headerShown: true,
          header: () => (
            <Header
              isBack
              isNotification
              isProfile
              activeScreen={'Profile'}
              onNotificationPress={() => navigation.navigate('Notification')}
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Tab.Screen
        name="AppSettings"
        component={AppSettingsScreen}
        options={({ navigation }) => ({
          tabBarButton: () => null,
          headerShown: true,
          header: () => (
            <Header
              isBack
              isNotification
              isProfile
              onNotificationPress={() => navigation.navigate('Notification')}
              onProfilePress={() => navigation.navigate('Profile')}
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
