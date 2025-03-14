import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
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

interface WardrobeListProps {
  onSelectItem?: (id: string) => void;
  selectedItems?: string[];
}

export function WardrobeList({ onSelectItem, selectedItems = [] }: WardrobeListProps) {
  return (
    <View style={styles.container}>
      {SAMPLE_ITEMS.map((item, index) => (
        <Animated.View 
          key={item.id}
          entering={FadeInRight.delay(index * 100)}
          style={styles.itemContainer}
        >
          <Pressable
            onLongPress={() => onSelectItem?.(item.id)}
            onPress={() => selectedItems.length > 0 && onSelectItem?.(item.id)}
            style={({ pressed }) => [
              styles.item,
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
              <Text style={styles.color}>{item.color}</Text>
            </View>
          </Pressable>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#2C1810',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#3D261C',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(44, 24, 16, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#D4A574',
    marginBottom: 4,
  },
  category: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#8B7355',
    marginBottom: 4,
  },
  color: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#8B7355',
  },
});