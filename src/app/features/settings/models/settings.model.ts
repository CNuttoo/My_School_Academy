export type UserStatus = 'Active' | 'Suspended';
export type PermissionKey = 'students.view' | 'students.manage' | 'teachers.manage' | 'academics.manage' | 'attendance.manage' | 'grades.manage' | 'finance.manage' | 'settings.manage';

export interface SchoolProfile {
  readonly name: string;
  readonly code: string;
  readonly principal: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly academicYear: string;
  readonly currentTerm: string;
  readonly timezone: string;
}

export interface Role {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly system: boolean;
  readonly permissions: readonly PermissionKey[];
}

export interface UserAccount {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly roleId: string;
  readonly status: UserStatus;
  readonly lastActive: string;
}

export type RoleDraft = Pick<Role, 'name' | 'description'>;
export type UserDraft = Pick<UserAccount, 'name' | 'email' | 'roleId'>;
