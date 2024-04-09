interface TermGrades {
  term: string;
  averageGrade: number;
  courses: TermCourse[];
}

interface TermCourse {
  id: string;
  name: string;
  units: TermCourseUnit[];
}

export interface TermCourseUnit {
  id: string;
  type: ClassType;
  grades: SessionGrade[];
}

interface ClassType {
  id: string;
  name: string;
}

export interface SessionGrade {
  sessionNumber: string;
  examId: string;
  grade: string;
  gradeDescription: string;
  passes: boolean;
  countsIntoAverage: boolean;
  comment: string;
  gradeTypeId: string;
  modifiedAt: Date;
  modifiedBy: GradeAuthor;
}

interface GradeAuthor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface GradesDistributionItem {
  percentage: number;
  grade: string;
}

export default TermGrades;
