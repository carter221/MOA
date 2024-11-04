import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import JournalEntry from '../components/JournalEntry';

const JournalPage: React.FC = () => {
  const entry = {
    title: 'Mon Journal',
    date: '2023-10-01',
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

export default JournalPage;