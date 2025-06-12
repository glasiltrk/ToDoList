import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Inputs: {
    marginHorizontal: 20,
  },

  titleTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#8B8787',
    paddingVertical: 5,
    marginVertical: 20,
    fontSize: 15,
  },
  detailTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#8B8787',
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#9395D3',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 45,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
