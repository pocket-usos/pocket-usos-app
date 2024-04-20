import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  datePicker: {
    marginBottom: 16,
  },
  datePickerWeek: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12.5,
  },
  datePickerPreviousControl: {
    position: 'absolute',
    left: -14,
    top: 12,
  },
  datePickerNextControl: {
    position: 'absolute',
    right: -14,
    top: 12,
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
    color: theme.colors.semantic.error,
  },
});

export default styles;
