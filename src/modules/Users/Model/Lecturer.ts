interface Lecturer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  title?: string;
  officeHoursInformation?: string;
  courses?: ConductedCourse[];
}

interface ConductedCourse {
  id: string;
  name: string;
  term: CourseTerm;
}

interface CourseTerm {
  id: string;
  name: string;
}

export default Lecturer;
