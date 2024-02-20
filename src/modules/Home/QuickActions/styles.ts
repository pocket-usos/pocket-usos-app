import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  quickActions: {
    marginVertical: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickAction: {
    borderRadius: 32,
    padding: 24,
    flex: 1,
    flexBasis: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    //    maxWidth: '47.5%',
  },
  quickActionIcon: {
    width: 36,
    height: 36,
  },
  quickActionText: {
    color: theme.colors.neutral.white,
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
