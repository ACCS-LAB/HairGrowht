import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, useWindowDimensions, SafeAreaView, Platform } from 'react-native';
import { Cloud, CloudRain, Sun, Heart, Sparkles, Palette, Brain } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const MOODS = [
  { id: 'energetic', name: 'Enerjik', colors: ['#FFD54F', '#FF6F00'] },
  { id: 'professional', name: 'Profesyonel', colors: ['#90CAF9', '#1565C0'] },
  { id: 'relaxed', name: 'Rahat', colors: ['#A5D6A7', '#2E7D32'] },
  { id: 'creative', name: 'Yaratıcı', colors: ['#CE93D8', '#6A1B9A'] },
];

const DAILY_OUTFITS = [
  {
    id: '1',
    name: 'Modern İş Kadını',
    category: 'Profesyonel',
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b63?w=500&q=80',
    temperature: '20°C',
    weather: 'sunny',
    colors: ['#2C1810', '#D4A574'],
  },
  {
    id: '2',
    name: 'Şık Cumartesi',
    category: 'Hafta Sonu',
    image: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=500&q=80',
    temperature: '18°C',
    weather: 'cloudy',
    colors: ['#3D261C', '#8B7355'],
  },
  {
    id: '3',
    name: 'Gala Gecesi',
    category: 'Özel Davet',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    temperature: '22°C',
    weather: 'clear',
    colors: ['#1C0F0A', '#D4A574'],
  },
];

export default function OutfitsScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const [selectedMood, setSelectedMood] = useState('energetic');
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);

  // Animated values
  const weatherScale = useSharedValue(1);
  const cubeRotation = useSharedValue(0);
  const parallaxOffset = useSharedValue(0);
  const raindrops = Array(10).fill(0).map(() => ({
    x: useSharedValue(Math.random() * windowWidth),
    y: useSharedValue(-20),
    speed: 2 + Math.random() * 3,
  }));

  // Weather animation
  useEffect(() => {
    weatherScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    // Animate raindrops
    raindrops.forEach(drop => {
      drop.y.value = withRepeat(
        withTiming(windowWidth, {
          duration: 2000 * drop.speed,
        }),
        -1,
        false
      );
    });
  }, []);

  // Gesture handlers
  const rotateGesture = Gesture.Pan()
    .onUpdate((event) => {
      cubeRotation.value = withSpring(event.translationX / 100);
    })
    .onEnd(() => {
      cubeRotation.value = withSpring(0);
    });

  const parallaxGesture = Gesture.Pan()
    .onUpdate((event) => {
      parallaxOffset.value = event.translationX / 3;
    })
    .onEnd(() => {
      parallaxOffset.value = withSpring(0);
    });

  // Animated styles
  const weatherStyle = useAnimatedStyle(() => ({
    transform: [{ scale: weatherScale.value }],
  }));

  const cubeStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${cubeRotation.value}deg` },
    ],
  }));

  const parallaxStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: parallaxOffset.value }],
  }));

  const WeatherWidget = () => (
    <Animated.View style={[styles.weatherWidget, weatherStyle]}>
      <LinearGradient
        colors={['#2C1810', '#3D261C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.weatherGradient}
      >
        <View style={styles.weatherContent}>
          <View>
            <Text style={styles.temperature}>22°C</Text>
            <Text style={styles.weatherText}>Güneşli</Text>
          </View>
          <Sun size={48} color="#D4A574" />
        </View>
        {raindrops.map((drop, index) => (
          <Animated.View
            key={index}
            style={[
              styles.raindrop,
              {
                left: drop.x.value,
                top: drop.y.value,
              },
            ]}
          />
        ))}
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureDetector gesture={parallaxGesture}>
        <View style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <WeatherWidget />

            <Text style={styles.sectionTitle}>Moda DNA'nız</Text>
            <View style={styles.moodSelector}>
              {MOODS.map((mood) => (
                <Pressable
                  key={mood.id}
                  style={[
                    styles.moodButton,
                    selectedMood === mood.id && styles.selectedMood,
                  ]}
                  onPress={() => setSelectedMood(mood.id)}
                >
                  <LinearGradient
                    colors={mood.colors}
                    style={styles.moodGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.moodText}>{mood.name}</Text>
                  </LinearGradient>
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Bugünün Kombinleri</Text>
            <GestureDetector gesture={rotateGesture}>
              <Animated.View style={[styles.outfitCube, cubeStyle]}>
                {DAILY_OUTFITS.map((outfit, index) => (
                  <Animated.View
                    key={outfit.id}
                    style={[
                      styles.outfitCard,
                      {
                        transform: [
                          { translateX: index * (windowWidth - 40) },
                        ],
                      },
                    ]}
                  >
                    <Image source={{ uri: outfit.image }} style={styles.outfitImage} />
                    <LinearGradient
                      colors={outfit.colors}
                      style={styles.outfitOverlay}
                    >
                      <Text style={styles.outfitName}>{outfit.name}</Text>
                      <Text style={styles.outfitCategory}>{outfit.category}</Text>
                      <View style={styles.outfitActions}>
                        <Pressable style={styles.actionButton}>
                          <Sparkles size={20} color="#D4A574" />
                          <Text style={styles.actionButtonText}>Dene</Text>
                        </Pressable>
                        <Pressable style={styles.actionButton}>
                          <Heart size={20} color="#D4A574" />
                        </Pressable>
                      </View>
                    </LinearGradient>
                  </Animated.View>
                ))}
              </Animated.View>
            </GestureDetector>
          </ScrollView>

          <View style={styles.bottomBar}>
            <Pressable style={styles.bottomButton}>
              <Palette size={24} color="#D4A574" />
              <Text style={styles.bottomButtonText}>Stil Analizi</Text>
            </Pressable>
            <Pressable style={styles.bottomButton}>
              <Brain size={24} color="#D4A574" />
              <Text style={styles.bottomButtonText}>AI Önerisi</Text>
            </Pressable>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1C0F0A',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C0F0A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  weatherWidget: {
    margin: 20,
    marginTop: Platform.OS === 'ios' ? 20 : 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  weatherGradient: {
    padding: 20,
    borderRadius: 20,
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperature: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: '#D4A574',
  },
  weatherText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#8B7355',
  },
  raindrop: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#D4A574',
    opacity: 0.6,
    borderRadius: 1,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#D4A574',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  moodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 10,
  },
  moodButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedMood: {
    borderWidth: 2,
    borderColor: '#D4A574',
  },
  moodGradient: {
    padding: 12,
    alignItems: 'center',
  },
  moodText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#fff',
  },
  outfitCube: {
    height: 400,
    marginHorizontal: 20,
  },
  outfitCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  outfitImage: {
    width: '100%',
    height: '100%',
  },
  outfitOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
  },
  outfitName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#D4A574',
    marginBottom: 8,
  },
  outfitCategory: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#8B7355',
    marginBottom: 16,
  },
  outfitActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C1810',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#D4A574',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: '#2C1810',
    borderTopWidth: 1,
    borderTopColor: '#3D261C',
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1C0F0A',
  },
  bottomButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#D4A574',
  },
});