import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    backgroundColor: '#9395D3',
    height: 100,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 30,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  arrow: {
    marginRight: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
