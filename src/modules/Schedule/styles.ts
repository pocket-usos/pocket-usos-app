import {Dimensions, StyleSheet} from 'react-native';
import theme, {SafeAreaPadding, SafeAreaTopPadding} from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
    paddingTop: SafeAreaTopPadding,
  },
  headerContainer: {
    paddingHorizontal: SafeAreaPadding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerAction: {},
  headerActionIcon: {
    width: 24,
    height: 24,
  },
  chosenDate: {
    color: theme.colors.neutral['700'],
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
  },
  goToTodayButton: {
    borderRadius: 12,
    borderColor: theme.colors.primary,
    marginRight: 16,
  },
  goToTodayButtonContent: {
    paddingHorizontal: 8,
  },
  goToTodayButtonLabel: {
    fontSize: 12,
    lineHeight: 12,
  },
  calendarModal: {
    marginHorizontal: SafeAreaPadding,
  },
  calendar: {
    borderRadius: 32,
    paddingVertical: 16,
  },
  timetableContainer: {
    paddingBottom: 36,
  },
  timetableView: {
    marginHorizontal: SafeAreaPadding,
  },
  timetableLines: {
    borderColor: theme.colors.neutral['300'],
    borderStartColor: 'transparent',
    borderEndColor: 'transparent',
  },
  timetableNowDot: {
    backgroundColor: theme.colors.neutral.black,
  },
  timetableNowLine: {
    backgroundColor: theme.colors.neutral.black,
  },
  timetableItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    padding: 16,
  },
  timetableTimeText: {
    color: theme.colors.neutral.black,
  },
  timetableItemTitle: {
    color: theme.colors.neutral.white,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 'auto',
  },
  timetableItemAttribute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  timetableItemIcon: {
    marginRight: 8,
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timetableItemText: {
    color: theme.colors.neutral.white,
    fontSize: 11,
  },
  classTypeContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 42,
    height: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomRightRadius: 24,
    borderTopLeftRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classTypeText: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.neutral.black,
  },
  classTypeTextForPastItem: {
    color: theme.colors.neutral['600'],
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loaderAnimation: {
    marginTop: -144,
  },
  noResultsContainer: {
    height: Dimensions.get('screen').height - 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: theme.colors.neutral['700'],
    fontWeight: '500',
  },
});

export default styles;
