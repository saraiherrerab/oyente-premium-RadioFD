import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, NowPlaying, PlayButton, Footer, Schedule, NotificationPanel, DynamicBackground, SoundWaves } from '../components';
import RadioList from '../components/RadioList';
import LiveIndicator from '../components/LiveIndicator';
import { audioPlayer } from '../services';
import { getCoverSource } from '../utils';
import { COLORS, RADIO_CONFIG } from '../constants';

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(RADIO_CONFIG.radios[0]);
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);
  const [nowPlaying, setNowPlaying] = useState({
    song: selectedRadio.name,
    artist: 'Tu música, tu radio',
    coverUrl: null,
  });

  useEffect(() => {
    audioPlayer.initialize();
    
    return () => {
      audioPlayer.stop();
    };
  }, []);

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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <DynamicBackground imageSource={coverSource}>
        <SoundWaves isPlaying={isPlaying} />
        
        <View style={styles.container}>
          <Header onNotificationPress={handleNotificationPress} />
          
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            scrollEnabled={isScheduleExpanded}
          >
            <NowPlaying 
              song={nowPlaying.song}
              artist={nowPlaying.artist}
              coverUrl={nowPlaying.coverUrl}
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
          
          <Footer />
        </View>
      </DynamicBackground>

      <NotificationPanel 
        visible={showNotifications}
        onClose={handleCloseNotifications}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111827',
  },
  container: {
    flex: 1,
    zIndex: 1,
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
