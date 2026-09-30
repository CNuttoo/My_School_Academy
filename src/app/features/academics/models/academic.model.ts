export type AcademicStatus = 'Active' | 'Draft' | 'Archived';
export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface Classroom {
  readonly id: string;
  readonly name: string;
  readonly grade: string;
  readonly section: string;
  readonly room: string;
  readonly homeroomTeacher: string;
  readonly studentCount: number;
  readonly capacity: number;
  readonly status: 'Active' | 'Inactive';
}

export interface Subject {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly department: string;
  readonly leadTeacher: string;
  readonly gradeLevels: string;
  readonly weeklyPeriods: number;
  readonly status: 'Active' | 'Inactive';
}

export interface Curriculum {
  readonly id: string;
  readonly name: string;
  readonly academicYear: string;
  readonly gradeRange: string;
  readonly subjectCount: number;
  readonly weeklyPeriods: number;
  readonly progress: number;
  readonly status: AcademicStatus;
}

export interface ScheduleEntry {
  readonly id: string;
  readonly day: Weekday;
  readonly period: number;
  readonly time: string;
  readonly className: string;
  readonly subject: string;
  readonly teacher: string;
  readonly room: string;
}

export type ClassroomDraft = Omit<Classroom, 'id'>;
export type SubjectDraft = Omit<Subject, 'id' | 'code'>;
export type CurriculumDraft = Omit<Curriculum, 'id' | 'progress'>;
export type ScheduleDraft = Omit<ScheduleEntry, 'id' | 'time'>;
