import {StyleSheet, Platform} from 'react-native';
import theme, {SafeAreaPadding} from '@styles/theme';

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'ios' ? 72 : 24,
  },
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
    paddingTop: 0,
    padding: SafeAreaPadding,
  },
});

export default styles;
