import React, { useState, useEffect } from 'react';
import { styles } from './weatherstyles';
import { Text, View, TextInput, Button, Image, FlatList, AsyncStorage, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const API_KEY = '397a10ef3f414514a4b23717232504';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [defaultCity, setDefaultCity] = useState('');
  const [defaultCityWeather, setDefaultCityWeather] = useState(null);
  const [cityList, setCityList] = useState([]);
  
  useEffect(() => {
    async function getDefaultCity() {
      try {
        const value = await AsyncStorage.getItem('defaultCity');
        if (value !== null) {
          setDefaultCity(value);
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${value}&aqi=no`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }

          const data = await response.json();
          setDefaultCityWeather(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getDefaultCity();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setCityList([]);
  };

  const renderCityItem = ({ item }) => (
    <Button title={item.name} onPress={() => handleSelectCity(item.name)} />
  );

  const handleSetDefaultCity = async () => {
  try {
    await AsyncStorage.setItem('defaultCity', city);
    setDefaultCity(city);
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch default city weather data');
    }

    const data = await response.json();
    setDefaultCityWeather(data);
  } catch (error) {
    console.error(error);
  }
};


  return (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
  <View style={styles.container}>
    <View style={styles.defaultCityContainer}>
      {defaultCityWeather && (
        <View style={styles.weatherContainer}>
          <Image
            style={styles.weatherIcon}
            source={{ uri: `https:${defaultCityWeather.current.condition.icon}` }}
          />
          <Text style={styles.weatherText}>
            {defaultCityWeather.current.temp_c}°C / {defaultCityWeather.current.temp_f}°F
          </Text>
          <Text style={styles.weatherDescription}>{defaultCityWeather.current.condition.text}</Text>
        </View>
      )}
      <Text style={styles.defaultCityText}>Current City: {defaultCity}</Text>
    </View>
    <Text style={styles.title}>Weather</Text>
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={(text) => {
          setCity(text);
        }}
      />
      {cityList.length > 0 && (
        <FlatList
          style={styles.cityList}
          data={cityList}
          renderItem={renderCityItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
    <View style={styles.buttonContainer}>
      <Button title="View Weather" onPress={fetchWeather} />
      {defaultCity === city ? (
        <View style={styles.setDefaultContainer}>
          <MaterialIcons name="location-on" size={24} color ="#fff" />
          <Text style={styles.setDefaultText}></Text>
        </View>
        ) : (
      <Button title="Set as Current City" onPress={handleSetDefaultCity} />
        )}
    </View>
    {weather && (
      <View style={styles.weatherContainer}>
        <Image
          style={styles.weatherIcon}
          source={{ uri: `https:${weather.current.condition.icon}` }}
        />
        <Text style={styles.weatherText}>
          {weather.current.temp_c}°C / {weather.current.temp_f}°F
        </Text>
        <Text style={styles.weatherDescription}>{weather.current.condition.text}</Text>
      </View>
    )}
  </View>
  </KeyboardAvoidingView>
);
}

export default App;