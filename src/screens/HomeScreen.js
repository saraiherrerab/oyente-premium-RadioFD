import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header, NowPlaying, PlayButton, Footer, Schedule, NotificationPanel, SoundWaves, DynamicBackground } from '../components';
import RadioList from '../components/RadioList';
import LiveIndicator from '../components/LiveIndicator';
import { audioPlayer } from '../services';
import { getDominantColorFromAsset } from '../utils';
import { COLORS, RADIO_CONFIG } from '../constants';

const DEFAULT_CENTER_IMAGE = require('../../assets/icons/disco1.jpg');
const SHOW_HEADER_TOGGLE_BUTTON = false;

function clampChannel(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hexToRgb(hex) {
  const sanitized = hex.replace('#', '');
  if (sanitized.length !== 6) return null;

  return {
    r: parseInt(sanitized.slice(0, 2), 16),
    g: parseInt(sanitized.slice(2, 4), 16),
    b: parseInt(sanitized.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (value) => clampChannel(value).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixColor(hex, targetHex, weight) {
  const color = hexToRgb(hex);
  const target = hexToRgb(targetHex);
  if (!color || !target) return hex;

  return rgbToHex({
    r: color.r + (target.r - color.r) * weight,
    g: color.g + (target.g - color.g) * weight,
    b: color.b + (target.b - color.b) * weight,
  });
}

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLogoHeader, setIsLogoHeader] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(RADIO_CONFIG.radios[0]);
  const [primaryColor, setPrimaryColor] = useState(COLORS.primary);
  const [nowPlaying, setNowPlaying] = useState({
    song: RADIO_CONFIG.radios[0]?.name || RADIO_CONFIG.name,
    artist: 'Tu música, tu radio',
    coverUrl: null,
  });
  const selectedCoverImage = selectedRadio?.coverImage || DEFAULT_CENTER_IMAGE;

  useEffect(() => {
    audioPlayer.initialize();

    return () => {
      audioPlayer.stop();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadImageColors = async () => {
      const dominantColor = await getDominantColorFromAsset(selectedCoverImage);
      if (isMounted && dominantColor) {
        setPrimaryColor(dominantColor);
      }
    };

    loadImageColors();

    return () => {
      isMounted = false;
    };
  }, [selectedCoverImage]);

  const handleSelectRadio = async (radio) => {
    if (isPlaying) {
      await audioPlayer.stop();
      setIsPlaying(false);
    }

    setSelectedRadio(radio);
    setNowPlaying({
      song: radio.name,
      artist: 'Tu música, tu radio',
      coverUrl: null,
    });
  };

  const handlePlayPress = async () => {
    try {
      if (isPlaying) {
        await audioPlayer.stop();
        setIsPlaying(false);
      } else {
        await audioPlayer.play(selectedRadio.streamUrl);
        setIsPlaying(true);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo reproducir la emisora');
      setIsPlaying(false);
    }
  };

  const handleNotificationPress = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleToggleHeaderMode = () => {
    setIsLogoHeader((currentValue) => !currentValue);
  };

  return (
    <DynamicBackground
      imageSource={selectedCoverImage}
      blurRadius={28}
      overlayColor={'rgba(10, 16, 28, 0.14)'}
      imageStyle={styles.backgroundImageInner}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <SoundWaves isPlaying={isPlaying} />

        <View style={styles.container}>
          <Header
            onNotificationPress={handleNotificationPress}
            colors={{ primary: primaryColor }}
            mode={isLogoHeader ? 'client2' : 'client1'}
          />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <NowPlaying
              imageSource={selectedCoverImage}
              song={nowPlaying.song}
              artist={nowPlaying.artist}
            />

            <View style={styles.playControlsRow}>
              <View style={[styles.sideBadgeSlot, styles.leftBadgeSlot]}>
                <LiveIndicator
                  isLive={isPlaying}
                  viewerCount={RADIO_CONFIG.viewers.count}
                  showViewers={RADIO_CONFIG.viewers.enabled}
                  variant="viewers"
                />
              </View>

              <View style={styles.centerControls}>
                <PlayButton onPress={handlePlayPress} isPlaying={isPlaying} />
                {SHOW_HEADER_TOGGLE_BUTTON && (
                  <TouchableOpacity
                    style={styles.headerToggleButton}
                    onPress={handleToggleHeaderMode}
                    activeOpacity={0.85}
                  >
                    <Ionicons
                      name={isLogoHeader ? 'list-outline' : 'radio-outline'}
                      size={18}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View style={[styles.sideBadgeSlot, styles.rightBadgeSlot]}>
                <LiveIndicator
                  isLive={isPlaying}
                  viewerCount={RADIO_CONFIG.viewers.count}
                  showViewers={RADIO_CONFIG.viewers.enabled}
                  variant="live"
                />
              </View>
            </View>

            <Schedule />

            <RadioList
              radios={RADIO_CONFIG.radios}
              selectedRadioId={selectedRadio.id}
              onSelectRadio={handleSelectRadio}
              currentCoverSource={selectedCoverImage}
            />
          </ScrollView>

          <Footer colors={{ primary: primaryColor }} />
        </View>

        <NotificationPanel
          visible={showNotifications}
          onClose={handleCloseNotifications}
        />
      </SafeAreaView>
    </DynamicBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImageInner: {
    transform: [{ scale: 1.12 }],
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: 14,
    paddingBottom: 28,
    gap: 16,
    flexGrow: 1,
  },
  playControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sideBadgeSlot: {
    width: 96,
    minHeight: 44,
    justifyContent: 'center',
  },
  leftBadgeSlot: {
    alignItems: 'flex-end',
  },
  rightBadgeSlot: {
    alignItems: 'flex-start',
  },
  centerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 70,
  },
  headerToggleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
