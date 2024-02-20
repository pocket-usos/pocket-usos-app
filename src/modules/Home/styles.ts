import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  profilePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileLabel: {
    color: theme.colors.neutral['700'],
    fontSize: 13,
    letterSpacing: 1,
  },
  profilePreviewPhoto: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  upcomingClasses: {
    marginTop: 48,
  },
  upcomingClassesTitle: {
    color: theme.colors.neutral.black,
    fontSize: 22,
    marginBottom: 16,
  },
  upcommingClass: {
    padding: 24,
    marginVertical: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 32,
  },
  upcommingClassTitle: {
    color: theme.colors.neutral.white,
    fontSize: 18,
    marginBottom: 24,
  },
  upcomingClassAttribute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  upcomingClassAttributeIcon: {
    marginRight: 8,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingClassAttributeText: {
    color: theme.colors.neutral.white,
    fontSize: 13,
  },
  classTypeContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomRightRadius: 32,
    borderTopLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classTypeText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.neutral.black,
  },
});

export default styles;
