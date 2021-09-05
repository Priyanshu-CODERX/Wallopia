import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../Screens/Register';
import LoginScreen from '../Screens/Login';
import HomeNavigator from '../Screens/HomeNavigator';
import { TouchableOpacity, Image } from 'react-native';

const stack = createStackNavigator();
export default function Provider() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <stack.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
