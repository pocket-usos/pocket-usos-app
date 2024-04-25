import React from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import styles from '../../styles.ts';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import {default as IonIcon} from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import theme from '@styles/theme.ts';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/pl';

interface Props {
  title: string;
  start: Date;
  end: Date;
  classType: string;
  room?: string;
  lecturerName: string;
  onPress: () => void;
}

const UpcomingClass: React.FC<Props> = props => {
  const {t, i18n} = useTranslation();
  moment.updateLocale(i18n.resolvedLanguage ?? 'en', {week: {dow: 1}});

  const dayString = moment(props.start).format('dddd');
  const day = dayString[0].toUpperCase() + dayString.slice(1);
  const time = `${day}, ${moment(props.start).format('DD/MM HH:mm')} - ${moment(
    props.end,
  ).format('HH:mm')}`;

  return (
    <Pressable style={styles.upcommingClass} onPress={props.onPress}>
      <Text variant="titleMedium" style={styles.upcommingClassTitle}>
        {props.title.split(' - ')[0]}
      </Text>
      <View style={styles.upcomingClassAttribute}>
        <View style={styles.upcomingClassAttributeIcon}>
          <FontAwesomeIcon
            name="clock"
            solid
            size={16}
            color={theme.colors.neutral.white}
          />
        </View>
        <Text style={styles.upcomingClassAttributeText}>{time}</Text>
      </View>
      {props.room ? (
        <View style={styles.upcomingClassAttribute}>
          <View style={styles.upcomingClassAttributeIcon}>
            <FontAwesomeIcon
              name="location-dot"
              size={16}
              color={theme.colors.neutral.white}
            />
          </View>
          <Text style={styles.upcomingClassAttributeText}>{`${t('Room')} ${
            props.room
          }`}</Text>
        </View>
      ) : null}
      <View style={styles.upcomingClassAttribute}>
        <View style={styles.upcomingClassAttributeIcon}>
          <IonIcon name="person" size={16} color={theme.colors.neutral.white} />
        </View>
        <Text style={styles.upcomingClassAttributeText}>
          {props.lecturerName}
        </Text>
      </View>
      <View style={styles.classTypeContainer}>
        <Text style={styles.classTypeText}>{props.classType}</Text>
      </View>
    </Pressable>
  );
};

export default UpcomingClass;
