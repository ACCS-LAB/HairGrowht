import { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
  withSequence,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Cat as Coat } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const doorLeft = useSharedValue(0);
  const doorRight = useSharedValue(0);
  const logoScale = useSharedValue(0);
  const logoRotate = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    // Door opening animation
    doorLeft.value = withDelay(500, withTiming(-width / 2, { duration: 1000 }));
    doorRight.value = withDelay(500, withTiming(width / 2, { duration: 1000 }));

    // Logo animation
    logoScale.value = withDelay(1500, withSpring(1));
    logoRotate.value = withSequence(
      withDelay(1500, withTiming(360, { duration: 1000 })),
      withSpring(0)
    );

    // Text fade in
    textOpacity.value = withDelay(2000, withTiming(1, { duration: 500 }));

    // Progress bar animation
    progressWidth.value = withDelay(500, withTiming(1, { duration: 2000 }));

    // Navigate to onboarding after animations
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const leftDoorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: doorLeft.value }],
  }));

  const rightDoorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: doorRight.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotate.value}deg` },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: interpolate(
      progressWidth.value,
      [0, 1],
      [0, width - 80],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <LinearGradient
      colors={['#2C1810', '#1C0F0A']}
      style={styles.container}
    >
      {/* Wardrobe doors */}
      <Animated.View style={[styles.door, styles.leftDoor, leftDoorStyle]} />
      <Animated.View style={[styles.door, styles.rightDoor, rightDoorStyle]} />

      <View style={styles.content}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Coat size={80} color="#D4A574" />
          <Text style={styles.logo}>Wardrobe+</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, textStyle]}>
          Akıllı Gardırobunuz
        </Animated.Text>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  door: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width / 2,
    backgroundColor: '#3D261C',
  },
  leftDoor: {
    left: 0,
    borderRightWidth: 1,
    borderRightColor: '#D4A574',
  },
  rightDoor: {
    right: 0,
    borderLeftWidth: 1,
    borderLeftColor: '#D4A574',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 48,
    color: '#D4A574',
    marginTop: 16,
  },
  tagline: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
    color: '#8B7355',
    marginBottom: 40,
  },
  progressContainer: {
    width: width - 80,
    height: 2,
    backgroundColor: '#3D261C',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D4A574',
  },
});