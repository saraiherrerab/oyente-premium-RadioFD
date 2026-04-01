import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../constants';

export default function RadioList({ radios, selectedRadioId, onSelectRadio, currentCoverSource }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {radios.map((radio) => {
          const isSelected = selectedRadioId === radio.id;
          const imageSource = isSelected && currentCoverSource ? currentCoverSource : radio.logo;
          
          return (
            <TouchableOpacity
              key={radio.id}
              style={[
                styles.card,
                isSelected && styles.cardActive,
              ]}
              onPress={() => onSelectRadio(radio)}
              activeOpacity={0.7}
            >
              <Image 
                source={imageSource} 
                style={isSelected && currentCoverSource ? styles.coverImage : styles.logo}
              />
              <Text 
                style={[
                  styles.name,
                  isSelected && styles.nameActive,
                ]}
                numberOfLines={2}
              >
                {radio.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 10,
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  card: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: COLORS.primary,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  name: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  nameActive: {
    fontWeight: 'bold',
  },
});
