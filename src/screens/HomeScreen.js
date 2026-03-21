import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Header, NowPlaying, PlayButton, SocialLinks, Footer, Schedule, NotificationPanel } from '../components';
import { audioPlayer } from '../services';
import { COLORS } from '../constants';

const STREAM_URL = 'https://streamingned.com:7190/stream';

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    audioPlayer.initialize();
    
    return () => {
      audioPlayer.stop();
    };
  }, []);

  const handlePlayPress = async () => {
    try {
      if (isPlaying) {
        await audioPlayer.stop();
        setIsPlaying(false);
      } else {
        await audioPlayer.play(STREAM_URL);
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

  return (
    <LinearGradient
      colors={['#9333EA', '#3B82F6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.container}>
          <Header onNotificationPress={handleNotificationPress} />
          
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <NowPlaying 
              song="Blinding Lights" 
              artist="The Weeknd" 
            />
            
            <View style={styles.playButtonContainer}>
              <PlayButton onPress={handlePlayPress} isPlaying={isPlaying} />
            </View>
            
            <Schedule />
            
            <SocialLinks />
          </ScrollView>
          
          <Footer />
        </View>
      </SafeAreaView>

      <NotificationPanel 
        visible={showNotifications}
        onClose={handleCloseNotifications}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  },
});
