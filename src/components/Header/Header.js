import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ContactModal from '../ContactModal';
import { COLORS } from '../../constants';
import { RADIO_CONFIG } from '../../config';

export default function Header({ onNotificationPress, colors, mode = 'client1' }) {
  const [modalVisible, setModalVisible] = useState(false);
  const bgColor = colors?.primary || null;

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
    </>
  );

  const renderClient1 = () => {
    if (bgColor) {
      return <View style={[styles.container, { backgroundColor: bgColor }]}>{content}</View>;
    }

    return (
      <LinearGradient
        colors={['#D4AF37', '#8B7355', '#5A5A5A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        {content}
      </LinearGradient>
    );
  };

  const renderClient2 = () => (
    <View style={[styles.container, styles.client2Container, { backgroundColor: bgColor || COLORS.primary }]}> 
      <View style={styles.client2Spacer} />
      <View style={styles.client2LogoWrap} pointerEvents="none">
        <Image
          source={require('../../../assets/icons/logo-radio.png')}
          style={styles.client2CenteredLogo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.client2Actions}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={[styles.container, { backgroundColor: bgColor || COLORS.primary }]} />
  );

  return (
    <>
      {mode === 'client2' ? renderClient2() : mode === 'false' || mode === false ? renderEmpty() : renderClient1()}
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
    minHeight: 88,
    overflow: 'hidden',
  },
  client2Container: {
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 15,
  },
  logo: {
    width: 48,
    height: 48,
  },
  client2Spacer: {
    width: 40,
  },
  client2LogoWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 18,
    bottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  client2CenteredLogo: {
    width: '70%',
    height: '100%',
  },
  client2Actions: {
    width: 40,
    alignItems: 'flex-end',
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
