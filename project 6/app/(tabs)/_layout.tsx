import { Tabs } from 'expo-router';
import { Shirt, User, CirclePlus as PlusCircle, Sparkles } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#2C1810',
        borderTopWidth: 0,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        height: Platform.OS === 'ios' ? 88 : 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      tabBarActiveTintColor: '#D4A574',
      tabBarInactiveTintColor: '#8B7355',
      tabBarLabelStyle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        marginBottom: Platform.OS === 'ios' ? 0 : 4,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Gardırop',
          tabBarIcon: ({ size, color }) => (
            <Shirt size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="outfits"
        options={{
          title: 'Kombinler',
          tabBarIcon: ({ size, color }) => (
            <Sparkles size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Ekle',
          tabBarIcon: ({ size, color }) => (
            <PlusCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}