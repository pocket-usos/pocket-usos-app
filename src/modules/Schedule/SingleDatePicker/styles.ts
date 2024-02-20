import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12.5,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  dayOfWeekText: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
  },
  activeText: {
    color: theme.colors.primary,
  },
  activeDateIndicator: {
    width: '90%',
    height: 2,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    marginTop: 5,
  },
  weekendText: {
    color: theme.colors.additional.red,
  },
});

export default styles;
