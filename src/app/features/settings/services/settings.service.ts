import { Injectable, signal } from '@angular/core';

import { PermissionKey, Role, RoleDraft, SchoolProfile, UserAccount, UserDraft, UserStatus } from '../models/settings.model';

const SCHOOL: SchoolProfile = { name: 'Northstar School', code: 'NSS-001', principal: 'Dr. Alexandra Morgan', email: 'office@northstar.edu', phone: '+1 555 010 2026', address: '128 Learning Avenue, Brookfield, NY 10018', academicYear: '2026–2027', currentTerm: 'Term 1', timezone: 'Asia/Bangkok (UTC+7)' };

const ROLES: readonly Role[] = [
  { id: '1', name: 'Administrator', description: 'Full access to school operations and configuration.', system: true, permissions: ['students.view', 'students.manage', 'teachers.manage', 'academics.manage', 'attendance.manage', 'grades.manage', 'finance.manage', 'settings.manage'] },
  { id: '2', name: 'Teacher', description: 'Manage assigned classes, attendance, assessments, and grades.', system: true, permissions: ['students.view', 'academics.manage', 'attendance.manage', 'grades.manage'] },
  { id: '3', name: 'Finance Officer', description: 'Manage fees, payments, invoices, and financial reports.', system: false, permissions: ['students.view', 'finance.manage'] },
  { id: '4', name: 'Registrar', description: 'Maintain student and teacher records.', system: false, permissions: ['students.view', 'students.manage', 'teachers.manage'] }
];

const USERS: readonly UserAccount[] = [
  { id: '1', name: 'Alex Morgan', email: 'admin@northstar.edu', roleId: '1', status: 'Active', lastActive: 'Today, 09:42' },
  { id: '2', name: 'Olivia Bennett', email: 'olivia.bennett@northstar.edu', roleId: '2', status: 'Active', lastActive: 'Today, 08:15' },
  { id: '3', name: 'Daniel Kim', email: 'daniel.kim@northstar.edu', roleId: '2', status: 'Active', lastActive: 'Yesterday, 16:30' },
  { id: '4', name: 'Helen Carter', email: 'helen.carter@northstar.edu', roleId: '3', status: 'Active', lastActive: 'Today, 09:05' },
  { id: '5', name: 'Samuel Reed', email: 'samuel.reed@northstar.edu', roleId: '4', status: 'Suspended', lastActive: '18 Sep 2026' }
];

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly schoolState = signal(SCHOOL);
  private readonly rolesState = signal(ROLES);
  private readonly usersState = signal(USERS);
  readonly school = this.schoolState.asReadonly();
  readonly roles = this.rolesState.asReadonly();
  readonly users = this.usersState.asReadonly();

  updateSchool(profile: SchoolProfile): void { this.schoolState.set({ ...profile }); }
  roleName(roleId: string): string { return this.roles().find((role) => role.id === roleId)?.name ?? 'Unknown'; }

  addRole(draft: RoleDraft): Role { const role: Role = { ...draft, id: this.nextId(this.roles()), system: false, permissions: ['students.view'] }; this.rolesState.update((items) => [...items, role]); return role; }
  togglePermission(roleId: string, permission: PermissionKey): void { this.rolesState.update((items) => items.map((role) => role.id !== roleId ? role : { ...role, permissions: role.permissions.includes(permission) ? role.permissions.filter((item) => item !== permission) : [...role.permissions, permission] })); }

  addUser(draft: UserDraft): UserAccount { const user: UserAccount = { ...draft, id: this.nextId(this.users()), status: 'Active', lastActive: 'Invitation pending' }; this.usersState.update((items) => [...items, user]); return user; }
  updateUserRole(userId: string, roleId: string): void { this.usersState.update((items) => items.map((user) => user.id === userId ? { ...user, roleId } : user)); }
  updateUserStatus(userId: string, status: UserStatus): void { this.usersState.update((items) => items.map((user) => user.id === userId ? { ...user, status } : user)); }

  private nextId(items: readonly { readonly id: string }[]): string { return String(Math.max(0, ...items.map((item) => Number(item.id))) + 1); }
}
