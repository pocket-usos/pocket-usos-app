import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 64,
  },
  label: {
    color: theme.colors.neutral.black,
    marginBottom: 24,
  },
  body: {
    textAlign: 'center',
  },
  button: {
    borderRadius: 15,
    borderColor: theme.colors.primary,
    marginTop: 48,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

export default styles;
