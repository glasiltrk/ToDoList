import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './ToDoCard.style';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

export const ToDoCard = ({
  title,
  detail,
  editOnPress,
  deleteOnPress,
  doneOnPress,
  isCompleted,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.taskDetail} numberOfLines={2} ellipsizeMode="tail">
          {detail}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        {editOnPress && (
          <TouchableOpacity onPress={editOnPress}>
            <Icon
              name="edit-2"
              size={20}
              type={IconType.Feather}
              color="#B3B7EE"
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={deleteOnPress}>
          <Icon
            name="trash-can-outline"
            size={25}
            type={IconType.MaterialCommunityIcons}
            color="#B3B7EE"
          />
        </TouchableOpacity>

        {doneOnPress && (
          <TouchableOpacity onPress={doneOnPress}>
            <Icon
              name="checkcircleo"
              size={20}
              type={IconType.AntDesign}
              color="#B3B7EE"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
