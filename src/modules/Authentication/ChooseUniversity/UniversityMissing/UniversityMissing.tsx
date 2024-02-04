import React from 'react';
import {Button, Text} from 'react-native-paper';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './styles';

const UniversityMissing: React.FC = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.label}>
        {t('Is your university missing?')}
      </Text>

      <Text variant="bodyMedium" style={styles.body}>
        {t(
          'We are constantly working on adding new universities to our system. Please let us know which university we should add next.',
        )}
      </Text>

      <Button style={styles.button} mode="outlined">
        {t('Suggest university')}
      </Button>
    </View>
  );
};

export default UniversityMissing;
