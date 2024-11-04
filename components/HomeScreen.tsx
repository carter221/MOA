import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Statistics from './Statistics';
import JournalEntry from './JournalEntry';
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({ journals, saveJournals }) => {
  const route = useRoute();
  const [showDescription, setShowDescription] = useState(false);
  const [entriesThisYear, setEntriesThisYear] = useState(0);
  const [numberOfWords, setNumberOfWords] = useState(0);
  const [daysJournaled, setDaysJournaled] = useState(0);
  const [journalEntry, setJournalEntry] = useState('');

  const [journal, setJournal] = useState(journals);

  useEffect(() => {
    // Fetch or calculate the statistics here
    // For demonstration purposes, we'll use hardcoded values
    setEntriesThisYear(50);
    setNumberOfWords(12000);
    setDaysJournaled(30);
  }, []);

  const deleteTodayEntry = () => {
    const today = route.params?.date || new Date().toISOString().split('T')[0];
    const newJournal = { ...journal };
    delete newJournal[today];
    setJournal(newJournal);
    saveJournals(newJournal);
  };

  const today = route.params?.date || new Date().toISOString().split('T')[0];

  const data = [
    { key: 'statistics', component: <Statistics entriesThisYear={entriesThisYear} numberOfWords={numberOfWords} daysJournaled={daysJournaled} /> },
    { key: 'journalEntry', component: <JournalEntry entry={journal[today] || { title: '', date: today, text: '', emojiDay: '' }} onDelete={deleteTodayEntry} journalEntry={journalEntry} setJournalEntry={setJournalEntry} /> },
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => item.component}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
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
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eeeee',
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