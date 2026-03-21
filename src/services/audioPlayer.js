import { Audio } from 'expo-av';

class AudioPlayer {
  constructor() {
    this.sound = null;
    this.isPlaying = false;
  }

  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  async play(streamUrl) {
    try {
      if (this.sound) {
        await this.stop();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: streamUrl },
        { shouldPlay: true },
        this._onPlaybackStatusUpdate
      );

      this.sound = sound;
      this.isPlaying = true;
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing stream:', error);
      throw error;
    }
  }

  async stop() {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
        this.isPlaying = false;
      }
    } catch (error) {
      console.error('Error stopping stream:', error);
    }
  }

  _onPlaybackStatusUpdate = (status) => {
    if (status.error) {
      console.error('Playback error:', status.error);
    }
  };

  getIsPlaying() {
    return this.isPlaying;
  }
}

export default new AudioPlayer();
