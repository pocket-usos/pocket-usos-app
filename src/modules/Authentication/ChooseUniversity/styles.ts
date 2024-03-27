import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  loader: {
    paddingTop: 36,
  },
  button: {
    borderRadius: 20,
    borderColor: theme.colors.primary,
    paddingVertical: 12,
    marginTop: 'auto',
  },
  disabledButton: {
    borderRadius: 20,
    borderColor: theme.colors.primary,
    paddingVertical: 12,
    marginTop: 'auto',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default styles;
