import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from '../../header/header';
import styles from './EditScreen.style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const EditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;

  console.log(item);

  const [editTitle, setEditTitle] = useState(item.title);
  const [editDetail, setEditDetail] = useState(item.detail);
  const [pieceTitle, setPieceTitle] = useState(item.piece);
  const handleChange = text => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    setPieceTitle(numericValue);
  };
  const editTask = async () => {
    if (editTitle.trim() === '') {
      Alert.alert('Uyarı', 'Lütfen Başlığı doldurunuz.');
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem('tasks');
      const parsedData = existingData ? JSON.parse(existingData) : [];

      // id'ye göre eski görevi bul ve güncelle
      const updatedData = parsedData.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            title: editTitle,
            detail: editDetail,
            piece: pieceTitle,
          };
        }
        return task;
      });

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedData));

      Alert.alert('Başarılı', 'Görev düzenlendi.');
      navigation.goBack();
    } catch (e) {
      console.error('Görev güncellenemedi:', e);
    }
  };

  const cancelTask = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Header
        title="Edit Task"
        showBack={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.Inputs}>
        <TextInput
          style={styles.titleTextInput}
          placeholder="Başlık"
          value={editTitle}
          onChangeText={setEditTitle}></TextInput>
        <TextInput
          style={styles.detailTextInput}
          placeholder="Konum"
          value={editDetail}
          onChangeText={setEditDetail}></TextInput>

        <TextInput
          style={styles.piecesTextInput}
          placeholder={'Adet'}
          value={pieceTitle}
          onChangeText={handleChange}
          keyboardType="numeric"></TextInput>
      </View>
      <View style={styles.EditButtons}>
        <TouchableOpacity style={styles.editButton} onPress={editTask}>
          <Text style={styles.editButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={cancelTask}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
