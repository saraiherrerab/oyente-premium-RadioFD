import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AlbumArt } from '../AlbumArt';
import { getCoverSource, shouldShowDiskIcon } from '../../utils';

const { height } = Dimensions.get('window');

export default function NowPlaying({ song, artist, coverUrl, imageSource }) {
  const coverSource = imageSource || getCoverSource(coverUrl);
  const showDiskIcon = !imageSource && shouldShowDiskIcon(coverUrl);

  return (
    <View style={styles.container}>
      <AlbumArt
        imageSource={coverSource}
        showDiskIcon={showDiskIcon}
        size="medium"
      />

      <Text style={styles.nowPlayingLabel}>REPRODUCIENDO AHORA</Text>
      <Text style={styles.songTitle} numberOfLines={1}>{song}</Text>
      <Text style={styles.artistName} numberOfLines={1}>{artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: height * 0.012,
    paddingHorizontal: 20,
  },
  nowPlayingLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    letterSpacing: 1.2,
    marginTop: 10,
    marginBottom: 6,
    fontWeight: '500',
  },
  songTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
    textAlign: 'center',
  },
  artistName: {
    fontSize: 15,
    color: '#D1D5DB',
    textAlign: 'center',
  },
});
