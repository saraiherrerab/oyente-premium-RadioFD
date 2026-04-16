import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const DynamicBackground = ({
  imageSource,
  children,
  blurRadius = 15,
  overlayColor = 'rgba(0, 0, 0, 0.12)',
  imageStyle,
}) => {
  if (!imageSource) {
    return (
      <LinearGradient
        colors={['#111827', '#1F2937']}
        style={styles.fallbackGradient}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={[styles.background, imageStyle]}
        blurRadius={blurRadius}
        resizeMode="cover"
      />
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.92,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    flex: 1,
  },
  fallbackGradient: {
    flex: 1,
  },
});
