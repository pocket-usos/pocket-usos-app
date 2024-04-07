import React, {useEffect, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import styles from './styles';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';

const LanguageSelector: React.FC = () => {
  const {i18n} = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<'pl' | 'en'>();

  useEffect(() => {
    setSelectedLanguage(i18n.resolvedLanguage);
  }, [selectedLanguage]);

  const selectLanguage = (language: 'pl' | 'en') => {
    i18n.changeLanguage(language);
    RNRestart.restart();
  };

  return (
    <View style={styles.languageSelector}>
      <Pressable
        onPress={() => selectLanguage('pl')}
        style={[
          styles.language,
          {borderTopLeftRadius: 15, borderBottomLeftRadius: 15},
          selectedLanguage === 'pl' ? styles.selectedLanguage : null,
        ]}>
        <Image
          style={styles.languageIcon}
          source={require('../../../assets/images/language-pl.png')}
        />
        <Text
          style={[
            styles.languageText,
            selectedLanguage === 'pl' ? styles.selectedLanguageText : null,
          ]}>
          Polski
        </Text>
      </Pressable>
      <Pressable
        onPress={() => selectLanguage('en')}
        style={[
          styles.language,
          {borderTopRightRadius: 15, borderBottomRightRadius: 15},
          selectedLanguage === 'en' ? styles.selectedLanguage : null,
        ]}>
        <Image
          style={styles.languageIcon}
          source={require('../../../assets/images/language-en.png')}
        />
        <Text
          style={[
            styles.languageText,
            selectedLanguage === 'en' ? styles.selectedLanguageText : null,
          ]}>
          English
        </Text>
      </Pressable>
    </View>
  );
};

export default LanguageSelector;
