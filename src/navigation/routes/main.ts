import Home from '@modules/Home/Home';
import Schedule from '@modules/Schedule/Schedule';
import Grades from '@modules/Grades/Grades';
import Courses from '@modules/Courses/Courses';

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
};

export default main;
