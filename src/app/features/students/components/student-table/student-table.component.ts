
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';
@Component({
    selector: 'app-student-table', imports: [RouterLink], templateUrl: './student-table.component.html', styleUrls: ['./student-table.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTableComponent{
  @Input() students:readonly Student[]=[];
  initials(student:Student):string{return `${student.firstName[0]}${student.lastName[0]}`;}
  trackById(_index:number,student:Student):string{return student.id;}
}
