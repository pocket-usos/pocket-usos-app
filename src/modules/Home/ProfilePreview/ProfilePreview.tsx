import React from 'react';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import Profile from '@modules/Users/Model/Profile.ts';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import styles from '../styles.ts';

interface Props {
  profile: Profile;
}

const ProfilePreview: React.FC<Props> = ({profile}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  return (
    <View style={styles.profilePreview}>
      <View>
        <Text style={styles.profileLabel}>{t('Welcome back!')}</Text>
        <Text
          variant="headlineMedium"
          style={{color: theme.colors.neutral.black}}>
          {profile.firstName}
        </Text>
      </View>
      <Image
        source={{uri: profile.photoUrl}}
        style={styles.profilePreviewPhoto}
      />
    </View>
  );
};

export default ProfilePreview;
