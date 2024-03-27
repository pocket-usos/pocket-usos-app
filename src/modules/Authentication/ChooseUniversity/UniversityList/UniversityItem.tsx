import React from 'react';
import {Text} from 'react-native-paper';
import {Image, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';
import {useAppTheme} from '@styles/theme';

export interface Props {
  logoUrl: any;
  isChosen: boolean;
  isBeta: boolean;
  name: string;
  onPress: () => void;
}

const UniversityItem: React.FC<Props> = ({
  name,
  logoUrl,
  isChosen,
  onPress,
}) => {
  const theme = useAppTheme();

  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <View style={styles.item}>
        <Image source={{uri: logoUrl}} style={styles.itemIcon} />
        <Text variant="titleMedium" style={styles.itemText}>
          {name}
        </Text>
        {isChosen ? (
          <Icon
            name="check"
            size={24}
            color={theme.colors.primary}
            style={styles.chosenIcon}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

export default UniversityItem;
