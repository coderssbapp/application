import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  note: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderTopWidth: 2,
    borderRadius: 6,
    padding: 23,
    marginBottom: 10,
    marginTop: 10, 
    borderRightWidth: 2,
    borderRightColor: '#ddd',
  },
  noteTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteBody: {
    fontSize: 18,
  },
})