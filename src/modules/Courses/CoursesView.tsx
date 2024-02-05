import React from 'react';
import {Text} from 'react-native-paper';
import ScreenContainer from '@components/ScreenContainer/ScreenContainer';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';

const CoursesView: React.FC = () => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  return (
    <ScreenContainer>
      <Text
        variant="headlineMedium"
        style={{color: theme.colors.neutral.black}}>
        {t('Courses')}
      </Text>
    </ScreenContainer>
  );
};

export default CoursesView;
