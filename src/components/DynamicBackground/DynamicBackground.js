import { View, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const DynamicBackground = ({ imageSource, children }) => {
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
      <ImageBackground
        source={imageSource}
        style={styles.background}
        blurRadius={15}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>
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
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    flex: 1,
  },
  fallbackGradient: {
    flex: 1,
  },
});
