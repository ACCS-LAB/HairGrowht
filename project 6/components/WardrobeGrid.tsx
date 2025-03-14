import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

const SAMPLE_ITEMS = [
  {
    id: '1',
    name: 'Beyaz Gömlek',
    category: 'Üst Giyim',
    color: 'Beyaz',
    image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=500&q=80',
  },
  {
    id: '2',
    name: 'Siyah Pantolon',
    category: 'Alt Giyim',
    color: 'Siyah',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80',
  },
  {
    id: '3',
    name: 'Mavi Ceket',
    category: 'Üst Giyim',
    color: 'Mavi',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
  },
];

interface WardrobeGridProps {
  onSelectItem?: (id: string) => void;
  selectedItems?: string[];
}

export function WardrobeGrid({ onSelectItem, selectedItems = [] }: WardrobeGridProps) {
  return (
    <View style={styles.container}>
      {SAMPLE_ITEMS.map((item, index) => (
        <Animated.View 
          key={item.id}
          entering={FadeInUp.delay(index * 100)}
          style={styles.itemContainer}
        >
          <Pressable
            onLongPress={() => onSelectItem?.(item.id)}
            onPress={() => selectedItems.length > 0 && onSelectItem?.(item.id)}
            style={({ pressed }) => [
              styles.itemPressable,
              pressed && styles.pressed,
            ]}
          >
            <Image 
              source={{ uri: item.image }} 
              style={styles.image}
            />
            {selectedItems.includes(item.id) && (
              <View style={styles.selectedOverlay}>
                <Check size={24} color="#FFD700" />
              </View>
            )}
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </Pressable>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  itemContainer: {
    width: '47%',
    marginBottom: 20,
  },
  itemPressable: {
    position: 'relative',
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: '#2C1810',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(44, 24, 16, 0.6)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    padding: 10,
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#D4A574',
  },
  category: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#8B7355',
    marginTop: 4,
  },
});