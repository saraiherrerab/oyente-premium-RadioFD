import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AlbumArt } from '../AlbumArt';
import { getCoverSource, shouldShowDiskIcon } from '../../utils';
import { COLORS } from '../../constants';

const { width, height } = Dimensions.get('window');

<<<<<<< Updated upstream
export default function NowPlaying({ song, artist, coverUrl }) {
  const coverSource = getCoverSource(coverUrl);
  const showDiskIcon = shouldShowDiskIcon(coverUrl);

  return (
    <View style={styles.container}>
      <AlbumArt 
        imageSource={coverSource}
        showDiskIcon={showDiskIcon}
        size="medium"
      />
=======
export default function NowPlaying({ song, artist, imageSource, accentColors }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={accentColors || ['#E8D5F5', '#D4E4F7', '#E8D5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.albumArt}
      >
        <Image 
          source={imageSource || require('../../../assets/icons/DISK.png')}
          style={styles.diskImage}
        />
      </LinearGradient>
>>>>>>> Stashed changes
      
      <Text style={styles.nowPlayingLabel}>REPRODUCIENDO AHORA</Text>
      <Text style={styles.songTitle} numberOfLines={1}>{song}</Text>
      <Text style={styles.artistName} numberOfLines={1}>{artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: 20,
  },
<<<<<<< Updated upstream
=======
  albumArt: {
    width: width * 0.45,
    maxWidth: 200,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  diskImage: {
    width: '82%',
    height: '82%',
    borderRadius: 999,
    resizeMode: 'cover',
  },
>>>>>>> Stashed changes
  nowPlayingLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 1.2,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  songTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  artistName: {
    fontSize: 15,
    color: '#D1D5DB',
    textAlign: 'center',
  },
});
