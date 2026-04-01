import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Linking, Animated } from 'react-native';
import { COLORS, RADIO_CONFIG } from '../../constants';

export default function ContactModal({ visible, onClose }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(-20);
    }
  }, [visible]);

  const socialNetworks = [
    {
      name: 'Web',
      icon: require('../../../assets/icons/browser.png'),
      url: RADIO_CONFIG.social.website,
    },
    {
      name: 'Facebook',
      icon: require('../../../assets/icons/facebook.png'),
      url: RADIO_CONFIG.social.facebook,
    },
    {
      name: 'Instagram',
      icon: require('../../../assets/icons/instagram.png'),
      url: RADIO_CONFIG.social.instagram,
    },
    {
      name: 'X',
      icon: require('../../../assets/icons/x.png'),
      url: RADIO_CONFIG.social.twitter,
    },
    {
      name: 'YouTube',
      icon: require('../../../assets/icons/youtube.png'),
      url: RADIO_CONFIG.social.youtube,
    },
    {
      name: 'TikTok',
      icon: require('../../../assets/icons/tiktok.png'),
      url: RADIO_CONFIG.social.tiktok,
    },
  ].filter(network => network.url);

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>SÍGUENOS</Text>
          
          <View style={styles.grid}>
            {socialNetworks.map((network, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handlePress(network.url)}
              >
                <View style={styles.iconWrapper}>
                  <Image source={network.icon} style={styles.icon} />
                </View>
                <Text style={styles.label}>{network.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 280,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    width: '28%',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 11,
    color: '#4B5563',
    textAlign: 'center',
  },
});
