import {StyleSheet} from 'react-native';
export default StyleSheet.create({
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
  piecesTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#8B8787',
    paddingVertical: 5,
    marginVertical: 10,
    fontSize: 15,
  },
  EditButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 30,
  },
  editButton: {
    backgroundColor: '#9395D3',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 25,
  },
  editButtonText: {color: 'white', fontSize: 15},
  cancelButton: {
    backgroundColor: '#9395D3',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 25,
  },

  cancelButtonText: {color: 'white', fontSize: 15},
});
