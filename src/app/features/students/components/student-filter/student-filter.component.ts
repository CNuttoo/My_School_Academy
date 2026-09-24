import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentStatus } from '../../models/student.model';
export interface StudentFilter{readonly query:string;readonly status:StudentStatus|'All';}
@Component({
    selector: 'app-student-filter', imports: [FormsModule], templateUrl: './student-filter.component.html', styleUrls: ['./student-filter.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentFilterComponent{
  @Output() readonly filterChange=new EventEmitter<StudentFilter>();
  query='';status:StudentStatus|'All'='All';
  emitFilter():void{this.filterChange.emit({query:this.query.trim(),status:this.status});}
}
