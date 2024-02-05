import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    backgroundColor: theme.colors.background,
    paddingTop: 90,
    padding: 36,
  },
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
  },
});

export default styles;
