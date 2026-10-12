import React from 'react';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#FFFFFF',
        tabBarActiveTintColor: '#0891B2',
        tabBarInactiveTintColor: '#64748B',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: "Chef's Menu Manager",
        }}
      />
      <Tabs.Screen
        name="menu-list"
        options={{
          title: 'Menu List',
          headerTitle: 'Full Menu Catalog',
        }}
      />
      <Tabs.Screen
        name="add-dish"
        options={{
          title: 'Add Dish',
          headerTitle: 'Add New Menu Item',
        }}
      />
    </Tabs>
  );
}