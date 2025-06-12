import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D7EF',
  },
  AddButton: {
    backgroundColor: '#9395D3',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    right: 25,
    alignItems: 'center',
  },
  AddButtonIcon: {
    color: 'white',
    fontSize: 40,
    marginLeft: 30,
  },
  Card: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    elevation: 5,
  },
});
