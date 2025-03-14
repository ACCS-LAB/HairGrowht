import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue,
  withSequence,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import { Camera, Sparkles, Brain } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Gardırobunuzu Keşfedin',
    description: 'Kıyafetlerinizi fotoğraflayın, yapay zeka sizin için tanımlasın',
    icon: (props: any) => <Camera {...props} />,
    gradient: ['#2C1810', '#3D261C'],
  },
  {
    id: 2,
    title: 'Akıllı Kombinler',
    description: 'Yapay zeka gardırobunuzdan size özel kombinler oluşturur',
    icon: (props: any) => <Sparkles {...props} />,
    gradient: ['#3D261C', '#4E342E'],
  },
  {
    id: 3,
    title: 'Kişisel Stil Asistanınız',
    description: 'Her gün ne giyeceğinize karar vermek artık çok kolay',
    icon: (props: any) => <Brain {...props} />,
    gradient: ['#4E342E', '#5D4037'],
  },
];

export default function Onboarding() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideAnimation = useSharedValue(0);
  const iconScale = useSharedValue(1);

  // Continuous icon animation
  useState(() => {
    iconScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const nextSlide = () => {
    if (activeSlide === slides.length - 1) {
      router.replace('/(tabs)');
    } else {
      setActiveSlide(prev => prev + 1);
      slideAnimation.value = withSpring(activeSlide + 1);
    }
  };

  const slideStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          slideAnimation.value,
          [0, 1, 2],
          [0, -width, -width * 2]
        ),
      },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slidesContainer, slideStyle]}>
        {slides.map((slide) => (
          <LinearGradient
            key={slide.id}
            colors={slide.gradient}
            style={styles.slide}
          >
            <Animated.View style={[styles.iconContainer, iconStyle]}>
              {slide.icon({ size: 80, color: '#D4A574' })}
            </Animated.View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </LinearGradient>
        ))}
      </Animated.View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeSlide === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <Pressable style={styles.button} onPress={nextSlide}>
        <LinearGradient
          colors={['#8B4513', '#6D4C41']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>
            {activeSlide === slides.length - 1 ? 'Gardırobumu Oluştur' : 'Devam Et'}
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0F0A',
  },
  slidesContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  slide: {
    width,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#2C1810',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#D4A574',
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 32,
    color: '#D4A574',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
    color: '#8B7355',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3D261C',
  },
  activeDot: {
    backgroundColor: '#D4A574',
    width: 24,
  },
  button: {
    marginHorizontal: 40,
    marginBottom: 40,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: '#D4A574',
  },
});