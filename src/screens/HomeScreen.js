import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
<<<<<<< Updated upstream
import { Header, NowPlaying, PlayButton, Footer, Schedule, NotificationPanel, DynamicBackground, SoundWaves } from '../components';
import RadioList from '../components/RadioList';
import LiveIndicator from '../components/LiveIndicator';
import { audioPlayer } from '../services';
import { getCoverSource } from '../utils';
import { COLORS, RADIO_CONFIG } from '../constants';
=======
import { Header, NowPlaying, PlayButton, SocialLinks, Footer, Schedule, NotificationPanel } from '../components';
import { audioPlayer } from '../services';
import { COLORS } from '../constants';
import { getDominantColorFromAsset } from '../utils';

const STREAM_URL = 'https://streamingned.com:7190/stream';
const CENTER_IMAGE = require('../../assets/icons/disco1.jpg');

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

function buildGradientFromColor(baseColor) {
  return [
    mixColor(baseColor, '#0f172a', 0.45),
    baseColor,
    mixColor(baseColor, '#ffffff', 0.28),
  ];
}
>>>>>>> Stashed changes

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
<<<<<<< Updated upstream
  const [selectedRadio, setSelectedRadio] = useState(RADIO_CONFIG.radios[0]);
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({
    song: selectedRadio.name,
    artist: 'Tu música, tu radio',
    coverUrl: null,
  });
=======
  const [primaryColor, setPrimaryColor] = useState(COLORS.primary);
  const [dynamicColors, setDynamicColors] = useState(buildGradientFromColor(COLORS.primary));
>>>>>>> Stashed changes

  useEffect(() => {
    audioPlayer.initialize();
    
    return () => {
      audioPlayer.stop();
    };
  }, []);

<<<<<<< Updated upstream
  const handleSelectRadio = async (radio) => {
    // Si está reproduciendo, detener el audio actual
    if (isPlaying) {
      await audioPlayer.stop();
      setIsPlaying(false);
    }

    // Cambiar a la nueva radio
    setSelectedRadio(radio);
    setNowPlaying({
      song: radio.name,
      artist: 'Tu música, tu radio',
      coverUrl: null,
    });
  };
=======
  useEffect(() => {
    let isMounted = true;

    const loadImageColors = async () => {
      const dominantColor = await getDominantColorFromAsset(CENTER_IMAGE);
      if (isMounted && dominantColor) {
        setPrimaryColor(dominantColor);
        setDynamicColors(buildGradientFromColor(dominantColor));
      }
    };

    loadImageColors();

    return () => {
      isMounted = false;
    };
  }, []);
>>>>>>> Stashed changes

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

  const coverSource = getCoverSource(nowPlaying.coverUrl);

  return (
<<<<<<< Updated upstream
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <DynamicBackground imageSource={coverSource}>
        <SoundWaves isPlaying={isPlaying} />
        
=======
    <View style={styles.gradient}>
      <ImageBackground
        source={CENTER_IMAGE}
        blurRadius={28}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageInner}
      >
        <View style={[styles.backgroundOverlay, { backgroundColor: mixColor(primaryColor, '#000000', 0.52) }]} />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
>>>>>>> Stashed changes
        <View style={styles.container}>
          <Header onNotificationPress={handleNotificationPress} colors={{ primary: primaryColor }} />
          
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            scrollEnabled={isScheduleExpanded}
          >
            <NowPlaying 
<<<<<<< Updated upstream
              song={nowPlaying.song}
              artist={nowPlaying.artist}
              coverUrl={nowPlaying.coverUrl}
=======
              imageSource={CENTER_IMAGE}
              accentColors={dynamicColors}
              song="Blinding Lights" 
              artist="The Weeknd" 
>>>>>>> Stashed changes
            />
            
            <View style={styles.playButtonContainer}>
              <PlayButton onPress={handlePlayPress} isPlaying={isPlaying} />
              <LiveIndicator 
                isLive={isPlaying}
                viewerCount={RADIO_CONFIG.viewers.count}
                showViewers={RADIO_CONFIG.viewers.enabled}
              />
            </View>
            
            <Schedule onExpandChange={setIsScheduleExpanded} />
            
            <RadioList 
              radios={RADIO_CONFIG.radios}
              selectedRadioId={selectedRadio.id}
              onSelectRadio={handleSelectRadio}
              currentCoverSource={coverSource}
            />
          </ScrollView>
          
          <Footer colors={{ primary: primaryColor }} />
        </View>
      </DynamicBackground>

      <NotificationPanel 
        visible={showNotifications}
        onClose={handleCloseNotifications}
      />
<<<<<<< Updated upstream
    </SafeAreaView>
=======
    </View>
>>>>>>> Stashed changes
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
=======
  gradient: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImageInner: {
    transform: [{ scale: 1.12 }],
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
>>>>>>> Stashed changes
  safeArea: {
    flex: 1,
    backgroundColor: '#111827',
  },
  container: {
    flex: 1,
<<<<<<< Updated upstream
    zIndex: 1,
=======
    backgroundColor: 'transparent',
>>>>>>> Stashed changes
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    gap: 24,
  },
  playButtonContainer: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
});
