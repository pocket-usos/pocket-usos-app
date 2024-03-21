import React, {useEffect, useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import CoursesView from '@modules/Courses/CoursesView';
import {useGetTermsQuery} from '@modules/Grades/api';
import Term from '@modules/Grades/Model/Term';
import moment from 'moment';
import {useGetCoursesQuery} from '@modules/Courses/api.ts';
import {useGetUsersPhotosQuery} from '@modules/Users/api.ts';

const CoursesContainer: React.FC = () => {
  const {data: terms, isFetching: isFetchingTerms} = useGetTermsQuery();

  const [selectedTerm, setSelectedTerm] = useState<Term>();

  useEffect(() => {
    const currentTerm = getCurrentTerm(terms);

    setSelectedTerm(currentTerm);
  }, [terms]);

  const getCurrentTerm = (availableTerms: Term[] | undefined) =>
    availableTerms?.filter(
      term =>
        moment(term.startDate)
          .startOf('day')
          .isBefore(moment().startOf('day')) &&
        moment(term.endDate).startOf('day').isAfter(moment().startOf('day')),
    )[0];

  const {
    data: courses,
    isFetching: isFetchingCourses,
    refetch: refetchCourses,
  } = useGetCoursesQuery(
    {termId: selectedTerm?.id},
    {skip: selectedTerm === undefined},
  );

  const {
    data: coursesWithSchedule,
    isFetching: isFetchingSchedules,
    refetch: refetchCoursesWithSchedule,
  } = useGetCoursesQuery(
    {termId: selectedTerm?.id, withSchedule: true},
    {
      skip: selectedTerm === undefined,
    },
  );

  const getLecturersIds = (): string[] => {
    return courses?.map(course => course.lecturers[0].id) ?? [];
  };

  const {
    data: lecturersPhotos,
    isFetching: areLecturersPhotosFetching,
    refetch: refetchLecturersPhotos,
  } = useGetUsersPhotosQuery(getLecturersIds(), {skip: courses === undefined});

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await refetchCourses();
      await refetchCoursesWithSchedule();
      await refetchLecturersPhotos();
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <LoadableScreenView isLoading={isFetchingTerms}>
      {terms && !isFetchingTerms ? (
        <CoursesView
          terms={terms}
          selectedTerm={selectedTerm}
          onTermSelect={(term: Term) => setSelectedTerm(term)}
          isFetchingCourses={isFetchingCourses}
          courses={courses}
          coursesWithSchedule={coursesWithSchedule}
          isFetchingSchedules={isFetchingSchedules}
          lecturersPhotos={lecturersPhotos}
          areLecturersPhotosFetching={areLecturersPhotosFetching}
          isRefreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : null}
    </LoadableScreenView>
  );
};

export default CoursesContainer;
