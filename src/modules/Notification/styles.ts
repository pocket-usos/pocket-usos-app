import {Dimensions, Platform, StyleSheet} from 'react-native';
import theme, {SafeAreaPadding, SafeAreaTopPadding} from '@styles/theme';
import {NotificationType} from './state';

export const getStyles = (type: NotificationType) =>
  StyleSheet.create({
    animatedContainer: {
      position: 'absolute',
      width: '100%',
      zIndex: 9999,
    },
    container: {
      backgroundColor: theme.colors.semantic[type ?? 'error'],
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingTop: Platform.OS === 'android' ? 24 : 64,
      shadowColor: '#000000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    text: {
      color: 'white',
      maxWidth: '85%',
    },
    closeContainer: {
      marginLeft: 'auto',
      paddingLeft: 20,
    },
  });

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.neutral.white,
  },
  headerContainer: {
    backgroundColor: theme.colors.neutral.white,
    paddingBottom: 16,
  },
  headerTitle: {
    color: theme.colors.neutral.black,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButtonText: {
    color: theme.colors.neutral.black,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  notificationsContainer: {},
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loaderAnimation: {},
  loadingContainer: {
    paddingVertical: Dimensions.get('screen').height / 3,
  },
  noNotificationsContainer: {
    paddingHorizontal: SafeAreaPadding,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 144,
  },
  noNotificationsText: {
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.neutral['700'],
    fontWeight: '500',
    textAlign: 'center',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  notificationIconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  notificationContent: {
    width: '100%',
    maxWidth: Dimensions.get('screen').width - 120 - SafeAreaPadding * 2,
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.neutral.black,
  },
  notificationTime: {
    marginLeft: 'auto',
    fontSize: 10,
    color: theme.colors.neutral.black,
  },
});

export default styles;
