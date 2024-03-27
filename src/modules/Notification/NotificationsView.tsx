import React from 'react';
import {Image, Pressable, RefreshControl, ScrollView, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import ScreenContainer from '@components/ScreenContainer/ScreenContainer';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import styles from './styles';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import Notification from './Model/Notification';
import moment from 'moment';
import StyledText from 'react-native-styled-text';

interface Props {
  notifications?: Notification[];
  readNotifications: (notificationIds: string[]) => void;
  goBack: () => void;
  isFetching: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const NotificationsView: React.FC<Props> = ({
  notifications,
  readNotifications,
  goBack,
  isFetching,
  isRefreshing,
  onRefresh,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  const onPressNotification = (notification: Notification) => {
    readNotifications([notification.id]);
  };

  const notificationIcons = {
    Grades: require('../../../assets/images/grades-icon-white.png'),
    Schedule: require('../../../assets/images/schedule-icon-white.png'),
  };

  const getNotificationColor = (courseIndex: number) => {
    const colors = [
      theme.colors.secondary,
      theme.colors.additional.red,
      theme.colors.primary,
    ];

    return colors[courseIndex % colors.length];
  };

  const formatNotificationTime = (notificationCreatedAt: Date): string => {
    // if is today
    if (
      moment(notificationCreatedAt)
        .startOf('day')
        .isSame(moment().startOf('day'))
    ) {
      return moment(notificationCreatedAt).format('LT');
    }

    // if is yesterday
    if (
      moment(notificationCreatedAt)
        .startOf('day')
        .isSame(moment().startOf('day').subtract(1, 'days'))
    ) {
      return t('Yesterday');
    } else {
      return moment(notificationCreatedAt)
        .format('LL')
        .replace(/\d{4}/, '')
        .replace(',', '')
        .trim();
    }
  };

  return (
    <ScreenContainer>
      <ScrollView
        stickyHeaderIndices={[0]}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.headerContainer}>
          <Pressable onPress={goBack} style={styles.backButton}>
            <FontAwesomeIcon
              name="chevron-left"
              solid
              size={16}
              color={theme.colors.neutral.black}
            />
            <Text style={styles.backButtonText}>{t('Back')}</Text>
          </Pressable>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            {t('Notifications')}
          </Text>
        </View>

        {notifications && notifications.length > 0 && !isFetching ? (
          <View style={styles.notificationsContainer}>
            {notifications.map((notification, index) => (
              <Pressable
                key={notification.id}
                onPress={() => onPressNotification(notification)}>
                <View
                  style={[
                    styles.notification,
                    notification.wasRead ? {opacity: 0.5} : null,
                  ]}>
                  <View
                    style={[
                      styles.notificationIconContainer,
                      {backgroundColor: getNotificationColor(index)},
                    ]}>
                    <Image
                      source={notificationIcons[notification.type]}
                      style={styles.notificationIcon}
                    />
                  </View>
                  <StyledText style={styles.notificationContent}>
                    {notification.content}
                  </StyledText>
                  <Text style={styles.notificationTime}>
                    {formatNotificationTime(notification.createdAt)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            {isFetching ? (
              <View style={styles.loader}>
                <ActivityIndicator
                  size="large"
                  color={theme.colors.primary}
                  style={styles.loaderAnimation}
                />
              </View>
            ) : (
              <View style={styles.noNotificationsContainer}>
                <Text style={styles.noNotificationsText}>
                  {t("You don't have any notifications yet")}
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default NotificationsView;
