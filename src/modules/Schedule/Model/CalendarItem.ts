interface CalendarItem {
  start: Date;
  end: Date;
  name: string;
  courseId: string;
  courseUnitId: number;
  classType: ClassType;
  lecturers: Lecturer[];
  groupNumber: number;
  room: Room;
}

export interface Day {
  schedule: CalendarItem[];
  date: Date;
}

interface ClassType {
  id: string;
  name: string;
}

interface Lecturer {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
}

interface Room {
  id: string;
  name: string;
}

export default CalendarItem;
