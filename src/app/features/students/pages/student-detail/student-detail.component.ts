
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
@Component({
    selector: 'app-student-detail', imports: [RouterLink], templateUrl: './student-detail.component.html', styleUrls: ['./student-detail.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDetailComponent{
  readonly student:Student|undefined;
  constructor(route:ActivatedRoute,studentService:StudentService){this.student=studentService.getById(route.snapshot.paramMap.get('id')??'');}
  get initials():string{return this.student?`${this.student.firstName[0]}${this.student.lastName[0]}`:'';}
}
