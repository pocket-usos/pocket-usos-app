import React from 'react';
import SingleCourseView from '@modules/Courses/SingleCourse/SingleCourseView.tsx';
import Course from '../Model/Course';
import {useGetUsersPhotosQuery, useGetUsersQuery} from '@modules/Users/api';

interface Props {
  course: Course;
  route: any;
}

const SingleCourseContainer: React.FC<Props> = ({route}) => {
  const getUsersIds = (): string[] => {
    const course: Course = route.params.course;

    const lecturersIds = course.lecturers.map(lecturer => lecturer.id);
    const participantsIds =
      course.participants?.map(participant => participant.id) ?? [];

    return [...lecturersIds, ...participantsIds];
  };

  const getLecturersIds = (): string[] => {
    const course: Course = route.params.course;

    return course.lecturers.map(lecturer => lecturer.id);
  };

  const {data: usersPhotos} = useGetUsersPhotosQuery(getUsersIds());
  const {data: lecturers} = useGetUsersQuery(getLecturersIds());

  return (
    <SingleCourseView
      course={route.params.course}
      mainColor={route.params.color}
      selectedTerm={route.params.selectedTerm}
      usersPhotos={usersPhotos}
      lecturers={lecturers}
    />
  );
};

export default SingleCourseContainer;
