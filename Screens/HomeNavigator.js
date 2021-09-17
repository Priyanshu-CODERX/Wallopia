import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Uploader from './Uploader';
import Profile from './Profile';
import Home from './Home';

const Tab = createBottomTabNavigator();

export default function HomeNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Wallpapers') {
            iconName = focused ? 'image' : 'image';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';
          } else if (route.name === 'Upload') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#212121',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Wallpapers" component={Home} options={{
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => console.log("Hello, World!")}>
              <Image style={{ width: 25, height: 25, marginRight: 25 }} source={{ uri: "https://img.icons8.com/material-outlined/48/000000/refresh.png" }} />
            </TouchableOpacity>
          )
        }
      }} />
      <Tab.Screen name="Upload" component={Uploader} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
