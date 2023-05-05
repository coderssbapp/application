import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bodyInput: {
    fontSize: 16,
    marginBottom: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  noteContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteBody: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#0080ff',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 3,
    marginBottom: -30,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
