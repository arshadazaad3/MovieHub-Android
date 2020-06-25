import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

//Screens
import Home from './screens/home'
import Profile from './screens/profile'
// import AdminPanel from './screens/adminPanel'
import AdminPanel from './screens/adminPanel'

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const Tab = createMaterialBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRoute="Home"
        activeColor="#02ad94"
        inactiveColor="#dedede"
        style={{ backgroundColor: "#000" }}
        barStyle={{ backgroundColor: '#0f0f0f', padding: 1 }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='home' color={color} size={28} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name='subject' color={color} size={28} />
            )
          }}
        />
        <Tab.Screen
          name="Admin Panel"
          component={AdminPanel}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name='user-cog' color={color} size={22} style={{ top: 2 }} />
            )
          }}
        />
      </Tab.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
