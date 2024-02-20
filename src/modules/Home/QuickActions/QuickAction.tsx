import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import styles from './styles';

interface Props {
  icon: any;
  title: string;
  color: string;
  onPress: () => void;
}

const QuickAction: React.FC<Props> = ({icon, title, color, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{backgroundColor: color, ...styles.quickAction}}>
      <Image source={icon} style={styles.quickActionIcon} />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default QuickAction;
