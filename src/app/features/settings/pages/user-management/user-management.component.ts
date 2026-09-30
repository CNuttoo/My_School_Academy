import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserDraft, UserStatus } from '../../models/settings.model';
import { SettingsService } from '../../services/settings.service';

@Component({ selector: 'app-user-management', imports: [FormsModule, ReactiveFormsModule], templateUrl: './user-management.component.html', styleUrls: ['../../settings.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class UserManagementComponent {
  readonly adding = signal(false); readonly query = signal(''); readonly status = signal('All');
  readonly users = computed(() => this.settingsService.users().filter((item) => `${item.name} ${item.email} ${this.settingsService.roleName(item.roleId)}`.toLowerCase().includes(this.query().toLowerCase()) && (this.status() === 'All' || item.status === this.status())));
  readonly form = this.formBuilder.nonNullable.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], roleId: [this.settingsService.roles()[1]?.id ?? this.settingsService.roles()[0].id, Validators.required] });
  constructor(private readonly formBuilder: FormBuilder, readonly settingsService: SettingsService) {}
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.settingsService.addUser(this.form.getRawValue() as UserDraft); this.form.reset({ name: '', email: '', roleId: this.settingsService.roles()[1]?.id ?? this.settingsService.roles()[0].id }); this.adding.set(false); }
  changeRole(userId: string, roleId: string): void { this.settingsService.updateUserRole(userId, roleId); }
  changeStatus(userId: string, status: UserStatus): void { this.settingsService.updateUserStatus(userId, status); }
}
