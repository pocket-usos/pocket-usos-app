import React from 'react';
import {Button, Text} from 'react-native-paper';
import {ScrollView} from 'react-native';
import ScreenContainer from '@components/ScreenContainer/ScreenContainer';
import SearchInput from '@components/SearchInput/SearchInput';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import University from './University';
import UniversityList from '@modules/Authentication/ChooseUniversity/UniversityList/UniversityList.tsx';
import UniversityMissing from '@modules/Authentication/ChooseUniversity/UniversityMissing/UniversityMissing.tsx';
import styles from './styles';

export interface Props {
  searchValue: string;
  onSearchInput: (value: string) => void;
  universities: University[];
  chosenUniversityId: number | undefined;
  onUniversityChoose: (universityId: number) => void;
  onSignInPress: () => void;
}

const ChooseUniversityView: React.FC<Props> = ({
  searchValue,
  onSearchInput,
  universities,
  chosenUniversityId,
  onUniversityChoose,
  onSignInPress,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  const isUniversityChosen = chosenUniversityId !== undefined;

  return (
    <ScreenContainer>
      <Text
        variant="headlineMedium"
        style={{color: theme.colors.neutral.black}}>
        {t('Choose your university')}
      </Text>

      <SearchInput
        value={searchValue}
        placeholder={t('Name of your university')}
        onInput={onSearchInput}
        style={{marginVertical: 24}}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <UniversityList
          universities={universities}
          chosenUniversityId={chosenUniversityId}
          onUniversityChoose={onUniversityChoose}
        />

        <UniversityMissing />
      </ScrollView>

      <Button
        mode="contained"
        style={isUniversityChosen ? styles.button : styles.disabledButton}
        labelStyle={styles.buttonText}
        onPress={isUniversityChosen ? onSignInPress : null}>
        {t('Sign In')}
      </Button>
    </ScreenContainer>
  );
};

export default ChooseUniversityView;
