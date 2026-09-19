import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CustomTabBar({ state, descriptors, navigation }: any) {
  // We only want these 4 exact tabs in this exact order visually
  const mainTabs = [
    { name: 'trip-home', label: 'Home', iconActive: 'home', iconInactive: 'home' },
    { name: 'saved', label: 'Saved', iconActive: 'bookmark', iconInactive: 'bookmark-border' },
    { name: 'community', label: 'Community', iconActive: 'group', iconInactive: 'group' },
    { name: 'profile', label: 'Profile', iconActive: 'person', iconInactive: 'person-outline' },
  ];

  const currentRouteName = state.routes[state.index].name;

  return (
    <View style={styles.bottomNavigation}>
      {mainTabs.map((tab) => {
        // Evaluate if this specific tab is currently active.
        // We match index implicitly as home.
        const isFocused = currentRouteName === tab.name || (tab.name === 'trip-home' && currentRouteName === 'index');

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes.find((r: any) => r.name === tab.name)?.key || tab.name,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name, { merge: true });
          }
        };

        return (
          <TouchableOpacity
            key={tab.name}
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={onPress}
          >
            <MaterialIcons
              name={isFocused ? (tab.iconActive as any) : (tab.iconInactive as any)}
              size={28}
              color={isFocused ? '#057D4B' : '#999'}
            />
            {isFocused ? (
              <Text style={styles.navTextActive}>{tab.label}</Text>
            ) : (
              <Text style={styles.navText}>{tab.label}</Text>
            )}
            {isFocused && <View style={styles.navActiveIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      {/* Explicitly list all route dependencies internal to tabs to maintain routing capability */}
      <Tabs.Screen name="index" />
      <Tabs.Screen name="trip-home" />
      <Tabs.Screen name="saved" />
      <Tabs.Screen name="community" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    width: 70,
  },
  navText: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  navTextActive: {
    fontSize: 11,
    color: '#057D4B',
    fontWeight: '600',
  },
  navActiveIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#057D4B',
    marginTop: 2,
  }
});
