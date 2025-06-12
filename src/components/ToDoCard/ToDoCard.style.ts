import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitle: {
    color: '#9395D3',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 15,
    width: 200,
  },
  taskDetail: {
    fontSize: 13,
    marginTop: 3,
    width: 200,
  },
  iconContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
