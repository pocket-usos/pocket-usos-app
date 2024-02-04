import {Platform, StyleSheet} from 'react-native';
import theme from '@styles/theme';
import {NotificationType} from './state';

const getStyles = (type: NotificationType) =>
  StyleSheet.create({
    animatedContainer: {
      position: 'absolute',
      width: '100%',
      zIndex: 9999,
    },
    container: {
      backgroundColor: theme.colors.semantic[type ?? 'error'],
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingTop: Platform.OS === 'android' ? 24 : 64,
      shadowColor: '#000000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    text: {
      color: 'white',
      maxWidth: '85%',
    },
    closeContainer: {
      marginLeft: 'auto',
      paddingLeft: 20,
    },
  });

export default getStyles;
