import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ScavengerHuntProvider } from '@/contexts/ScavengerHuntProvider';

import { useColorScheme } from '@/hooks/useColorScheme';

import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // make sure to change gestureEnabled to false for tabs
  return (
    <ScavengerHuntProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='name' options={{ headerShown: false }} />
        <Stack.Screen name='choice' options={{ headerShown: false }} />
        <Stack.Screen name='location' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false, gestureEnabled: true }} />
      </Stack>
    </ScavengerHuntProvider>
  );
}
