import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import JournalEntry from './JournalEntry';
import { useRoute } from '@react-navigation/native';

const JournalScreen: React.FC = () => {
  const route = useRoute();
  const { date } = route.params;

  const entry = {
    title: 'Mon Journal',
    date: date,
    text: 'Un meilleur jour s\'annonce...'
  };

  const handleDelete = () => {
    // Logic to delete the journal entry
    console.log('Entry deleted');
  };

  useEffect(() => {
    const saveOnBlur = () => {
      Keyboard.dismiss();
    };

    return () => {
      saveOnBlur();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <JournalEntry entry={entry} onDelete={handleDelete} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JournalScreen;