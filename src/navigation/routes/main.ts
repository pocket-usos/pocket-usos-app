import Home from '@modules/Home/Home';
import Schedule from '@modules/Schedule/Schedule';
import Grades from '@modules/Grades/Grades';
import Courses from '@modules/Courses/Courses';
import SingleCourse from '@modules/Courses/SingleCourse/SingleCourse';
import LecturerDetails from '@modules/Users/LecturerDetails/LecturerDetails';
import Notifications from '@modules/Notification/Notifications.tsx';

const main = {
  home: {
    name: 'Home',
    component: Home,
  },
  schedule: {
    name: 'Schedule',
    component: Schedule,
  },
  grades: {
    name: 'Grades',
    component: Grades,
  },
  courses: {
    name: 'Courses',
    component: Courses,
  },
  singleCourse: {
    name: 'SingleCourse',
    component: SingleCourse,
  },
  lecturerDetails: {
    name: 'LecturerDetails',
    component: LecturerDetails,
  },
  notifications: {
    name: 'Notifications',
    component: Notifications,
  },
};

export default main;
