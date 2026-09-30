export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Excused';

export interface RosterStudent {
  readonly id: string;
  readonly studentNumber: string;
  readonly name: string;
}

export interface AttendanceRecord extends RosterStudent {
  readonly status: AttendanceStatus;
  readonly note: string;
}

export interface AttendanceSession {
  readonly id: string;
  readonly date: string;
  readonly className: string;
  readonly homeroomTeacher: string;
  readonly submittedAt: string;
  readonly records: readonly AttendanceRecord[];
}

export interface AttendanceCounts {
  readonly total: number;
  readonly present: number;
  readonly late: number;
  readonly absent: number;
  readonly excused: number;
}
