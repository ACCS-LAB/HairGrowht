import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform, Image, ActivityIndicator } from 'react-native';
import { Search, Plus, Calendar, Sun, Cloud, CloudRain, Sparkles, Brain, Share2, TrendingUp, Camera, Info } from 'lucide-react-native';
import Animated, { 
  FadeInDown,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const WEATHER_TYPES = {
  sunny: { icon: Sun, color: '#D4A574', text: 'Güneşli' },
  cloudy: { icon: Cloud, color: '#8B7355', text: 'Bulutlu' },
  rainy: { icon: CloudRain, color: '#D4A574', text: 'Yağmurlu' },
};

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'İş Toplantısı',
    time: '10:00',
    outfit: 'https://images.unsplash.com/photo-1548624313-0396c75e4b63?w=500&q=80',
    style: 'Profesyonel',
  },
  {
    id: '2',
    title: 'Akşam Yemeği',
    time: '20:00',
    outfit: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    style: 'Şık Casual',
  },
];

const TRENDING_STYLES = [
  {
    id: '1',
    name: 'Monokrom Minimal',
    image: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=500&q=80',
    viralScore: 98,
  },
  {
    id: '2',
    name: 'Vintage Fusion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    viralScore: 95,
  },
];

const WARDROBE_STATS = [
  { id: 'tops', label: 'Üstler', percentage: 35, color: '#D4A574' },
  { id: 'bottoms', label: 'Altlar', percentage: 25, color: '#8B4513' },
  { id: 'outerwear', label: 'Dış Giyim', percentage: 20, color: '#6D4C41' },
  { id: 'accessories', label: 'Aksesuarlar', percentage: 20, color: '#8B7355' },
];

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentWeather] = useState('sunny');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const avatarGlow = useSharedValue(1);
  const weatherScale = useSharedValue(1);
  const trendingScale = useSharedValue(1);

  useEffect(() => {
    avatarGlow.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );

    weatherScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    trendingScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const avatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarGlow.value }],
  }));

  const weatherStyle = useAnimatedStyle(() => ({
    transform: [{ scale: weatherScale.value }],
  }));

  const trendingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: trendingScale.value }],
  }));

  const handleImageError = () => {
    setHasError(true);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Refresh data logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const WeatherIcon = WEATHER_TYPES[currentWeather].icon;

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={handleRefresh}
      >
        {/* Error State */}
        {hasError && (
          <View style={styles.errorContainer}>
            <Info size={24} color="#FF6B6B" />
            <Text style={styles.errorText}>Bir hata oluştu. Tekrar deneyin.</Text>
            <Pressable style={styles.retryButton} onPress={handleRefresh}>
              <Text style={styles.retryText}>Tekrar Dene</Text>
            </Pressable>
          </View>
        )}

        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#D4A574" />
            <Text style={styles.loadingText}>Yükleniyor...</Text>
          </View>
        )}

        <LinearGradient
          colors={['#8B4513', '#6D4C41']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Animated.View style={[styles.avatarContainer, avatarStyle]}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' }}
                  style={styles.avatar}
                  onError={handleImageError}
                  defaultSource={require('@/assets/images/default-avatar.png')}
                />
              </Animated.View>
              <View style={styles.greeting}>
                <Text style={styles.welcomeText}>Günaydın, Ayşe</Text>
                <Text style={styles.subText}>3 mükemmel kombinin hazır!</Text>
              </View>
            </View>
            <Animated.View style={[styles.weatherWidget, weatherStyle]}>
              <WeatherIcon size={24} color={WEATHER_TYPES[currentWeather].color} />
              <Text style={styles.weatherText}>22°C</Text>
            </Animated.View>
          </View>
        </LinearGradient>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.calendarStrip}
          contentContainerStyle={styles.calendarContent}
        >
          {Array.from({ length: 7 }).map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            const isSelected = index === 0;
            
            return (
              <Pressable 
                key={index}
                style={[styles.dateCard, isSelected && styles.selectedDate]}
              >
                <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                  {date.getDate()}
                </Text>
                <Text style={[styles.dayText, isSelected && styles.selectedDateText]}>
                  {date.toLocaleDateString('tr-TR', { weekday: 'short' })}
                </Text>
                {isSelected && (
                  <View style={styles.outfitIndicator} />
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bugünkü Etkinlikler</Text>
            <Calendar size={20} color="#D4A574" />
          </View>
          {UPCOMING_EVENTS.map(event => (
            <BlurView key={event.id} intensity={30} tint="dark" style={styles.eventCard}>
              <Image source={{ uri: event.outfit }} style={styles.eventOutfit} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventStyle}>{event.style}</Text>
              </View>
            </BlurView>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bu Hafta Trend Olacaklar</Text>
            <TrendingUp size={20} color="#D4A574" />
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingContainer}
          >
            {TRENDING_STYLES.map(style => (
              <Animated.View key={style.id} style={[styles.trendingCard, trendingStyle]}>
                <Image source={{ uri: style.image }} style={styles.trendingImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(44, 24, 16, 0.9)']}
                  style={styles.trendingOverlay}
                >
                  <Text style={styles.trendingName}>{style.name}</Text>
                  <View style={styles.viralScore}>
                    <Sparkles size={16} color="#D4A574" />
                    <Text style={styles.viralScoreText}>{style.viralScore}%</Text>
                  </View>
                </LinearGradient>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gardırop Analizi</Text>
            <Brain size={20} color="#D4A574" />
          </View>
          <View style={styles.statsContainer}>
            {WARDROBE_STATS.map(stat => (
              <View key={stat.id} style={styles.statItem}>
                <View style={styles.statBar}>
                  <LinearGradient
                    colors={[stat.color, stat.color + '80']}
                    style={[styles.statFill, { width: `${stat.percentage}%` }]}
                  />
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statPercentage}>{stat.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.quickActions}>
        <View style={styles.tooltipContainer}>
          <Pressable 
            style={[styles.actionButton, styles.primaryAction]}
            onPress={() => {/* Add photo logic */}}
          >
            <Camera size={24} color="#FFF" />
          </Pressable>
          <Text style={styles.tooltip}>Yeni Kıyafet Ekle</Text>
        </View>
        
        <View style={styles.tooltipContainer}>
          <Pressable 
            style={styles.actionButton}
            onPress={() => {/* Share logic */}}
          >
            <Share2 size={24} color="#D4A574" />
          </Pressable>
          <Text style={styles.tooltip}>Paylaş</Text>
        </View>
        
        <View style={styles.tooltipContainer}>
          <Pressable 
            style={styles.actionButton}
            onPress={() => {/* AI suggestions logic */}}
          >
            <Brain size={24} color="#D4A574" />
          </Pressable>
          <Text style={styles.tooltip}>AI Önerisi</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C0F0A',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    padding: 2,
    borderRadius: 30,
    backgroundColor: '#D4A574',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  greeting: {
    marginLeft: 16,
  },
  welcomeText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#D4A574',
    marginBottom: 4,
  },
  subText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#8B7355',
  },
  weatherWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C1810',
    padding: 8,
    borderRadius: 20,
    gap: 8,
  },
  weatherText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#D4A574',
  },
  calendarStrip: {
    backgroundColor: '#2C1810',
    paddingVertical: 16,
  },
  calendarContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  dateCard: {
    alignItems: 'center',
    backgroundColor: '#3D261C',
    borderRadius: 16,
    padding: 12,
    width: 60,
  },
  selectedDate: {
    backgroundColor: '#8B4513',
  },
  dateText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#8B7355',
  },
  dayText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#8B7355',
    marginTop: 4,
  },
  selectedDateText: {
    color: '#D4A574',
  },
  outfitIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4A574',
    marginTop: 8,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: '#D4A574',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#2C1810',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  eventOutfit: {
    width: 80,
    height: 80,
  },
  eventInfo: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#D4A574',
    marginBottom: 4,
  },
  eventTime: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#8B7355',
    marginBottom: 4,
  },
  eventStyle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#D4A574',
  },
  trendingContainer: {
    paddingBottom: 16,
    gap: 16,
  },
  trendingCard: {
    width: 200,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  trendingName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#D4A574',
    marginBottom: 8,
  },
  viralScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viralScoreText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#D4A574',
  },
  statsContainer: {
    backgroundColor: '#2C1810',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#3D261C',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statFill: {
    height: '100%',
    borderRadius: 4,
  },
  statLabel: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#8B7355',
    width: 80,
  },
  statPercentage: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#D4A574',
    width: 40,
    textAlign: 'right',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2C1810',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4A574',
  },
  primaryAction: {
    backgroundColor: '#8B4513',
    borderWidth: 0,
    transform: [{ scale: 1.2 }],
  },
  errorContainer: {
    backgroundColor: '#2C1810',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  errorText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#FF6B6B',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
  },
  retryText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#FFF',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#D4A574',
    marginTop: 8,
  },
  tooltipContainer: {
    alignItems: 'center',
  },
  tooltip: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#8B7355',
    marginTop: 4,
  },
});