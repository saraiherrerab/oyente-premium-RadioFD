import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const NUM_BARS = 40;

export const SoundWaves = ({ isPlaying }) => {
  const animations = useRef(
    Array.from({ length: NUM_BARS }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    if (isPlaying) {
      // Iniciar animaciones para cada barra
      const loops = animations.map((anim, index) => {
        const duration = 300 + Math.random() * 500; // 300-800ms
        const delay = Math.random() * 200;
        const maxScale = 0.5 + Math.random() * 0.5; // 0.5-1.0

        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: maxScale,
              duration: duration,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: duration,
              useNativeDriver: true,
            }),
          ])
        );
      });

      loops.forEach(loop => loop.start());

      return () => {
        loops.forEach(loop => loop.stop());
      };
    } else {
      // Resetear todas las barras
      animations.forEach(anim => {
        anim.setValue(0.3);
      });
    }
  }, [isPlaying]);

  if (!isPlaying) {
    return null;
  }

  const getOpacity = (scale) => {
    return scale.interpolate({
      inputRange: [0.3, 1.0],
      outputRange: [0.15, 0.35],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.barsContainer}>
        {animations.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                transform: [{ scaleY: anim }],
                opacity: getOpacity(anim),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barsContainer: {
    flexDirection: 'row',
    height: '15%',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    width: 3,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 2,
  },
});
