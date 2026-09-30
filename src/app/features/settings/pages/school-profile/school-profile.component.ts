import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { SchoolProfile } from '../../models/settings.model';
import { SettingsService } from '../../services/settings.service';

@Component({ selector: 'app-school-profile', imports: [ReactiveFormsModule], templateUrl: './school-profile.component.html', styleUrls: ['./school-profile.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class SchoolProfileComponent {
  readonly saved = signal(false);
  readonly form = this.formBuilder.nonNullable.group({ name: ['', Validators.required], code: ['', Validators.required], principal: ['', Validators.required], email: ['', [Validators.required, Validators.email]], phone: ['', Validators.required], address: ['', Validators.required], academicYear: ['', Validators.required], currentTerm: ['', Validators.required], timezone: ['', Validators.required] });
  constructor(private readonly formBuilder: FormBuilder, private readonly settingsService: SettingsService) { this.form.patchValue(this.settingsService.school()); }
  save(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.settingsService.updateSchool(this.form.getRawValue() as SchoolProfile); this.saved.set(true); }
}
