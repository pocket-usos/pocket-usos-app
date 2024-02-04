import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  itemIcon: {
    width: 36,
    resizeMode: 'contain',
    marginRight: 24,
  },
  itemText: {
    color: theme.colors.neutral.black,
    paddingRight: 64,
  },
  chosenIcon: {
    marginLeft: 'auto',
  },
});

export default styles;
