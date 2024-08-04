// src/navigation/HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CabsListScreen from '../screens/CabsListScreen';
import CabDetailScreen from '../screens/CabDetailScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cabs List"
        component={CabsListScreen}
        options={{ title: 'Available Cabs' }}
      />
      <Stack.Screen
        name="Cab Detail"
        component={CabDetailScreen}
        options={({ route }) => ({ title: route.params?.cabId || 'Cab Details' })}
      />
    </Stack.Navigator>
  );
}