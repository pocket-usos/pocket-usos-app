import React from 'react';
import ScreenContainer from '@components/ScreenContainer/ScreenContainer';
import Profile from '@modules/Users/Model/Profile.ts';
import ProfilePreview from '@modules/Home/ProfilePreview/ProfilePreview.tsx';
import UpcomingClasses from '@modules/Home/UpcomingClasses/UpcomingClasses.tsx';
import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import QuickActions from '@modules/Home/QuickActions/QuickActions.tsx';

interface Props {
  profile?: Profile;
  schedule?: CalendarItem[];
}

const HomeView: React.FC<Props> = ({profile, schedule}) => {
  return (
    <ScreenContainer>
      {profile ? <ProfilePreview profile={profile} /> : null}
      <UpcomingClasses schedule={schedule} />
      <QuickActions />
    </ScreenContainer>
  );
};

export default HomeView;
