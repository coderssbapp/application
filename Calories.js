import * as React from 'react';
import { Text, View, TextInput, Button, FlatList, AsyncStorage } from 'react-native';
import {styles} from './caloriestyles';
import Constants from 'expo-constants';

const API_KEY = '24f94bc4d8b12afe17f465462ed5c4fe';
const API_ID = '8a74320d';

export default function App() {
  const [foodName, setFoodName] = React.useState('');
  const [selectedFoodCalories, setSelectedFoodCalories] = React.useState(0);
  const [totalCalories, setTotalCalories] = React.useState(0);
  const [foodOptions, setFoodOptions] = React.useState([]);
  
  React.useEffect(() => {
  // Retrieve the saved total calories value from AsyncStorage when the component mounts
  AsyncStorage.getItem('totalCalories')
    .then((value) => {
      if (value !== null) {
        setTotalCalories(parseInt(value));
      }
    })
    .catch((error) => console.log(error));
}, []);

  const handleFoodNameChange = (text) => {
    setFoodName(text);
    fetch(`https://api.nutritionix.com/v1_1/search/${text}?results=0%3A6&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories&appId=${API_ID}&appKey=${API_KEY}`)
    
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
    fetch(`https://api.nutritionix.com/v1_1/search/${option}?results=0%3A6&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories&appId=${API_ID}&appKey=${API_KEY}`)
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
  AsyncStorage.setItem('totalCalories', (totalCalories + selectedFoodCalories).toString())
    .catch((error) => console.log(error));
};


  const handleClearCalories = () => {
  AsyncStorage.removeItem('totalCalories')
    .then(() => {
      setTotalCalories(0);
      setSelectedFoodCalories(0);
    })
    .catch((error) => console.log(error));
};


return (
  <View style={styles.container}>
    <Text style={styles.heading}>🐷 Calories Tracker 🐷</Text>
    <View style={styles.form}>
      <Text style={styles.label}>Enter a food name:</Text>
      <TextInput
        style={styles.input}
        value={foodName}
        onChangeText={handleFoodNameChange}
      />
      {foodOptions.length > 0 && (
        <FlatList
          style={styles.dropdownList}
          data={foodOptions}
          renderItem={({ item }) => (
            <Button
              title={item}
              onPress={() => handleFoodOptionPress(item)}
            />
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
        <Button title="Add Calories" onPress={handleAddCalories} />
      </View>
    </View>
    <View style={styles.clearButtonContainer}>
      <Button title="Clear Calories" onPress={handleClearCalories} />
    </View>
  </View>
);
}