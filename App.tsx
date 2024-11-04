import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './components/HomeScreen';
import CalendarComponent from './components/CalendarComponent';
import JournalScreen from './components/JournalSceen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [journals, setJournals] = useState({});

  useEffect(() => {
    const loadJournals = async () => {
      try {
        const storedJournals = await AsyncStorage.getItem('journals');
        if (storedJournals) {
          setJournals(JSON.parse(storedJournals));
        }
      } catch (error) {
        console.error('Failed to load journals', error);
      }
    };

    loadJournals();
  }, []);

  const saveJournals = async (newJournals) => {
    try {
      await AsyncStorage.setItem('journals', JSON.stringify(newJournals));
      setJournals(newJournals);
    } catch (error) {
      console.error('Failed to save journals', error);
    }
  };

  const CalendarStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Calendar">
        {() => <CalendarComponent date={new Date()} journal={journals} />}
      </Stack.Screen>
      <Stack.Screen name="JournalScreen" component={JournalScreen} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Calendar') {
              iconName = 'calendar-today';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen journals={journals} saveJournals={saveJournals} />}
        </Tab.Screen>
        <Tab.Screen name="Calendar" component={CalendarStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;