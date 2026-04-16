import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SIZES = {
  small: width * 0.25,
  medium: Math.min(width * 0.315, 140),
  large: width * 0.6,
};

export const AlbumArt = ({ imageSource, showDiskIcon = false, size = 'medium' }) => {
  const containerSize = SIZES[size];

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      {showDiskIcon ? (
        <LinearGradient
          colors={['#E8D5F5', '#D4E4F7', '#E8D5F5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <Image 
            source={require('../../../assets/icons/DISK.png')} 
            style={styles.diskIcon}
          />
        </LinearGradient>
      ) : (
        <>
          <Image
            source={imageSource}
            style={styles.backgroundImage}
            blurRadius={20}
          />
          <View style={styles.overlay} />
          <Image
            source={imageSource}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  diskIcon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});
