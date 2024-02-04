import React from 'react';
import {useAppTheme} from '@styles/theme';
import {TextInput, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export interface Props {
  value: string;
  placeholder: string;
  onInput: (value: string) => void;
  style?: ViewStyle;
}

const SearchInput: React.FC<Props> = ({value, placeholder, onInput, style}) => {
  const theme = useAppTheme();

  return (
    <View style={[style, styles.container]}>
      <TextInput
        value={value}
        onChangeText={onInput}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.neutral[500]}
        style={styles.input}
      />
      <Icon
        name="search"
        size={24}
        color={theme.colors.neutral.black}
        style={styles.icon}
      />
    </View>
  );
};

export default SearchInput;
