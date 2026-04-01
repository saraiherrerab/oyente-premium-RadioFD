import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
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
