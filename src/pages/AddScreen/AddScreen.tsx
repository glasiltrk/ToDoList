import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../../header/header';
import styles from './AddScreen.style';

import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {EditScreen} from '../EditScreen/EditScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
type itemList = {
  id: number;
  title: string;
};
export const AddScreen = () => {
  const [title, setTitle] = useState('');
  const [detailTitle, setDetailTitle] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editDetail, setEditDetail] = useState('');
  const navigation = useNavigation();
  const [data, setData] = useState<itemList[]>([]);

  const addTask = async () => {
    if (title.trim() === '') {
      Alert.alert('Uyarı', 'Lütfen Başlığı doldurunuz.');
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem('tasks');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      console.log(existingData, 'gelen data');

      const newTask = {
        id: Date.now(),
        title: title,
        detail: detailTitle,
      };

      parsedData.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(parsedData));

      setTitle('');
      setDetailTitle('');

      navigation.goBack();
    } catch (e) {
      console.error('Görev eklenemedi:', e);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title="Add Task"
        showBack={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.Inputs}>
        <TextInput
          style={styles.titleTextInput}
          placeholder={'Title'}
          value={title}
          onChangeText={setTitle}
          selectionColor={'#8B8787'}></TextInput>
        <TextInput
          style={styles.detailTextInput}
          placeholder={'Detail'}
          value={detailTitle}
          onChangeText={setDetailTitle}
          selectionColor={'#8B8787'}></TextInput>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};
