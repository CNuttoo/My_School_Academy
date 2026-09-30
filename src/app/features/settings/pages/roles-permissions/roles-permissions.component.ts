import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PermissionKey, RoleDraft } from '../../models/settings.model';
import { SettingsService } from '../../services/settings.service';

interface PermissionOption { readonly key: PermissionKey; readonly label: string; readonly group: string; }

@Component({ selector: 'app-roles-permissions', imports: [ReactiveFormsModule], templateUrl: './roles-permissions.component.html', styleUrls: ['./roles-permissions.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class RolesPermissionsComponent {
  readonly permissions: readonly PermissionOption[] = [
    { key: 'students.view', label: 'View student records', group: 'Students' }, { key: 'students.manage', label: 'Add and edit students', group: 'Students' }, { key: 'teachers.manage', label: 'Manage teachers', group: 'People' }, { key: 'academics.manage', label: 'Manage academic setup', group: 'Academics' }, { key: 'attendance.manage', label: 'Take and review attendance', group: 'Academics' }, { key: 'grades.manage', label: 'Manage grades and reports', group: 'Academics' }, { key: 'finance.manage', label: 'Manage fees and payments', group: 'Finance' }, { key: 'settings.manage', label: 'Manage users and settings', group: 'Administration' }
  ];
  readonly adding = signal(false);
  readonly selectedRoleId = signal(this.settingsService.roles()[0].id);
  readonly selectedRole = computed(() => this.settingsService.roles().find((item) => item.id === this.selectedRoleId())!);
  readonly memberCount = computed(() => this.settingsService.users().filter((user) => user.roleId === this.selectedRoleId()).length);
  readonly form = this.formBuilder.nonNullable.group({ name: ['', Validators.required], description: ['', Validators.required] });
  constructor(private readonly formBuilder: FormBuilder, readonly settingsService: SettingsService) {}
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const role = this.settingsService.addRole(this.form.getRawValue() as RoleDraft); this.selectedRoleId.set(role.id); this.form.reset(); this.adding.set(false); }
  hasPermission(key: PermissionKey): boolean { return this.selectedRole().permissions.includes(key); }
  toggle(key: PermissionKey): void { if (this.selectedRole().name !== 'Administrator') this.settingsService.togglePermission(this.selectedRoleId(), key); }
}
