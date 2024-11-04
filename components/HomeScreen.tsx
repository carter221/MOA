import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Statistics from './Statistics';

const HomeScreen = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [entriesThisYear, setEntriesThisYear] = useState(0);
  const [numberOfWords, setNumberOfWords] = useState(0);
  const [daysJournaled, setDaysJournaled] = useState(0);

  useEffect(() => {
    // Fetch or calculate the statistics here
    // For demonstration purposes, we'll use hardcoded values
    setEntriesThisYear(50);
    setNumberOfWords(12000);
    setDaysJournaled(30);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity
          onPress={() => setShowDescription(!showDescription)}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>Journal</Text>
        </TouchableOpacity>
        {showDescription && (
          <Text style={styles.description}>
            Welcome to your journal!
          </Text>
        )}
      </View>
      <Statistics
        entriesThisYear={entriesThisYear}
        numberOfWords={numberOfWords}
        daysJournaled={daysJournaled}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffff',
    height: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    marginRight: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: -10,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
  },
});

export default HomeScreen;