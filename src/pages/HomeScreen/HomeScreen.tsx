import {View, TouchableOpacity, FlatList, Alert, Text} from 'react-native';
import React, {useState, useCallback} from 'react';
import {
  useNavigation,
  useFocusEffect,
  TabActions,
} from '@react-navigation/native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {Header} from '../../header/header';
import {styles} from './HomeScreen.style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToDoCard} from '../../components/ToDoCard/ToDoCard';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [taskList, setTaskList] = useState([]);

  const fetchTasks = async () => {
    try {
      const storedData = await AsyncStorage.getItem('tasks');
      const parsedData = storedData ? JSON.parse(storedData) : [];
      setTaskList(parsedData);
    } catch (e) {
      console.error('Görevler alınamadı:', e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, []),
  );

  console.log(taskList);
  const deleteTask = async taskId => {
    // taskId parametresi ekledik
    try {
      const existingData = await AsyncStorage.getItem('tasks');
      const parsedData = existingData ? JSON.parse(existingData) : [];

      // itemId ile eşleşmeyenleri filtrele → silme işlemi
      const filteredData = parsedData.filter(task => task.id !== taskId); // itemId yerine taskId kullandık

      await AsyncStorage.setItem('tasks', JSON.stringify(filteredData));

      setTaskList(filteredData); // Görev listesini güncelledik
      Alert.alert('Başarılı', 'Görev silindi.');
    } catch (e) {
      console.error('Görev silinemedi:', e);
    }
  };
  const jumpToAction = TabActions.jumpTo('Completed');
  // Yeni eklenecek fonksiyon: Görevi tamamlandı olarak işaretleme
  const doneTask = async taskId => {
    try {
      const existingData = await AsyncStorage.getItem('tasks');
      let parsedData = existingData ? JSON.parse(existingData) : [];

      // Görevi bul ve isCompleted özelliğini değiştir
      const updatedData = parsedData.map(task =>
        task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task,
      );

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedData));
      setTaskList(updatedData); // Görev listesini güncelle

      // kullanıcıya bilgi verme
      Alert.alert('Başarılı', 'Görev durumu güncellendi.');
      // Eğer completed iconuna basıldığında direkt Completed sayfasına gitmek isterseniz:

      navigation.dispatch(jumpToAction); // "Completed" sayfasına yönlendirme
      // navigation.dispatch(jumpTo('Completed))
    } catch (e) {
      console.error('Görev durumu güncellenemedi:', e);
    }
  };

  const renderItem = ({item}) => {
    return (
      <ToDoCard
        title={item.title}
        detail={item.detail}
        editOnPress={() => navigation.navigate('EditScreen', {item})}
        deleteOnPress={() => deleteTask(item.id)}
        doneOnPress={() => doneTask(item.id)}
        isCompleted={item.isCompleted}
      />
    );
  };
  const activeTasks = taskList.filter(task => !task.isCompleted);
  return (
    <View style={styles.container}>
      <Header title="TO DO APP" showBack={false} />
      <FlatList
        data={activeTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddScreen')}
        style={styles.AddButton}>
        <Icon name="plus" size={25} type={IconType.AntDesign} color="white" />
      </TouchableOpacity>
    </View>
  );
};
