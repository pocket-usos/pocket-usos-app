import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import styles from '../styles.ts';
import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import UpcomingClass from '@modules/Home/UpcomingClasses/UpcomingClass/UpcomingClass.tsx';

interface Props {
  schedule?: CalendarItem[];
}

const UpcomingClassesView: React.FC<Props> = ({schedule}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.upcomingClasses}>
      <Text variant="titleLarge" style={styles.upcomingClassesTitle}>
        {t('Next class')}
      </Text>
      {(schedule?.length ?? 0) > 0 && !schedule.includes(undefined) ? (
        <View>
          {schedule.map(item => (
            <UpcomingClass
              key={item.start.valueOf()}
              title={item.name}
              start={item.start}
              end={item.end}
              classType={item.classType.id}
              room={item.room.name}
              lecturerName={
                item.lecturers[0].firstName + ' ' + item.lecturers[0].lastName
              }
            />
          ))}
        </View>
      ) : (
        <Text>{t("You don't have any upcoming classes...")}</Text>
      )}
    </View>
  );
};

export default UpcomingClassesView;
