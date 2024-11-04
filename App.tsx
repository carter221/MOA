import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './components/HomeScreen';
import CalendarComponent from './components/CalendarComponent';

const Tab = createBottomTabNavigator();

const App = () => {
  const [journals, setJournals] = useState({});

  const journal = {
    "2024-11-23": {
      "id": 5,
      "date": "2024-11-23",
      "emojiDay": "👌",
      "text": "coucou"
    },
    "2024-11-24": {
      "id": 1,
      "date": "2024-11-24",
      "emojiDay": "❤",
      "text": "tst1"
    },
    "2024-10-23": {
      "id": 5,
      "date": "2024-10-23",
      "emojiDay": "😁",
      "text": "test2"
    }
  }

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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar">
          {() => <CalendarComponent date={new Date()} journal={journal} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;