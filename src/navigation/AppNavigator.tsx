
import { Provider, useSelector } from 'react-redux';
import store from '../store/store';
import type { RootState } from '../store/store';
import { NavigationContainer } from '@react-navigation/native';
import { MyDarkTheme } from '../theme/theme';
import AuthStack from './AuthStack';
import UserTabNavigator from './UserTabNavigator';
import EngineerTabNavigator from './EngineerTabNavigator';


function AppNavContent() {
  const { isLoggedIn, userType } = useSelector((state: RootState) => state.auth as any);
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

export default function AppNavigator() {
  return (
    <Provider store={store}>
      <AppNavContent />
    </Provider>
  );
}
