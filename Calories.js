import * as React from 'react';
import { AsyncStorage, Text, View, TextInput, TouchableOpacity, Button, FlatList } from 'react-native';
import {styles} from './stylesfile/caloriestyles';
import Constants from 'expo-constants';

const API_KEY1 = '24f94bc4d8b12afe17f465462ed5c4fe';
const API_ID1 = '8a74320d';

const API_KEY2 = '1b184a19b1ea6772e14b4db76e9cf0b1';
const API_ID2 = 'df51396d';

const API_KEY3 = 'c0e38faa5310b1ae8c53802acacaaa1a';
const API_ID3 = 'df51396d';

export default function App() {
  const [foodName, setFoodName] = React.useState('');
  const [selectedFoodCalories, setSelectedFoodCalories] = React.useState(0);
  const [totalCalories, setTotalCalories] = React.useState(0);
  const [foodOptions, setFoodOptions] = React.useState([]);
  
    // Load total calories from AsyncStorage on mount
  React.useEffect(() => {
    async function loadTotalCalories() {
      const savedTotalCalories = await AsyncStorage.getItem('totalCalories');
      if (savedTotalCalories !== null) {
        setTotalCalories(parseInt(savedTotalCalories));
      }
    }
    loadTotalCalories();
  }, []);

  // Save total calories to AsyncStorage on change
  React.useEffect(() => {
    async function saveTotalCalories() {
      await AsyncStorage.setItem('totalCalories', totalCalories.toString());
    }
    saveTotalCalories();
  }, [totalCalories]);
  
  const handleFoodNameChange = (text) => {
    setFoodName(text);
    fetch(`https://api.nutritionix.com/v1_1/search/${text}?results=0%3A6&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories&appId=${API_ID2}&appKey=${API_KEY2}`)
    
      .then((response) => response.json())
      .then((data) => {
        if (data.hits.length > 0) {
          setFoodOptions(data.hits.map((hit) => hit.fields.item_name));
        } else {
          setFoodOptions([]);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setFoodOptions([]);
      });
  };

  const handleFoodOptionPress = (option) => {
    setFoodName(option);
    setFoodOptions([]);
    setSelectedFoodCalories(0); 
    fetch(`https://api.nutritionix.com/v1_1/search/${option}?results=0%3A6&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories&appId=${API_ID2}&appKey=${API_KEY2}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.hits.length > 0) {
          setSelectedFoodCalories(parseInt(data.hits[0].fields.nf_calories));
        } else {
          throw new Error('Food not found.');
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAddCalories = () => {
    setTotalCalories(prevCalories => prevCalories + selectedFoodCalories);
    setFoodName('');
    setSelectedFoodCalories(0);
  };

  const handleClearCalories = () => {
    setTotalCalories(0);
    setSelectedFoodCalories(0);
  };

return (
  <View style={styles.container}>
    <Text style={styles.heading}> 🐷 Calories Tracker 🐷 </Text>
    <View style={styles.form}>
      <Text style={styles.label}>Enter a food name:</Text>
      <TextInput
        style={styles.input}
        value={foodName}
        onChangeText={handleFoodNameChange}
        onSubmitEditing={() => handleFoodOptionPress(foodOptions[0])}
      />
      {foodOptions.length > 0 && (
        <FlatList
          style={styles.dropdownList}
          data={foodOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => handleFoodOptionPress(item)}
            >
              <Text style={styles.dropdownButtonText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
    {selectedFoodCalories > 0 && (
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesText}>
          Selected food calories: {selectedFoodCalories} 🍴
        </Text>
      </View>
    )}
    <View style={styles.middleContainer}>
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesText}>
          Total calories: {totalCalories} 🍔
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="  Add Calories  " onPress={handleAddCalories} />
        <Button title="Clear Calories" onPress={handleClearCalories} color="red" style={{ marginTop: 10 }} />
      </View>
    </View>
  </View>
);
}