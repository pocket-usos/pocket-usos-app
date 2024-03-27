import {Dimensions, StyleSheet} from 'react-native';
import theme, {SafeAreaPadding} from '@styles/theme';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  itemIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: 24,
  },
  itemText: {
    color: theme.colors.neutral.black,
    width: Dimensions.get('screen').width - SafeAreaPadding * 2 - 60 - 32,
  },
  chosenIcon: {
    marginLeft: 'auto',
  },
});

export default styles;
