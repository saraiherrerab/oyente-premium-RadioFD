import { useState } from 'react';
<<<<<<< Updated upstream
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
=======
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
>>>>>>> Stashed changes
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ContactModal from '../ContactModal';
import { COLORS } from '../../constants';
import { RADIO_CONFIG } from '../../config';

<<<<<<< Updated upstream
export default function Header({ onNotificationPress }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <LinearGradient
        colors={['#D4AF37', '#8B7355', '#5A5A5A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.iconContainer}>
          <Image 
            source={require('../../../assets/icons/radiologo.png')} 
            style={styles.logo}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Estrella FM</Text>
          <Text style={styles.tagline}>Tu música, tu radio</Text>
        </View>
        <View style={styles.rightButtons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setModalVisible(true)}
          >
            <Image 
              source={require('../../../assets/icons/communication-center (1).png')} 
              style={styles.contactIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onNotificationPress}
          >
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ContactModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
=======
export default function Header({ onNotificationPress, colors, mode = 'client1' }) {
  // Soporte para color dinámico (extraído de portada) con fallback al gradiente premium
  const bgColor = colors?.primary || null;

  const renderClient2 = () => (
    <View style={[styles.container, { backgroundColor: bgColor || COLORS.primary }]}>
      <Image
        source={require('../../../assets/icons/radiologo.png')}
        style={styles.client2CenteredLogo}
        resizeMode="contain"
      />
    </View>
>>>>>>> Stashed changes
  );

  const renderEmpty = () => (
    <View style={[styles.container, { backgroundColor: bgColor || COLORS.primary }]} />
  );

  const renderClient1 = () => {
    const content = (
      <>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/icons/radiologo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textFlex} />
        <View style={styles.titleCenter} pointerEvents="none">
          <View style={styles.titleRow} pointerEvents="auto">
            <Text style={styles.title}>{RADIO_CONFIG.name}</Text>
          </View>
          <Text style={styles.tagline}>{RADIO_CONFIG.tagline}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </>
    );

    // Si hay color dinámico disponible, usarlo como fondo sólido; si no, mantener gradiente premium
    if (bgColor) {
      return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
          {content}
        </View>
      );
    }

    return (
      <LinearGradient
        colors={['#9333EA', '#3B82F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        {content}
      </LinearGradient>
    );
  };

  if (mode === 'client2') return renderClient2();
  if (mode === 'false' || mode === false) return renderEmpty();
  return renderClient1();
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
<<<<<<< Updated upstream
=======
    minHeight: 88,
    overflow: 'hidden',
>>>>>>> Stashed changes
  },
  iconContainer: {
    marginRight: 15,
  },
  logo: {
    width: 48,
    height: 48,
  },
  client2CenteredLogo: {
    position: 'absolute',
    left: '15%',
    top: '45%',
    width: '85%',
    height: '95%',
  },
  textFlex: {
    flex: 1,
  },
  titleCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 20,
    alignItems: 'center',
    zIndex: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagline: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  contactIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});
