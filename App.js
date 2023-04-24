import React, { useState } from 'react';
import { styles } from './styles';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const noteWidth = screenWidth * 0.7; //set width of saved note box to 70% of the screen width

  const addNote = () => {
    setNotes([...notes, { title, body }]);
    setTitle('');
    setBody('');
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
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
            <Button title="Delete" onPress={() => deleteNote(index)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingRight: 10 }}
      />
    </View>
  );
}

export default App;
