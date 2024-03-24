import {StyleSheet} from 'react-native';
import theme, {SafeAreaPadding} from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 180,
    height: 180,
  },
  title: {
    color: theme.colors.neutral.black,
    marginTop: 36,
    marginBottom: 16,
  },
  description: {
    paddingHorizontal: SafeAreaPadding * 2,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 22,
  },
  button: {
    borderRadius: 15,
    borderColor: theme.colors.semantic.error,
    marginTop: 60,
  },
  buttonContent: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  buttonLabel: {
    color: theme.colors.semantic.error,
  },
});

export default styles;
