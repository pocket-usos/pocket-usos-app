import {Platform, StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  mainMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    marginBottom: Platform.OS === 'ios' ? 24 : 8,
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
  mainMenuItemIcon: {
    width: 28,
    height: 28,
  },
});

export default styles;
