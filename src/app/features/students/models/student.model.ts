export type StudentStatus='Active'|'Inactive';
export interface Student{readonly id:string;readonly studentNumber:string;readonly firstName:string;readonly lastName:string;readonly email:string;readonly grade:string;readonly section:string;readonly dateOfBirth:string;readonly guardianName:string;readonly guardianPhone:string;readonly status:StudentStatus;}
export type StudentDraft=Omit<Student,'id'|'studentNumber'>;
