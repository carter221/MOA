import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JournalItem = ({ journal }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayItem = journal[today];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Journal</Text>
      {todayItem ? (
        <View>
          <Text style={styles.date}>{today}</Text>
          <Text style={styles.emoji}>{todayItem.emojiDay}</Text>
          <Text style={styles.text}>{todayItem.text}</Text>
        </View>
      ) : (
        <Text style={styles.text}>No journal entry for today.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    marginLeft: -20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  emoji: {
    fontSize: 24,
    marginTop: 10,
  },
});

export default JournalItem;