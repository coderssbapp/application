import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from './calendarstyles';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({});
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    // Load the saved state from AsyncStorage when the component mounts
    AsyncStorage.getItem('events')
      .then(savedEvents => setEvents(JSON.parse(savedEvents) || {}));
  }, []);

  useEffect(() => {
    // Save the state to AsyncStorage whenever it is changed
    AsyncStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const onDayPress = day => {
    setSelectedDate(day.dateString);
    if (events[day.dateString]) {
      alert('Events: ' + JSON.stringify(events[day.dateString]));
    }
  };

  const addEvent = () => {
    if (selectedDate) {
      if (events[selectedDate] && editing) {
        let temp = events[selectedDate];
        temp[editIndex] = text;
        setEvents({ ...events, [selectedDate]: temp });
        setEditing(false);
        setEditIndex(null);
      } else if (events[selectedDate]) {
        let temp = events[selectedDate];
        temp.push(text);
        setEvents({ ...events, [selectedDate]: temp });
      } else {
        setEvents({ ...events, [selectedDate]: [text] });
      }
      setText('');
    }
  };

  const editEvent = index => {
    setText(events[selectedDate][index]);
    setEditing(true);
    setEditIndex(index);
  };

  const deleteEvent = index => {
    let temp = events[selectedDate].filter((item, i) => i !== index);
    setEvents({ ...events, [selectedDate]: temp });
    setDeleteIndex(null);
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={onDayPress} />
      <Text style={styles.text}>Selected Date: {selectedDate}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="Enter event"
      />
      <TouchableOpacity style={styles.button} onPress={addEvent}>
        <Text style={styles.buttonText}>{editing ? 'Save Edited Event' : 'Add Event'}</Text>
      </TouchableOpacity>
      <View style={styles.eventList}>
        {events[selectedDate] && (
          <ScrollView style={styles.scrollContainer}>
            {events[selectedDate].map((event, index) => (
              <View style={styles.eventContainer} key={index}>
                <Text style={styles.eventText}>{event}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.editButton} onPress={() => editEvent(index)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => {
                    let temp = events[selectedDate].filter((_, i) => i !== index);
                    setEvents({ ...events, [selectedDate]: temp });
                  }}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default App;

