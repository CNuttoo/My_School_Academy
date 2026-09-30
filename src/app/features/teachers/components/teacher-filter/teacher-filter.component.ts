import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TeacherStatus } from '../../models/teacher.model';

export interface TeacherFilter {
  readonly query: string;
  readonly department: string;
  readonly status: TeacherStatus | 'All';
}

@Component({
  selector: 'app-teacher-filter',
  imports: [FormsModule],
  templateUrl: './teacher-filter.component.html',
  styleUrls: ['./teacher-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherFilterComponent {
  @Input() departments: readonly string[] = [];
  @Output() readonly filterChange = new EventEmitter<TeacherFilter>();

  query = '';
  department = 'All';
  status: TeacherStatus | 'All' = 'All';

  emitFilter(): void {
    this.filterChange.emit({ query: this.query.trim(), department: this.department, status: this.status });
  }
}
