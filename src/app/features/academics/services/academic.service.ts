import { Injectable, signal } from '@angular/core';

import { Classroom, ClassroomDraft, Curriculum, CurriculumDraft, ScheduleDraft, ScheduleEntry, Subject, SubjectDraft } from '../models/academic.model';

const CLASSROOMS: readonly Classroom[] = [
  { id: '1', name: 'Grade 7A', grade: 'Grade 7', section: 'A', room: 'A-201', homeroomTeacher: 'Nora Lee', studentCount: 28, capacity: 32, status: 'Active' },
  { id: '2', name: 'Grade 7B', grade: 'Grade 7', section: 'B', room: 'A-202', homeroomTeacher: 'Lucas Martin', studentCount: 30, capacity: 32, status: 'Active' },
  { id: '3', name: 'Grade 8C', grade: 'Grade 8', section: 'C', room: 'B-105', homeroomTeacher: 'Marcus Rivera', studentCount: 27, capacity: 30, status: 'Active' },
  { id: '4', name: 'Grade 9A', grade: 'Grade 9', section: 'A', room: 'B-204', homeroomTeacher: 'Grace Thompson', studentCount: 29, capacity: 32, status: 'Active' },
  { id: '5', name: 'Grade 10A', grade: 'Grade 10', section: 'A', room: 'C-301', homeroomTeacher: 'Olivia Bennett', studentCount: 31, capacity: 32, status: 'Active' },
  { id: '6', name: 'Grade 11B', grade: 'Grade 11', section: 'B', room: 'C-304', homeroomTeacher: 'Daniel Kim', studentCount: 24, capacity: 30, status: 'Active' }
];

const SUBJECTS: readonly Subject[] = [
  { id: '1', code: 'MAT-101', name: 'Mathematics', department: 'Mathematics', leadTeacher: 'Olivia Bennett', gradeLevels: 'Grades 7–11', weeklyPeriods: 5, status: 'Active' },
  { id: '2', code: 'SCI-120', name: 'General Science', department: 'Science', leadTeacher: 'Daniel Kim', gradeLevels: 'Grades 7–9', weeklyPeriods: 4, status: 'Active' },
  { id: '3', code: 'ENG-110', name: 'English Language', department: 'Languages', leadTeacher: 'Grace Thompson', gradeLevels: 'Grades 7–11', weeklyPeriods: 5, status: 'Active' },
  { id: '4', code: 'HIS-210', name: 'World History', department: 'Humanities', leadTeacher: 'Marcus Rivera', gradeLevels: 'Grades 9–11', weeklyPeriods: 3, status: 'Active' },
  { id: '5', code: 'ART-100', name: 'Visual Arts', department: 'Arts', leadTeacher: 'Aisha Patel', gradeLevels: 'Grades 7–10', weeklyPeriods: 2, status: 'Active' },
  { id: '6', code: 'PED-100', name: 'Physical Education', department: 'Physical Education', leadTeacher: 'Lucas Martin', gradeLevels: 'Grades 7–11', weeklyPeriods: 2, status: 'Active' }
];

const CURRICULA: readonly Curriculum[] = [
  { id: '1', name: 'Lower Secondary Core', academicYear: '2026–2027', gradeRange: 'Grades 7–9', subjectCount: 12, weeklyPeriods: 35, progress: 100, status: 'Active' },
  { id: '2', name: 'Upper Secondary STEM', academicYear: '2026–2027', gradeRange: 'Grades 10–12', subjectCount: 14, weeklyPeriods: 38, progress: 92, status: 'Active' },
  { id: '3', name: 'Upper Secondary Arts', academicYear: '2026–2027', gradeRange: 'Grades 10–12', subjectCount: 13, weeklyPeriods: 36, progress: 76, status: 'Draft' }
];

const SCHEDULE: readonly ScheduleEntry[] = [
  { id: '1', day: 'Monday', period: 1, time: '08:00–08:50', className: 'Grade 10A', subject: 'Mathematics', teacher: 'Olivia Bennett', room: 'C-301' },
  { id: '2', day: 'Monday', period: 2, time: '08:55–09:45', className: 'Grade 10A', subject: 'English Language', teacher: 'Grace Thompson', room: 'C-301' },
  { id: '3', day: 'Monday', period: 3, time: '10:00–10:50', className: 'Grade 10A', subject: 'General Science', teacher: 'Daniel Kim', room: 'Lab 2' },
  { id: '4', day: 'Tuesday', period: 1, time: '08:00–08:50', className: 'Grade 10A', subject: 'World History', teacher: 'Marcus Rivera', room: 'C-301' },
  { id: '5', day: 'Tuesday', period: 2, time: '08:55–09:45', className: 'Grade 10A', subject: 'Mathematics', teacher: 'Olivia Bennett', room: 'C-301' },
  { id: '6', day: 'Wednesday', period: 1, time: '08:00–08:50', className: 'Grade 10A', subject: 'Visual Arts', teacher: 'Aisha Patel', room: 'Art Studio' },
  { id: '7', day: 'Thursday', period: 1, time: '08:00–08:50', className: 'Grade 10A', subject: 'English Language', teacher: 'Grace Thompson', room: 'C-301' },
  { id: '8', day: 'Friday', period: 1, time: '08:00–08:50', className: 'Grade 10A', subject: 'Physical Education', teacher: 'Lucas Martin', room: 'Gymnasium' }
];

@Injectable({ providedIn: 'root' })
export class AcademicService {
  private readonly classroomsState = signal(CLASSROOMS);
  private readonly subjectsState = signal(SUBJECTS);
  private readonly curriculaState = signal(CURRICULA);
  private readonly scheduleState = signal(SCHEDULE);
  readonly classrooms = this.classroomsState.asReadonly();
  readonly subjects = this.subjectsState.asReadonly();
  readonly curricula = this.curriculaState.asReadonly();
  readonly schedule = this.scheduleState.asReadonly();

  addClassroom(draft: ClassroomDraft): Classroom { const created = { ...draft, id: this.nextId(this.classrooms()) }; this.classroomsState.update((items) => [...items, created]); return created; }
  addSubject(draft: SubjectDraft): Subject { const id = this.nextId(this.subjects()); const created = { ...draft, id, code: `${draft.department.slice(0, 3).toUpperCase()}-${String(100 + Number(id))}` }; this.subjectsState.update((items) => [...items, created]); return created; }
  addCurriculum(draft: CurriculumDraft): Curriculum { const created = { ...draft, id: this.nextId(this.curricula()), progress: draft.status === 'Active' ? 100 : 0 }; this.curriculaState.update((items) => [...items, created]); return created; }
  addSchedule(draft: ScheduleDraft): ScheduleEntry { const times = ['08:00–08:50', '08:55–09:45', '10:00–10:50', '10:55–11:45', '12:45–13:35', '13:40–14:30', '14:35–15:25']; const created = { ...draft, id: this.nextId(this.schedule()), time: times[draft.period - 1] ?? 'TBA' }; this.scheduleState.update((items) => [...items, created]); return created; }

  private nextId(items: readonly { readonly id: string }[]): string { return String(Math.max(0, ...items.map((item) => Number(item.id))) + 1); }
}
