import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button, Alert } from 'react-native';
import Statistics from './Statistics';
import JournalEntry from './JournalEntry';

const HomeScreen = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [entriesThisYear, setEntriesThisYear] = useState(0);
  const [numberOfWords, setNumberOfWords] = useState(0);
  const [daysJournaled, setDaysJournaled] = useState(0);
  const [journalEntry, setJournalEntry] = useState('');

  const [journal, setJournal] = useState({
    '2023-10-01': { title: 'Park Visit', date: '2023-10-01', text: 'Went to the park', emojiDay: '🌳' },
    '2023-10-02': { title: 'Work Day', date: '2023-10-02', text: 'Had a great day at work', emojiDay: '💼' },
  });

  useEffect(() => {
    // Fetch or calculate the statistics here
    // For demonstration purposes, we'll use hardcoded values
    setEntriesThisYear(50);
    setNumberOfWords(12000);
    setDaysJournaled(30);
  }, []);

  const addJournalEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const emojis = ['🌳', '💼', '🌞', '🌜', '🌟', '🌈', '🔥', '💧', '🍀', '🌹'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    if (journal[today]) {
      Alert.alert('Entry Exists', 'There is already an entry for today.');
      return;
    }

    const newJournal = {
      ...journal,
      [today]: { title: 'New Entry', date: today, text: journalEntry, emojiDay: randomEmoji },
    };

    setJournal(newJournal);
    setJournalEntry('');
  };

  const deleteTodayEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const newJournal = { ...journal };
    delete newJournal[today];
    setJournal(newJournal);
  };

  const today = new Date().toISOString().split('T')[0];
  const hasTodayEntry = !!journal[today];

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
      {hasTodayEntry ? (
        <JournalEntry entry={journal[today]} onDelete={deleteTodayEntry} />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your journal entry"
            value={journalEntry}
            onChangeText={setJournalEntry}
          />
          <Button title="Add Journal Entry" onPress={addJournalEntry} />
        </>
      )}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;