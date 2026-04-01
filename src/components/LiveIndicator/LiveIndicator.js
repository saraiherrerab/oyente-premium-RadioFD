import { View, Text, StyleSheet, Image } from 'react-native';

export default function LiveIndicator({ isLive, viewerCount, showViewers }) {
  if (!isLive) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.liveBadge}>
        <Text style={styles.liveText}>EN VIVO</Text>
      </View>
      
      {showViewers && viewerCount !== null && (
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
    gap: 8,
    zIndex: 1,
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
