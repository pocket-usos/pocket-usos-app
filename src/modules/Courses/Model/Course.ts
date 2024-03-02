interface Course {
  id: string;
  unitId: string;
  name: string;
  term: string;
  groupNumber: number;
  classType: ClassType;
  schedule: CourseSchedule;
  lecturers: Lecturer[];
  participants: Participant[] | null;
}

interface ClassType {
  id: string;
  name: string;
}

interface CourseSchedule {
  items: CourseScheduleItem[];
  classesCount: number;
  classesCompleted: number;
}

interface CourseScheduleItem {
  start: Date;
  end: Date;
}

interface Lecturer {
  id: string;
  firstName: string;
  lastName: string;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
}

export default Course;
