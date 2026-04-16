import { Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants';

<<<<<<< Updated upstream
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
=======
export default function Footer({ colors }) {
  const bgColor = colors?.primary || null;

  if (bgColor) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}> 
        <Text style={styles.text}>Información de canciones cortesía de iTunes</Text>
      </View>
    );
  }

>>>>>>> Stashed changes
  return (
    <LinearGradient
      colors={['#D4AF37', '#8B7355', '#5A5A5A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.text}>© {currentYear} Estrella FM</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
