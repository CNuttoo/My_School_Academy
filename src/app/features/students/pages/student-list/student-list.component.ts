import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentFilter, StudentFilterComponent } from '../../components/student-filter/student-filter.component';
import { StudentTableComponent } from '../../components/student-table/student-table.component';
import { StudentService } from '../../services/student.service';
@Component({
    selector: 'app-student-list', imports: [RouterLink, StudentFilterComponent, StudentTableComponent], templateUrl: './student-list.component.html', styleUrls: ['./student-list.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentListComponent{
  private readonly filter=signal<StudentFilter>({query:'',status:'All'});
  readonly students=computed(()=>{const filter=this.filter();return this.studentService.students().filter((student)=>{const searchable=`${student.firstName} ${student.lastName} ${student.studentNumber} ${student.email}`.toLowerCase();return searchable.includes(filter.query.toLowerCase())&&(filter.status==='All'||student.status===filter.status);});});
  constructor(private readonly studentService:StudentService){}
  updateFilter(filter:StudentFilter):void{this.filter.set(filter);}
}
