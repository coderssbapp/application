import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  form: {
    flex: 1,
    marginBottom: 24,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  dropdownButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
},
dropdownList: {
  height: 100,
},
dropdownButtonText: {
  fontSize: 18,
  fontWeight: 'bold',
},
  caloriesContainer: {
    marginTop: 40,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 4,
    marginBottom: 0,
  },
  caloriesText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButtonContainer: { 
    width: 225,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 4,
  },
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 225,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 4,
    marginBottom: 10,
    position: 'fixed',
  }
});
