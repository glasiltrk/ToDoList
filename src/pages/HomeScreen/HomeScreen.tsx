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
import {TextInput} from 'react-native-gesture-handler';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [taskList, setTaskList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const filteredTask = taskList.filter(
    item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) || //&& !item.isCompleted
      item.detail.toLowerCase().includes(searchText.toLowerCase()), //&& !item.isCompleted
  );
  console.log(filteredTask);

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

  const deleteTask = async taskId => {
    // taskId parametresi ekledik

    Alert.alert(
      'Başarılı',
      'Görev silindi.',
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            try {
              const existingData = await AsyncStorage.getItem('tasks');
              const parsedData = existingData ? JSON.parse(existingData) : [];
              const filteredData = parsedData.filter(
                task => task.id !== taskId,
              ); // itemId yerine taskId kullandık

              await AsyncStorage.setItem('tasks', JSON.stringify(filteredData));

              setTaskList(filteredData); // Görev listesini güncelledik
            } catch (e) {
              console.error('Görev silinemedi:', e);
              Alert.alert('Hata', 'Görev silinirken bir sorun oluştu.');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  // Adet sayısını artırma
  const increasePiece = async taskId => {
    try {
      const existingData = await AsyncStorage.getItem('tasks');
      let parsedData = existingData ? JSON.parse(existingData) : [];

      // İlgili görevi bul ve piece değerini artır
      const updatedData = parsedData.map(task =>
        task.id === taskId
          ? {...task, piece: task.piece + 1} // piece'ı sayıya çevirip 1 ekle, yoksa 0'dan başla
          : task,
      );

      // Güncellenmiş listeyi AsyncStorage'a kaydet
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedData));
      // State'i güncelleyerek ekranı yenile
      setTaskList(updatedData);
    } catch (e) {
      console.error('Adet artırılamadı:', e);
      Alert.alert('Hata', 'Miktar artırılırken bir sorun oluştu.');
    }
  };

  //Adet sayısını azaltma
  const decreasePiece = async taskId => {
    try {
      const existingData = await AsyncStorage.getItem('tasks');
      let parsedData = existingData ? JSON.parse(existingData) : [];

      // İlgili görevi bul ve piece değerini azalt
      const updatedData = parsedData.map(task =>
        task.id === taskId
          ? {...task, piece: Math.max(0, task.piece - 1)} // piece'ı sayıya çevirip 1 çıkar, 0'ın altına inmemesini sağla
          : task,
      );

      // Güncellenmiş listeyi AsyncStorage'a kaydet
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedData));
      // State'i güncelleyerek ekranı yenile
      setTaskList(updatedData);
    } catch (e) {
      console.error('Adet azaltılamadı:', e);
      Alert.alert('Hata', 'Miktar azaltılırken bir sorun oluştu.');
    }
  };
  const jumpToAction = TabActions.jumpTo('Completed');

  // Yeni eklenecek fonksiyon: Görevi tamamlandı olarak işaretleme
  // const doneTask = async taskId => {
  //   try {
  //     const existingData = await AsyncStorage.getItem('tasks');
  //     let parsedData = existingData ? JSON.parse(existingData) : [];

  //     // Görevi bul ve isCompleted özelliğini değiştir
  //     const updatedData = parsedData.map(task =>
  //       task.id === taskId ? {...task, isCompleted: !task.isCompleted} : task,
  //     );

  //     await AsyncStorage.setItem('tasks', JSON.stringify(updatedData));
  //     setTaskList(updatedData); // Görev listesini güncelle

  //     // kullanıcıya bilgi verme
  //     Alert.alert('Başarılı', 'Görev durumu güncellendi.');
  //     // Eğer completed iconuna basıldığında direkt Completed sayfasına gitmek isterseniz:

  //     //navigation.dispatch(jumpToAction); // "Completed" sayfasına yönlendirme
  //     // navigation.dispatch(jumpTo('Completed))
  //   } catch (e) {
  //     console.error('Görev durumu güncellenemedi:', e);
  //   }
  // };

  const renderItem = ({item}) => {
    return (
      <ToDoCard
        title={item.title}
        detail={item.detail}
        piece={item.piece}
        editOnPress={() => navigation.navigate('EditScreen', {item})}
        deleteOnPress={() => deleteTask(item.id)}
        // doneOnPress={() => doneTask(item.id)}
        //isCompleted={item.isCompleted}
        isIncreaseOnPress={() => increasePiece(item.id)}
        isDecreaseOnPress={() => decreasePiece(item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="COMPONENT LİST APP" showBack={false} />
      <TextInput
        style={styles.searchText}
        placeholder="Ara.."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredTask}
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
