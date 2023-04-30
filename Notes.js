import React, { useState, useEffect } from 'react';
import { styles } from './notesstyles';
import { View, TextInput, Button, FlatList, Text, Dimensions, AsyncStorage } from 'react-native'; // import AsyncStorage from 'react-native' to access local storage
import { useNavigation } from '@react-navigation/native';
import { Calendar } from './Calendar';

const NOTES_KEY = 'notes'; // define a constant for the local storage key

export default function Notes() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation(); // get the navigation object

  const screenWidth = Dimensions.get('window').width;
  const noteWidth = screenWidth * 0.7; //set width of saved note box to 70% of the screen width

  const addNote = () => {
    const newNote = { title, body };
    setNotes(notes.concat(newNote)); // add the new note to the end of the array
    setTitle('');
    setBody('');
    saveNotes(notes.concat(newNote)); // save the updated notes to local storage
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    updatedNotes.sort((a, b) => a.index - b.index); // sort the notes by index
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
};


  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes)); // save the notes to local storage as a JSON string
    } catch (error) {
      console.error('Error saving notes', error);
    }
  };

  const getNotes = async () => {
    try {
      const notesString = await AsyncStorage.getItem(NOTES_KEY); // retrieve the notes from local storage as a JSON string
      if (notesString !== null) {
        const notesArray = JSON.parse(notesString); // parse the JSON string into an array of objects
        setNotes(notesArray);
      }
    } catch (error) {
      console.error('Error retrieving notes', error);
    }
  };

  useEffect(() => {
    getNotes(); // retrieve the notes from local storage when the component mounts
  }, []);

  const addToCalendar = (note, date) => {
    navigation.navigate('Calendar', { note, date }); // navigate to Calendar screen with the note object and date as parameters
  };

  return (
  <View style={styles.container}>
    <View style={[styles.inputContainer, { marginLeft: -20 }]}>
      <TextInput
        style={[styles.input, { height: 40, width: 140 }]}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.input, { height: 70, width: 270 }]}
        placeholder="Body"
        value={body}
        onChangeText={(text) => setBody(text)}
        numberOfLines={3}
        multiline={true}
      />
      <Button title="Add Note" onPress={addNote} />
    </View>
    <FlatList
      data={notes.reverse()}
      style={{ marginLeft: -20, marginTop: 10, marginRight: -10 }}
      renderItem={({ item, index }) => (
        <View style={[styles.note, { width: noteWidth }]}>
          <Text style={styles.noteTitle}>{item.title}</Text>
          <Text style={styles.noteBody}>{item.body}</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button title="Delete" onPress={() => deleteNote(index)} />
            <View style={{ width: 10 }} />
            <Button title="Add to Calendar" onPress={() => addToCalendar(item)} />
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingRight: 10 }}
    />
  </View>
);
}