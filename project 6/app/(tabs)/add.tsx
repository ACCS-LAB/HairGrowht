import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, Platform } from 'react-native';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import Animated, { 
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const TIPS = [
  'Kıyafeti düz bir zeminde fotoğraflayın',
  'İyi aydınlatılmış bir ortam seçin',
  'Kıyafeti düz ve kırışıksız yerleştirin',
  'Tüm detayların görünür olduğundan emin olun',
];

export default function AddClothingScreen() {
  const [selectedTip, setSelectedTip] = useState(0);

  // Rotate through tips every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setSelectedTip((prev) => (prev + 1) % TIPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tipStyle = useAnimatedStyle(() => ({
    transform: [
      { 
        translateY: withSequence(
          withSpring(-10),
          withSpring(0)
        )
      }
    ],
    opacity: withTiming(1, { duration: 500 }),
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Kıyafet Ekle</Text>
        
        <Animated.Text 
          entering={FadeIn}
          style={[styles.tip, tipStyle]}
        >
          {TIPS[selectedTip]}
        </Animated.Text>

        <View style={styles.options}>
          <Animated.View entering={FadeInDown.delay(200)}>
            <Pressable style={styles.option}>
              <View style={styles.iconContainer}>
                <Camera size={32} color="#4CAF50" />
              </View>
              <Text style={styles.optionTitle}>Fotoğraf Çek</Text>
              <Text style={styles.optionDescription}>
                Kıyafetinizin fotoğrafını çekin
              </Text>
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400)}>
            <Pressable style={styles.option}>
              <View style={styles.iconContainer}>
                <ImageIcon size={32} color="#4CAF50" />
              </View>
              <Text style={styles.optionTitle}>Galeriden Seç</Text>
              <Text style={styles.optionDescription}>
                Galerinizden bir fotoğraf seçin
              </Text>
            </Pressable>
          </Animated.View>
        </View>

        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&q=80' }}
          style={styles.preview}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#1B5E20',
    marginTop: Platform.OS === 'ios' ? 20 : 40,
    marginBottom: 20,
  },
  tip: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  options: {
    gap: 20,
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#1B5E20',
    marginBottom: 8,
  },
  optionDescription: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#666',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginTop: 40,
    backgroundColor: '#F5F5F5',
  },
});