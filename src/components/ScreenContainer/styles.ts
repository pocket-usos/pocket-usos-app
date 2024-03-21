import {StyleSheet} from 'react-native';
import theme, {SafeAreaPadding, SafeAreaTopPadding} from '@styles/theme';

const styles = StyleSheet.create({
  rootContainer: {
    height: '100%',
    backgroundColor: theme.colors.neutral.white,
  },
  container: {
    height: '100%',
    backgroundColor: theme.colors.neutral.white,
    padding: SafeAreaPadding,
    paddingTop: SafeAreaTopPadding,
  },
});

export default styles;
