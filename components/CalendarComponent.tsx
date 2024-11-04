import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarComponent = ({ date, journal }) => {
  const navigation = useNavigation();
const CalendarComponent = ({ date }) => {
  const [journal, setJournal] = useState({});

  useEffect(() => {
    const fetchJournalEntry = async () => {
      try {
        const storedJournalEntry = await AsyncStorage.getItem('journalEntry');
        if (storedJournalEntry) {
          setJournal(JSON.parse(storedJournalEntry));
        }
      } catch (error) {
        console.error('Failed to fetch the journal entry', error);
      }
    };

    fetchJournalEntry();
  }, []);

  return (
    <View>
      <CalendarList
        pastScrollRange={50}
        futureScrollRange={0}
        scrollEnabled={true}
        showScrollIndicator={true}
        current={date.toISOString().split("T")[0]}
        dayComponent={({ date }) => {
          let journalDay = journal[date?.dateString];
          return (
            <TouchableOpacity onPress={() => navigation.navigate("JournalScreen", { date: date?.dateString })}>
              <Text>{date?.day}</Text>
              <Text>{journalDay ? journalDay.emoji : "..."}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CalendarComponent;