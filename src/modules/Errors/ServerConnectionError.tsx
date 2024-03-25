import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles.ts';
import {Button, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {useAppTheme} from '@styles/theme.ts';

const ServerConnectionError: React.FC = () => {
  const {t} = useTranslation();
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('../../../assets/images/server-connection-error.png')}
      />
      <Text variant="headlineMedium" style={styles.title}>
        {t('Ooops') + '!'}
      </Text>
      <Text style={styles.description}>
        {t(
          'It seems something is wrong with connection to our server. We are trying our best to fix it. Please try again later.',
        )}
      </Text>
      <Button
        onPress={() => RNRestart.restart()}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        rippleColor={theme.colors.semantic.error + '0A'}
        mode="outlined">
        {t('Try again')}
      </Button>
    </View>
  );
};

export default ServerConnectionError;
