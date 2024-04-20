import React from 'react';
import {View} from 'react-native';
import QuickAction from '@modules/Home/QuickActions/QuickAction.tsx';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useAppTheme} from '@styles/theme.ts';
import styles from './styles';

const QuickActionsView: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const theme = useAppTheme();

  return (
    <View style={styles.quickActions}>
      <QuickAction
        icon={require('../../../../assets/images/schedule-icon-white.png')}
        title={t('Schedule')}
        color={theme.colors.secondary}
        onPress={() => navigation.navigate('Schedule')}
      />
      <QuickAction
        icon={require('../../../../assets/images/grades-icon-white.png')}
        title={t('Grades')}
        color={theme.colors.tertiary}
        onPress={() => navigation.navigate('Grades')}
      />
      <QuickAction
        icon={require('../../../../assets/images/courses-icon-white.png')}
        title={t('Courses')}
        color={theme.colors.semantic.error}
        onPress={() => navigation.navigate('Courses')}
      />
    </View>
  );
};

export default QuickActionsView;
