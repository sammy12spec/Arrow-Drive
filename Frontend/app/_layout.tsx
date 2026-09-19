import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ArrowDriveIntro } from '@/components/ArrowDriveIntro';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent flash before screen dimensions resolve
  if (!isMounted) {
    return <View style={{ flex: 1, backgroundColor: '#02120C' }} />;
  }

  // App content rendered across all routes
  const appContent = (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1, position: 'relative', backgroundColor: '#02120C' }}>
        <StatusBar style="light" />

        <Stack screenOptions={{ headerShown: false }}>
          {/* Landing Page */}
          <Stack.Screen name="index" />

          {/* Authentication Screen */}
          <Stack.Screen name="auth" />

          {/* App Navigation Routes */}
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="plan-trip" />
          <Stack.Screen name="road-insight" />
          <Stack.Screen name="create-post" />
          <Stack.Screen name="provider-step1" />
          <Stack.Screen name="provider-step2" />
          <Stack.Screen name="provider-step3" />
          <Stack.Screen name="notification-settings" />
          <Stack.Screen name="voice-guidance" />
          <Stack.Screen name="edit-home-work" />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>

        {/* Intro Animation Layer */}
        {showSplash && (
          <ArrowDriveIntro onAnimationComplete={() => setShowSplash(false)} />
        )}
      </View>
    </ThemeProvider>
  );

  // On larger screens (Desktop / Tablet), redirect/constrain to dedicated Mobile Viewport
  if (width >= 768) {
    return (
      <View style={styles.desktopOuterContainer}>
        <View style={styles.mobileAppContainer}>
          {appContent}
        </View>
      </View>
    );
  }

  // Native Mobile View
  return appContent;
}

const styles = StyleSheet.create({
  desktopOuterContainer: {
    flex: 1,
    backgroundColor: '#010A06',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  mobileAppContainer: {
    width: '100%',
    maxWidth: 440,
    height: '100%',
    maxHeight: '100%',
    backgroundColor: '#02120C',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
});