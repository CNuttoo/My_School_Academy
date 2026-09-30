export type TeacherStatus = 'Active' | 'On leave' | 'Inactive';

export interface Teacher {
  readonly id: string;
  readonly employeeNumber: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly department: string;
  readonly primarySubject: string;
  readonly homeroom: string;
  readonly joinDate: string;
  readonly status: TeacherStatus;
}

export type TeacherDraft = Omit<Teacher, 'id' | 'employeeNumber'>;
