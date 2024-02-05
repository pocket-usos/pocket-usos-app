import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  mainMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 28,
  },
  mainMenuItem: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainMenuTextItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainMenuTextItemIndicator: {
    width: 4,
    height: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 4,
  },
  mainMenuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});

export default styles;
