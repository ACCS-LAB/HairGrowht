import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';

const styleOptions = [
  {
    id: 1,
    name: 'Şık/Resmi',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&q=80',
  },
  {
    id: 2,
    name: 'Günlük/Spor',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
  },
  {
    id: 3,
    name: 'Bohem',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80',
  },
  {
    id: 4,
    name: 'Retro',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80',
  },
  {
    id: 5,
    name: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&q=80',
  },
];

export default function StyleTest() {
  const [selectedStyles, setSelectedStyles] = useState<number[]>([]);

  const toggleStyle = (id: number) => {
    setSelectedStyles(prev =>
      prev.includes(id)
        ? prev.filter(styleId => styleId !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedStyles.length > 0) {
      // Navigate to main app
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarzınızı Seçin</Text>
      <Text style={styles.subtitle}>
        Size en uygun kombinleri oluşturabilmemiz için tarz tercihlerinizi belirleyin
      </Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {styleOptions.map((style) => (
            <Pressable
              key={style.id}
              style={[
                styles.styleCard,
                selectedStyles.includes(style.id) && styles.selectedCard,
              ]}
              onPress={() => toggleStyle(style.id)}
            >
              <Image
                source={{ uri: style.image }}
                style={styles.styleImage}
              />
              <Text style={styles.styleName}>{style.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={[
          styles.button,
          selectedStyles.length === 0 && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={selectedStyles.length === 0}
      >
        <Text style={styles.buttonText}>Devam Et</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#1B5E20',
    marginTop: 60,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 20,
  },
  styleCard: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  styleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  styleName: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: '#333',
    padding: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});