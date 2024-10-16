import React, {useEffect, useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import GradesView from '@modules/Grades/GradesView';
import {useGetGradesQuery, useGetTermsQuery} from '@modules/Grades/api.ts';
import Term from './Model/Term.ts';
import moment from 'moment';

const GradesContainer: React.FC = () => {
  const {data: terms, isFetching: isFetchingTerms} = useGetTermsQuery();

  const [selectedTerm, setSelectedTerm] = useState<Term>();

  useEffect(() => {
    const currentTerm = terms?.filter(
      term =>
        moment(term.startDate)
          .startOf('day')
          .isBefore(moment().startOf('day')) &&
        moment(term.endDate).startOf('day').isAfter(moment().startOf('day')),
    )[0];

    if (currentTerm) {
      setSelectedTerm(currentTerm);
    } else {
      setSelectedTerm(terms ? terms[0] : undefined);
    }
  }, [terms]);

  const {
    data: grades,
    isFetching: isFetchingGrades,
    refetch: refetchGrades,
  } = useGetGradesQuery(selectedTerm?.id, {skip: selectedTerm === undefined});

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await refetchGrades();
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <LoadableScreenView isLoading={isFetchingTerms}>
      {terms && !isFetchingTerms ? (
        <GradesView
          terms={terms}
          selectedTerm={selectedTerm}
          onTermSelect={(term: Term) => setSelectedTerm(term)}
          isFetchingGrades={isFetchingGrades}
          isRefreshing={refreshing}
          onRefresh={onRefresh}
          grades={grades}
        />
      ) : null}
    </LoadableScreenView>
  );
};

export default GradesContainer;
