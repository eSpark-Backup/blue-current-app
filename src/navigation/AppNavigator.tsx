import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MyDarkTheme } from '../theme/theme';
import AuthStack from './AuthStack';
import UserTabNavigator from './UserTabNavigator';
import EngineerTabNavigator from './EngineerTabNavigator';

// Replace with your actual auth logic
const useAuth = () => {
  return { isLoggedIn: false, userType: 'user' };
  // return { isLoggedIn: false, userType: null };
};

export default function AppNavigator() {
  const { isLoggedIn, userType } = useAuth();

  return (
    <NavigationContainer theme={MyDarkTheme}>
      {!isLoggedIn ? (
        <AuthStack />
      ) : userType === 'user' ? (
        <UserTabNavigator />
      ) : (
        <EngineerTabNavigator />
      )}
    </NavigationContainer>
  );
}
