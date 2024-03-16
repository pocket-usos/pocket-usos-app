interface GetScheduleRequest {
  start: Date;
  days: number;
}

export interface GetLecturerScheduleRequest {
  lecturerId: string;
  start?: Date;
  days?: number;
}

export default GetScheduleRequest;
