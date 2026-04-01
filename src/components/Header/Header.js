import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ContactModal from '../ContactModal';
import { COLORS } from '../../constants';

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
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainer: {
    marginRight: 15,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
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
