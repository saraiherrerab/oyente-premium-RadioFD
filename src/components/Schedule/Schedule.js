import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const scheduleData = [
  {
    id: 1,
    program: 'Buenos Días',
    host: 'Juan Pérez',
    time: '06:00 - 10:00',
  },
  {
    id: 2,
    program: 'Música Sin Parar',
    host: 'Automático',
    time: '10:00 - 14:00',
  },
  {
    id: 3,
    program: 'Tarde Musical',
    host: 'María González',
    time: '14:00 - 18:00',
  },
  {
    id: 4,
    program: 'Noche de Estrellas',
    host: 'Carlos Rodríguez',
    time: '18:00 - 22:00',
  },
  {
    id: 5,
    program: 'Trasnoche',
    host: 'Laura Martínez',
    time: '22:00 - 02:00',
  },
];

export const Schedule = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Expandido por defecto

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
          <Text style={styles.title}>Programación de Hoy</Text>
        </View>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color={COLORS.textSecondary} 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.programList}>
          {scheduleData.map((item) => (
            <View key={item.id} style={styles.programItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="radio-outline" size={24} color={COLORS.primary} />
              </View>
              
              <View style={styles.programInfo}>
                <Text style={styles.programName}>{item.program}</Text>
                <Text style={styles.hostName}>{item.host}</Text>
              </View>
              
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  programList: {
    gap: 0,
    marginTop: 16,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  hostName: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
  },
});
