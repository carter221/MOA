import { StatusBar } from 'expo-status-bar';
import {Alert, Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import MonthYearPicker from 'react-native-simple-month-year-picker';
import { useCallback, useState } from 'react';
import MonthPicker from 'react-native-month-year-picker';
import ScrollView = Animated.ScrollView;
import HomeScreen from './components/HomeScreen';
import * as SplashScreen from 'expo-splash-screen';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthNamesShort: [
    'Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'
  ],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

const journal = {
  "2024-11-23": {
    id: 5,
    date: "2024-11-23",
    emojiDay: "👌",
    text: "coucou"
  },
  "2024-11-24": {
    id: 1,
    date: "2024-11-24",
    emojiDay: "❤",
    text: "tst1"
  },
  "2024-10-23": {
    id: 5,
    date: "2024-10-23",
    emojiDay: "😁",
    text: "test2"
  }
};

export default function App() {
    
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load any resources or data that you need prior to rendering the app
        // Artificially delay for two seconds to simulate a slow loading experience
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const [date, setDate] = useState(new Date());
  const [isShow, setIsShow ] = useState(false)


  return (
    <View style={styles.container}>
      <HomeScreen />
      <Text style={styles.title}>Sélecteur Mois et Année</Text>

      <TouchableOpacity onPress={() => setIsShow(true)} style={styles.button}>
        <Text style={styles.buttonText}>Ouvrir le Sélecteur</Text>
      </TouchableOpacity>

      <MonthYearPicker
        isShow={isShow}
        close={() => setIsShow(false)} //setState isShow to false
        onChangeYear={(year) => console.log(year)}
        onChangeMonth={(month) => {
          console.log(month)
        }}
      />

      <CalendarList
        pastScrollRange={50}
        futureScrollRange={0}
        scrollEnabled={true}
        showScrollIndicator={true}
        current={date.toISOString().split("T")[0]}
        dayComponent={({ date }) => {
          let journalDay = journal[date?.dateString];
          return (
            <TouchableOpacity onPress={() => Alert.alert("Événement", journalDay ? journalDay.text : "Aucun événement")}>
              <Text>{date?.day}</Text>
              <Text>{journalDay ? journalDay.emojiDay : "..."}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 100,
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

