import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './ToDoCard.style';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

export const ToDoCard = ({
  title,
  detail,
  piece,
  editOnPress,
  deleteOnPress,
  doneOnPress,
  isCompleted,
  isIncreaseOnPress,
  isDecreaseOnPress,
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
        <Text style={styles.taskPiece} numberOfLines={1} ellipsizeMode="tail">
          {piece}
        </Text>
      </View>
      <View style={styles.IconContainer}>
        <View style={styles.topRowIcons}>
          <TouchableOpacity style={{top: 3}} onPress={editOnPress}>
            <Icon
              name="edit-2"
              size={20}
              type={IconType.Feather}
              color="#B3B7EE"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteOnPress}>
            <Icon
              name="trash-can-outline"
              size={25}
              type={IconType.MaterialCommunityIcons}
              color="#B3B7EE"
            />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={doneOnPress}>
          <Icon
            name="checkcircleo"
            size={20}
            type={IconType.AntDesign}
            color="#B3B7EE"
          />
        </TouchableOpacity> */}
        </View>
        <View style={styles.bottomRowIcons}>
          <TouchableOpacity onPress={isIncreaseOnPress}>
            <Icon
              name="plus"
              size={25}
              type={IconType.AntDesign}
              color="#B3B7EE"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={isDecreaseOnPress}>
            <Icon
              name="minus"
              size={25}
              type={IconType.AntDesign}
              color="#B3B7EE"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
