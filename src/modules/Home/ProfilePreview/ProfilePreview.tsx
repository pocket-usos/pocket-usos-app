import React, {useEffect, useRef, useState} from 'react';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import Profile from '@modules/Users/Model/Profile.ts';
import {Image, Pressable, View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import styles from '../styles.ts';
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSignOutMutation} from '@modules/Authentication/api.ts';
import {useDispatch} from 'react-redux';
import {signOut as signOutAction} from '@modules/Authentication/state.ts';

interface Props {
  profile: Profile;
}

const ProfilePreview: React.FC<Props> = ({profile}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
  const [signOutDialogVisible, setSignOutDialogVisible] =
    useState<boolean>(false);
  const DRAWER_CLOSE_DURATION = 100;

  const [
    signOut,
    {isLoading: isSigningOut, isSuccess: isSuccessfullySignedOut},
  ] = useSignOutMutation();

  const showSignOutDialog = () => setSignOutDialogVisible(true);
  const hideSignOutDialog = () => setSignOutDialogVisible(false);

  const onSignOutClick = () => {
    bottomDrawerRef?.current?.close();
    showSignOutDialog();
  };

  useEffect(() => {
    const removeSessionId = async () =>
      await AsyncStorage.removeItem('sessionId');

    if (!isSigningOut && isSuccessfullySignedOut) {
      removeSessionId();
      dispatch(signOutAction());
    }
  }, [isSigningOut, isSuccessfullySignedOut]);

  const onSignOut = async () => {
    hideSignOutDialog();

    signOut();
  };

  return (
    <View style={styles.profilePreview}>
      <Image
        source={{uri: profile.photoUrl}}
        style={styles.profilePreviewPhoto}
      />
      <View>
        <Text
          variant="headlineMedium"
          style={{color: theme.colors.neutral.black}}>
          {profile.firstName}
        </Text>
        <Text style={styles.studentNumber}>{`#${profile.studentNumber}`}</Text>
      </View>
      <Pressable
        style={styles.menuButton}
        onPress={() => bottomDrawerRef?.current?.open()}>
        <Image
          source={require('../../../../assets/images/menu-icon.png')}
          style={styles.menuButtonIcon}
        />
      </Pressable>
      <BottomDrawer
        ref={bottomDrawerRef}
        closeDuration={DRAWER_CLOSE_DURATION}
        initialHeight={300}
        customStyles={{
          container: styles.bottomDrawer,
        }}>
        <View>
          <Button
            mode="outlined"
            style={styles.signOutButton}
            contentStyle={styles.signOutButtonContent}
            labelStyle={styles.signOutButtonLabel}
            rippleColor={theme.colors.additional.red + '0A'}
            onPress={onSignOutClick}>
            {t('Sign Out')}
          </Button>
        </View>
      </BottomDrawer>
      <Portal>
        <Dialog
          visible={signOutDialogVisible}
          onDismiss={hideSignOutDialog}
          style={styles.signOutDialog}>
          <Dialog.Title style={{color: theme.colors.neutral.black}}>
            {t('Sign Out')}
          </Dialog.Title>
          <Dialog.Content>
            <Text
              variant="bodyMedium"
              style={{color: theme.colors.neutral.black, fontSize: 16}}>
              {t('Are you sure you want to sign out') + '?'}
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{marginTop: 12}}>
            <Button
              mode="outlined"
              rippleColor={theme.colors.primary + '0A'}
              onPress={hideSignOutDialog}
              style={styles.dialogActionStyle}
              contentStyle={styles.dialogActionContentStyle}
              labelStyle={styles.dialogActionLabelStyle}>
              {t('No')}
            </Button>
            <Button
              mode="outlined"
              rippleColor={theme.colors.additional.red + '0A'}
              onPress={onSignOut}
              style={[
                styles.dialogActionStyle,
                {borderColor: theme.colors.additional.red},
              ]}
              contentStyle={styles.dialogActionContentStyle}
              labelStyle={[
                styles.dialogActionLabelStyle,
                {color: theme.colors.additional.red},
              ]}>
              {t('Yes')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ProfilePreview;
