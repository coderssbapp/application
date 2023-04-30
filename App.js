import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import CalendarScreen from './Calendar';
import NotesScreen from './Notes';
import WeatherScreen from './Weather';
import CaloriesScreen from './Calories';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Notes" component={NotesScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Calories" component={CaloriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Home Screen</Text>
      <View style={styles.buttonContainer}>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate('Calendar')}
        >
          Go to Calendar
        </Text>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate('Notes')}
        >
          Go to Notes
        </Text>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate('Weather')}
        >
          Go to Weather
        </Text>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate('Calories')}
        >
          Go to Calorie Tracker
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  button: {
    fontSize: 18,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    width: '100%',
  },
});
