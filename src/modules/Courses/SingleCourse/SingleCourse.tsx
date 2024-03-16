import React from 'react';
import SingleCourseView from '@modules/Courses/SingleCourse/SingleCourseView.tsx';
import Course from '../Model/Course';
import {useGetUsersPhotosQuery, useGetUsersQuery} from '@modules/Users/api';
import {useGetCourseQuery} from '../api';
import {useGetTermsQuery} from '@modules/Grades/api';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView';

interface Props {
  navigation: any;
  route: any;
}

const SingleCourseContainer: React.FC<Props> = ({navigation, route}) => {
  const {data: terms, isFetching: isFetchingTerms} = useGetTermsQuery();
  const {data: course, isFetching: isFetchingCourse} = useGetCourseQuery(
    {courseId: route.params.courseId, courseUnitId: route.params.courseUnitId},
    {skip: route.params.course !== undefined},
  );

  const getUsersIds = (): string[] => {
    const courseItem: Course = route.params.course ?? course;

    if (courseItem) {
      const lecturersIds = courseItem.lecturers.map(lecturer => lecturer.id);
      const participantsIds =
        courseItem.participants?.map(participant => participant.id) ?? [];

      return [...lecturersIds, ...participantsIds];
    }

    return [];
  };

  const getLecturersIds = (): string[] => {
    const courseItem: Course = route.params.course ?? course;

    if (courseItem) {
      return courseItem.lecturers.map(lecturer => lecturer.id);
    }

    return [];
  };

  const goBack = () => navigation.navigate(route.params.previousScreen);

  const goToLecturerDetails = (lecturerId: string) =>
    navigation.navigate('LecturerDetails', {
      lecturerId,
      color: route.params.color,
      previousScreen: 'SingleCourse',
      previousScreenParams: route.params,
    });

  const {data: usersPhotos} = useGetUsersPhotosQuery(getUsersIds(), {
    skip: course === undefined && route.params.course === undefined,
  });
  const {data: lecturers} = useGetUsersQuery(getLecturersIds(), {
    skip: course === undefined && route.params.course === undefined,
  });

  return (
    <LoadableScreenView isLoading={isFetchingTerms || isFetchingCourse}>
      {!isFetchingCourse &&
      !isFetchingTerms &&
      (course !== undefined || route.params.course !== undefined) ? (
        <SingleCourseView
          course={route.params.course ?? course}
          terms={terms}
          mainColor={route.params.color}
          usersPhotos={usersPhotos}
          lecturers={lecturers}
          goBack={goBack}
          goToLecturerDetails={goToLecturerDetails}
        />
      ) : null}
    </LoadableScreenView>
  );
};

export default SingleCourseContainer;
