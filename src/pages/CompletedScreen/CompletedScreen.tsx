import {View, Text, FlatList, Alert} from 'react-native'; // FlatList ve Alert eklendi
import React, {useState, useCallback} from 'react'; // useState ve useCallback eklendi
import {Header} from '../../header/header';
import styles from './CompletedScreen.style';
import {useNavigation, useFocusEffect} from '@react-navigation/native'; // useFocusEffect eklendi
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage eklendi
import {ToDoCard} from '../../components/ToDoCard/ToDoCard'; // ToDoCard eklendi

export const CompletedScreen = () => {
  const navigation = useNavigation();
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const fetchCompletedTasks = async () => {
    try {
      const storedData = await AsyncStorage.getItem('tasks');
      const parsedData = storedData ? JSON.parse(storedData) : [];
      const filteredCompletedTasks = parsedData.filter(
        task => task.isCompleted,
      );
      setCompletedTaskList(filteredCompletedTasks);
    } catch (e) {
      console.error('Tamamlanmış görevler alınamadı', e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchCompletedTasks();
    }, []),
  );

  const toogleTaskCompletion = async taskId => {
    try {
      const existingData = await AsyncStorage.getItem('tasks');
      let parsedData = existingData ? JSON.parse(existingData) : [];

      const updatedData = parsedData.map(task =>
        task.id === task.Id ? {...task, isCompleted: !task.isCompleted} : task,
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedData));
      const filteredCompletedTasks = updatedData.filter(
        task => task.isCompleted,
      );
      setCompletedTaskList(filteredCompletedTasks);

      Alert.alert('Başarılı', 'Görev durumu Güncellendi.');
    } catch (e) {
      console.error('Görev durumu güncellenemedi:', e);
    }
  };
  const deleteTask = async taskId => {
    try {
      const existingData = await AsyncStorage.getItem('tasks');
      const parsedData = existingData ? JSON.parse(existingData) : [];

      const filteredData = parsedData.filter(task => task.id !== taskId);
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredData));
      const filteredCompletedTasks = filteredData.filter(
        task => task.isCompleted,
      );
      setCompletedTaskList(filteredCompletedTasks);
      Alert.alert('Başarılı', 'Görev Silindi.');
    } catch (e) {
      console.error('Görev silinemedi:', e);
    }
  };

  const renderItem = ({item}) => {
    return (
      <ToDoCard
        title={item.title}
        detail={item.detail}
        deleteOnPress={() => deleteTask(item.id)}
        isCompleted={item.isCompleted}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header
        title="Completed Task"
        showBack={true}
        onPress={() => navigation.goBack()}
      />
      {/* Eğer hiç tamamlanmış görev yoksa bir mesaj göster */}
      {completedTaskList.length === 0 ? (
        <Text style={styles.unCompletedText}>
          Henüz tamamlanmış göreviniz yok.
        </Text>
      ) : (
        <FlatList
          data={completedTaskList} // Sadece tamamlanmış görevler burada gösterilir
          keyExtractor={item => item.id.toString()} // Benzersiz bir key kullanın
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
