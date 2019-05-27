import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import Colors from './constants/Colors';
import { Icon } from 'react-native-elements';

import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import TermsScreen from './screens/TermsScreen';

const MainStack = createStackNavigator({
  Main: MainScreen,
});

MainStack.navigationOptions = {
  tabBarLabel: 'Main',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="home"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => (
    <Icon
      name="face"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const TermsStack = createStackNavigator({
  Terms: TermsScreen,
});

TermsStack.navigationOptions = {
  tabBarLabel: 'Terms',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="rowing"
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

// export default createBottomTabNavigator({
//   LoginStack,
//   MainStack,
//   //TermsStack,
// });
const bottom = createBottomTabNavigator({
  MainStack,
  TermsStack,
});
export default createSwitchNavigator({
  LoginStack,
  Main: bottom,
});
