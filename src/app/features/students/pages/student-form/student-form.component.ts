
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Student, StudentDraft, StudentStatus } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
@Component({
    selector: 'app-student-form', imports: [ReactiveFormsModule, RouterLink], templateUrl: './student-form.component.html', styleUrls: ['./student-form.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentFormComponent{
  readonly grades=Array.from({length:12},(_value,index)=>`Grade ${index+1}`);
  readonly studentId:string|null;
  readonly existingStudent:Student|undefined;
  submitted=false;
  readonly form=this.formBuilder.nonNullable.group({firstName:['',Validators.required],lastName:['',Validators.required],email:['',[Validators.required,Validators.email]],grade:['Grade 10',Validators.required],section:['A',Validators.required],dateOfBirth:['',Validators.required],guardianName:['',Validators.required],guardianPhone:['',Validators.required],status:['Active' as StudentStatus,Validators.required]});
  constructor(private readonly formBuilder:FormBuilder,route:ActivatedRoute,private readonly router:Router,private readonly studentService:StudentService){this.studentId=route.snapshot.paramMap.get('id');this.existingStudent=this.studentId?studentService.getById(this.studentId):undefined;if(this.existingStudent){const {id:_id,studentNumber:_studentNumber,...draft}=this.existingStudent;this.form.patchValue(draft);}}
  get title():string{return this.studentId?'Edit student':'Add new student';}
  submit():void{this.submitted=true;if(this.form.invalid){this.form.markAllAsTouched();return;}const saved=this.studentService.save(this.form.getRawValue() as StudentDraft,this.studentId??undefined);void this.router.navigate(['/students',saved.id]);}
}
