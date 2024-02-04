import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  input: {
    backgroundColor: theme.colors.neutral[300],
    color: theme.colors.neutral.black,
    fontSize: 16,
    lineHeight: 18,
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 24,
  },
  icon: {
    position: 'absolute',
    right: 24,
  },
});

export default styles;
