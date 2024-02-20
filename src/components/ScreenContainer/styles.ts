import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    backgroundColor: theme.colors.background,
    paddingTop: 72,
  },
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
    paddingTop: 0,
    padding: 36,
  },
});

export default styles;
