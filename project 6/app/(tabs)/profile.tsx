import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Heart, Clock, Star, Gift, Share2, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const MENU_ITEMS = [
  {
    id: 'favorites',
    icon: Heart,
    title: 'Favorilerim',
    color: '#FF6B6B',
  },
  {
    id: 'history',
    icon: Clock,
    title: 'Giyim Geçmişi',
    color: '#4ECDC4',
  },
  {
    id: 'style',
    icon: Star,
    title: 'Stil Tercihlerim',
    color: '#FFD93D',
  },
  {
    id: 'premium',
    icon: Gift,
    title: 'Premium\'a Yükselt',
    color: '#FF8E3C',
    highlight: true,
  },
];

const SETTINGS_ITEMS = [
  {
    id: 'share',
    icon: Share2,
    title: 'Arkadaşlarını Davet Et',
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Bildirim Ayarları',
  },
  {
    id: 'help',
    icon: HelpCircle,
    title: 'Yardım & Destek',
  },
  {
    id: 'settings',
    icon: Settings,
    title: 'Uygulama Ayarları',
  },
];

export default function ProfileScreen() {
  const [stats] = useState({
    items: 156,
    outfits: 42,
    favorites: 23,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <LinearGradient
          colors={['#8B4513', '#6D4C41']}
          style={styles.header}
        >
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' }}
              style={styles.avatar}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Ayşe Yılmaz</Text>
              <Text style={styles.email}>ayse@example.com</Text>
            </View>
            <Pressable style={styles.editButton}>
              <Text style={styles.editButtonText}>Düzenle</Text>
            </Pressable>
          </View>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.items}</Text>
              <Text style={styles.statLabel}>Kıyafet</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.outfits}</Text>
              <Text style={styles.statLabel}>Kombin</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.favorites}</Text>
              <Text style={styles.statLabel}>Favori</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={FadeInDown.delay(index * 100)}
            >
              <Pressable 
                style={[
                  styles.menuItem,
                  item.highlight && styles.highlightedMenuItem,
                ]}
              >
                <View style={styles.menuItemContent}>
                  <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
                    <item.icon size={20} color="#FFF" />
                  </View>
                  <Text style={[
                    styles.menuItemText,
                    item.highlight && styles.highlightedMenuItemText,
                  ]}>
                    {item.title}
                  </Text>
                </View>
                <ChevronRight size={20} color={item.highlight ? '#FFD700' : '#8B7355'} />
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          {SETTINGS_ITEMS.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={FadeInDown.delay((index + MENU_ITEMS.length) * 100)}
            >
              <Pressable style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <View style={[styles.menuIconContainer, { backgroundColor: '#3D261C' }]}>
                    <item.icon size={20} color="#D4A574" />
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color="#8B7355" />
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* Logout Button */}
        <Animated.View entering={FadeInDown.delay((MENU_ITEMS.length + SETTINGS_ITEMS.length) * 100)}>
          <Pressable style={styles.logoutButton}>
            <LogOut size={20} color="#FF6B6B" />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
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
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: '#D4A574',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#8B7355',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3D261C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4A574',
  },
  editButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#D4A574',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#2C1810',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#D4A574',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#8B7355',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#3D261C',
    marginHorizontal: 16,
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#D4A574',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C1810',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  highlightedMenuItem: {
    backgroundColor: '#3D261C',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#D4A574',
  },
  highlightedMenuItemText: {
    color: '#FFD700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C1810',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    gap: 8,
  },
  logoutText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FF6B6B',
  },
});