import { Injectable, signal } from '@angular/core';

import { Teacher, TeacherDraft } from '../models/teacher.model';

const MOCK_TEACHERS: readonly Teacher[] = [
  { id: '1', employeeNumber: 'TCH-2026-001', firstName: 'Olivia', lastName: 'Bennett', email: 'olivia.bennett@northstar.edu', phone: '+1 555 014 210', department: 'Mathematics', primarySubject: 'Algebra & Calculus', homeroom: 'Grade 10A', joinDate: '2019-08-12', status: 'Active' },
  { id: '2', employeeNumber: 'TCH-2026-002', firstName: 'Daniel', lastName: 'Kim', email: 'daniel.kim@northstar.edu', phone: '+1 555 018 442', department: 'Science', primarySubject: 'Physics', homeroom: 'Grade 11B', joinDate: '2020-01-06', status: 'Active' },
  { id: '3', employeeNumber: 'TCH-2026-003', firstName: 'Grace', lastName: 'Thompson', email: 'grace.thompson@northstar.edu', phone: '+1 555 010 783', department: 'Languages', primarySubject: 'English Literature', homeroom: 'Grade 9A', joinDate: '2018-07-23', status: 'On leave' },
  { id: '4', employeeNumber: 'TCH-2026-004', firstName: 'Marcus', lastName: 'Rivera', email: 'marcus.rivera@northstar.edu', phone: '+1 555 016 325', department: 'Humanities', primarySubject: 'World History', homeroom: 'Grade 8C', joinDate: '2021-08-16', status: 'Active' },
  { id: '5', employeeNumber: 'TCH-2026-005', firstName: 'Aisha', lastName: 'Patel', email: 'aisha.patel@northstar.edu', phone: '+1 555 012 654', department: 'Arts', primarySubject: 'Visual Arts', homeroom: 'Not assigned', joinDate: '2023-02-01', status: 'Inactive' },
  { id: '6', employeeNumber: 'TCH-2026-006', firstName: 'Lucas', lastName: 'Martin', email: 'lucas.martin@northstar.edu', phone: '+1 555 019 870', department: 'Physical Education', primarySubject: 'Physical Education', homeroom: 'Grade 7B', joinDate: '2022-06-13', status: 'Active' }
];

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private readonly teachersState = signal<readonly Teacher[]>(MOCK_TEACHERS);
  readonly teachers = this.teachersState.asReadonly();

  getById(id: string): Teacher | undefined {
    return this.teachers().find((teacher) => teacher.id === id);
  }

  save(draft: TeacherDraft, id?: string): Teacher {
    const current = this.teachers();
    if (id) {
      const existing = this.getById(id);
      if (!existing) throw new Error(`Teacher ${id} was not found.`);
      const updated: Teacher = { ...existing, ...draft };
      this.teachersState.set(current.map((teacher) => teacher.id === id ? updated : teacher));
      return updated;
    }

    const nextId = String(Math.max(0, ...current.map((teacher) => Number(teacher.id))) + 1);
    const created: Teacher = { ...draft, id: nextId, employeeNumber: `TCH-2026-${nextId.padStart(3, '0')}` };
    this.teachersState.set([...current, created]);
    return created;
  }
}
