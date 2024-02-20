import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    color: theme.colors.neutral.black,
    paddingHorizontal: 36,
    marginBottom: 36,
  },
  terms: {
    paddingLeft: 36,
  },
  term: {
    marginRight: 12,
    backgroundColor: theme.colors.primary,
    opacity: 0.5,
    borderRadius: 16,
  },
  selectedTerm: {
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
  termText: {
    color: theme.colors.neutral.white,
  },
  gradesContainer: {
    paddingHorizontal: 36,
    marginTop: 36,
  },
});

export default styles;
