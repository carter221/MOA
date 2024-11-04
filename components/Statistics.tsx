import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Statistics = ({ entriesThisYear, numberOfWords, daysJournaled }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Icon name="event-note" size={30} color="#4CAF50" />
        <View style={styles.statTextContainer}>
          <Text style={styles.statValue}>{entriesThisYear}</Text>
          <Text style={styles.statLabel}>Entries this year</Text>
        </View>
      </View>
      <View style={styles.statItem}>
        <Icon name="text-fields" size={30} color="#2196F3" />
        <View style={styles.statTextContainer}>
          <Text style={styles.statValue}>{numberOfWords}</Text>
          <Text style={styles.statLabel}>Number of words</Text>
        </View>
      </View>
      <View style={styles.statItem}>
        <Icon name="calendar-today" size={30} color="#FF9800" />
        <View style={styles.statTextContainer}>
          <Text style={styles.statValue}>{daysJournaled}</Text>
          <Text style={styles.statLabel}>Days journaled</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    marginTop: -10,
    marginLeft:-25,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
  },
  statTextContainer: {
    flexDirection: 'column',
    marginLeft: 1,
  },
  statLabel: {
    fontSize: 10,
    color: '#555',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Statistics;