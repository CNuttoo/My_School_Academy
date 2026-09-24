import { Injectable, signal } from '@angular/core';
import { Student, StudentDraft } from '../models/student.model';

const MOCK_STUDENTS:readonly Student[]=[
  {id:'1',studentNumber:'NST-2026-001',firstName:'Maya',lastName:'Chen',email:'maya.chen@example.edu',grade:'Grade 10',section:'A',dateOfBirth:'2011-04-18',guardianName:'Lena Chen',guardianPhone:'+1 555 012 804',status:'Active'},
  {id:'2',studentNumber:'NST-2026-002',firstName:'Noah',lastName:'Williams',email:'noah.williams@example.edu',grade:'Grade 9',section:'B',dateOfBirth:'2012-08-03',guardianName:'Jordan Williams',guardianPhone:'+1 555 017 330',status:'Active'},
  {id:'3',studentNumber:'NST-2026-003',firstName:'Sofia',lastName:'Martinez',email:'sofia.martinez@example.edu',grade:'Grade 11',section:'A',dateOfBirth:'2010-01-27',guardianName:'Elena Martinez',guardianPhone:'+1 555 011 285',status:'Active'},
  {id:'4',studentNumber:'NST-2026-004',firstName:'Ethan',lastName:'Patel',email:'ethan.patel@example.edu',grade:'Grade 8',section:'C',dateOfBirth:'2013-11-09',guardianName:'Priya Patel',guardianPhone:'+1 555 019 762',status:'Inactive'},
  {id:'5',studentNumber:'NST-2026-005',firstName:'Amelia',lastName:'Brooks',email:'amelia.brooks@example.edu',grade:'Grade 10',section:'B',dateOfBirth:'2011-06-12',guardianName:'Casey Brooks',guardianPhone:'+1 555 016 994',status:'Active'}
];
@Injectable({providedIn:'root'})
export class StudentService{
  private readonly studentsState=signal<readonly Student[]>(MOCK_STUDENTS);
  readonly students=this.studentsState.asReadonly();
  getById(id:string):Student|undefined{return this.students().find((student)=>student.id===id);}
  save(draft:StudentDraft,id?:string):Student{const current=this.students();if(id){const existing=this.getById(id);if(!existing)throw new Error(`Student ${id} was not found.`);const updated:Student={...existing,...draft};this.studentsState.set(current.map((student)=>student.id===id?updated:student));return updated;}const nextId=String(Math.max(0,...current.map((student)=>Number(student.id)))+1);const created:Student={...draft,id:nextId,studentNumber:`NST-2026-${nextId.padStart(3,'0')}`};this.studentsState.set([...current,created]);return created;}
}
