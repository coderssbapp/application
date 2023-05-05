import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: -70,
  },
  defaultCityContainer: {
    marginBottom: 20,
  },
  defaultCityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  cityList: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    maxHeight: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  setDefaultContainer: {
    flexDirection: 'row',
    backgroundColor: '#4caf50',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  setDefaultText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherDescription: {
    fontSize: 14,
    color: '#888',
  },
});
