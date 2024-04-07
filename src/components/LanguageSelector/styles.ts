import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: theme.colors.primary,
  },
  language: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 18,
  },
  languageIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  selectedLanguage: {
    backgroundColor: theme.colors.primary,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.neutral.black,
  },
  selectedLanguageText: {
    color: theme.colors.neutral.white,
  },
});

export default styles;
