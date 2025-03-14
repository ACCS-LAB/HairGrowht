import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { 
  useFonts,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  Raleway_400Regular,
} from '@expo-google-fonts/raleway';
import {
  Quicksand_300Light,
} from '@expo-google-fonts/quicksand';
import {
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  SourceSansPro_400Regular,
} from '@expo-google-fonts/source-sans-pro';
import { SplashScreen } from 'expo-router';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Bold': Montserrat_700Bold,
    'Raleway-Regular': Raleway_400Regular,
    'Quicksand-Light': Quicksand_300Light,
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'SourceSansPro-Regular': SourceSansPro_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}