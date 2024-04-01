import {Dimensions, StyleSheet} from 'react-native';
import theme, {SafeAreaPadding} from '@styles/theme';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  itemIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: 24,
  },
  itemText: {
    color: theme.colors.neutral.black,
    width: Dimensions.get('screen').width - SafeAreaPadding * 2 - 60 - 48,
  },
  chosenIcon: {
    marginLeft: 'auto',
  },
  betaTag: {
    marginLeft: 'auto',
    backgroundColor: theme.colors.secondary,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  betaTagLabel: {
    fontSize: 10,
    color: theme.colors.neutral.white,
  },
});

export default styles;
