import { styles } from './notesstyles';
import { Calendar } from './Calendar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, AsyncStorage, Keyboard } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  

  useEffect(() => {
    // Retrieve saved notes from storage on app load
    AsyncStorage.getItem('notes').then((savedNotes) => {
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    });
  }, []);

  useEffect(() => {
    // Save notes to storage whenever the notes state changes
    AsyncStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (currentNoteIndex !== null) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[currentNoteIndex] = { title, body };
      setNotes(updatedNotes);
      setCurrentNoteIndex(null);
    } else {
      // Add new note
      const newNote = { title, body };
      setNotes([...notes, newNote]);
    }

    // Clear input fields
    setTitle('');
    setBody('');
  };

  const handleEditNote = (index) => {
    const note = notes[index];
    setTitle(note.title);
    setBody(note.body);
    setCurrentNoteIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="Body"
          value={body}
          onChangeText={(text) => setBody(text)}
          multiline={true}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
          <Text style={styles.addButtonText}>{currentNoteIndex !== null ? 'Save' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.notesContainer}>
          {notes.map((note, index) => (
            <TouchableOpacity key={index} style={styles.noteContainer} onPress={() => handleEditNote(index)}>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteBody}>{note.body}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditNote(index)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteNote(index)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
