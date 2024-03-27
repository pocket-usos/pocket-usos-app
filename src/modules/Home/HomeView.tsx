import React from 'react';
import ScreenContainer from '@components/ScreenContainer/ScreenContainer';
import Profile from '@modules/Users/Model/Profile.ts';
import ProfilePreview from '@modules/Home/ProfilePreview/ProfilePreview.tsx';
import UpcomingClasses from '@modules/Home/UpcomingClasses/UpcomingClasses.tsx';
import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import QuickActions from '@modules/Home/QuickActions/QuickActions.tsx';
import {RefreshControl, ScrollView} from 'react-native';
import theme from '@styles/theme.ts';

interface Props {
  profile?: Profile;
  schedule?: CalendarItem[];
  isRefreshing: boolean;
  onRefresh: () => void;
  unreadNotificationsCount: number;
}

const HomeView: React.FC<Props> = ({
  profile,
  schedule,
  isRefreshing,
  onRefresh,
  unreadNotificationsCount,
}) => {
  return (
    <ScreenContainer>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        style={{backgroundColor: theme.colors.neutral.white}}>
        {profile ? (
          <ProfilePreview
            profile={profile}
            unreadNotificationsCount={unreadNotificationsCount}
          />
        ) : null}
        <UpcomingClasses schedule={schedule} />
        <QuickActions />
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeView;
