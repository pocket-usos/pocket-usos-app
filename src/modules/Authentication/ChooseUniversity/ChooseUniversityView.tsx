import React, {useEffect, useRef} from 'react';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import ScreenContainer from '@components/ScreenContainer/ScreenContainer';
import SearchInput from '@components/SearchInput/SearchInput';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import UniversityMissing from '@modules/Authentication/ChooseUniversity/UniversityMissing/UniversityMissing.tsx';
import styles from './styles';
import University from '../Model/University';
import UniversityItem from './UniversityList/UniversityItem';

export interface Props {
  searchValue: string;
  onSearchInput: (value: string) => void;
  universities?: University[];
  isFetchingUniversities: boolean;
  chosenUniversityId: string | undefined;
  onUniversityChoose: (universityId: string) => void;
  onSignInPress: () => void;
}

const ChooseUniversityView: React.FC<Props> = ({
  searchValue,
  onSearchInput,
  universities,
  isFetchingUniversities,
  chosenUniversityId,
  onUniversityChoose,
  onSignInPress,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  const isUniversityChosen = chosenUniversityId !== undefined;

  const scrollView = useRef<ScrollView>();

  useEffect(() => {
    if (isUniversityChosen) {
      const universityItemHeight = 48;
      const chosenUniversityIndex = universities?.findIndex(
        u => u.id === chosenUniversityId,
      );

      if (chosenUniversityIndex) {
        scrollView.current?.scrollTo({
          x: 0,
          y: chosenUniversityIndex * universityItemHeight,
          animated: true,
        });
      }
    }
  });

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

      {isFetchingUniversities ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView ref={scrollView} showsVerticalScrollIndicator={false}>
          {universities?.map(u => (
            <UniversityItem
              key={u.id}
              name={u.name}
              logoUrl={u.logoUrl}
              isChosen={u.id === chosenUniversityId}
              isBeta={u.isBeta}
              onPress={() => onUniversityChoose(u.id)}
            />
          ))}

          <UniversityMissing />
        </ScrollView>
      )}

      <Button
        mode="contained"
        style={isUniversityChosen ? styles.button : styles.disabledButton}
        labelStyle={styles.buttonText}
        onPress={isUniversityChosen ? onSignInPress : undefined}>
        {t('Sign In')}
      </Button>
    </ScreenContainer>
  );
};

export default ChooseUniversityView;
