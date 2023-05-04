import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  calendar: {
    marginBottom: 10,
  },
  calendarHeader: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  calendarHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarMonth: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: '14%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  calendarDayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  calendarDaySelected: {
    borderRadius: 100,
    backgroundColor: '#0080ff',
    padding: 10,
  },
  calendarDaySelectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0080ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
  },

  eventText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#0080ff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTextGroup: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#0080ff',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  eventList: {
    maxHeight: '80%',
    marginTop: 10,
    marginBottom: 20,
},
  scrollContainer: {
    height: 200, //fixed height
  },
});