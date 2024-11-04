import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import MonthYearPicker from 'react-native-month-year-picker';
import { useNavigation } from '@react-navigation/native';


const CalendarComponent = ({ date, journal }) => {
  const [isShow, setIsShow] = useState(false);
  const navigation = useNavigation();
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
            <TouchableOpacity onPress={() => navigation.navigate("Home",{id: date?.dateString})}>
              <Text>{date?.day}</Text>
              <Text>{journalDay ? journalDay.emojiDay : "..."}</Text>
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