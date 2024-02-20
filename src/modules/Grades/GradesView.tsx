import React from 'react';
import {Chip, Text} from 'react-native-paper';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import styles from './styles.ts';
import Term from './Model/Term.ts';
import TermGrades from '@modules/Grades/Model/TermGrades.ts';

interface Props {
  terms: Term[];
  selectedTerm?: Term;
  onTermSelect: (term: Term) => void;
  grades?: TermGrades;
}

const GradesView: React.FC<Props> = ({
  terms,
  selectedTerm,
  onTermSelect,
  grades,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          {t('Your grades')}
        </Text>
        <ScrollView
          horizontal
          style={styles.terms}
          showsHorizontalScrollIndicator={false}>
          {terms.map(term => (
            <Chip
              key={term.id}
              style={[
                styles.term,
                term.id === selectedTerm?.id ? styles.selectedTerm : null,
              ]}
              textStyle={styles.termText}
              selected={term.id === selectedTerm?.id}
              selectedColor={theme.colors.neutral.white}
              onPress={() => onTermSelect(term)}>
              {term.name}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <View style={styles.gradesContainer}>
        <Text>{grades?.term}</Text>
      </View>
    </View>
  );
};

export default GradesView;
