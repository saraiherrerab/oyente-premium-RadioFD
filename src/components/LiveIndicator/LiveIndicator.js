import { View, Text, StyleSheet, Image } from 'react-native';

export default function LiveIndicator({ isLive, viewerCount, showViewers, variant = 'both' }) {
  if (!isLive) {
    return null;
  }

  const shouldShowLiveBadge = variant === 'both' || variant === 'live';
  const shouldShowViewersBadge = showViewers && viewerCount !== null && (variant === 'both' || variant === 'viewers');

  return (
    <View style={styles.container}>
      {shouldShowLiveBadge && (
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>EN VIVO</Text>
        </View>
      )}

      {shouldShowViewersBadge && (
        <View style={styles.viewersBadge}>
          <Image 
            source={require('../../../assets/icons/avatar.png')} 
            style={styles.icon}
          />
          <Text style={styles.viewersText}>{viewerCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  viewersBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: '#FFFFFF',
    resizeMode: 'contain',
  },
  viewersText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
