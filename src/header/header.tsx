import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './header.style';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
type HeaderProps = {
  title: string;
  showBack?: boolean;
  onPress?: () => {};
};
export const Header = ({title, onPress, showBack = false}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {showBack && (
        <TouchableOpacity onPress={onPress} style={styles.arrow}>
          <Icon
            name="arrowleft"
            size={25}
            type={IconType.AntDesign}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
