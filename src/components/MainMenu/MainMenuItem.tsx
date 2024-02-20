import React from 'react';
import {Text} from 'react-native-paper';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from './styles';

export interface Props {
  isActive: boolean;
  text: string;
  iconSource: any;
  onPress: () => void;
}

const MainMenuItem: React.FC<Props> = ({
  isActive,
  text,
  iconSource,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.mainMenuItem} onPress={onPress}>
      {isActive ? (
        <View style={styles.mainMenuTextItem}>
          <Text style={styles.mainMenuItemText}>{text}</Text>
          <View style={styles.mainMenuTextItemIndicator} />
        </View>
      ) : (
        <View>
          <Image source={iconSource} style={styles.mainMenuItemIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MainMenuItem;
