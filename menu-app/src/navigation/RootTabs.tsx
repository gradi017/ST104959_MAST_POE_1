import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import MenuListScreen from '../screens/MenuListScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2E8B57' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
        tabBarActiveTintColor: '#2E8B57',
        tabBarInactiveTintColor: '#6C757D',
        tabBarStyle: {
          paddingBottom: 15,
          paddingTop: 5,
          height: 90,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E9ECEF',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="AddMenu" 
        component={AddItemScreen} 
        options={{ 
          tabBarLabel: 'Add Item',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="MenuList" 
        component={MenuListScreen} 
        options={{ 
          tabBarLabel: 'My Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}


