import { TeacherDraft } from '../models/teacher.model';
import { TeacherService } from './teacher.service';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(() => { service = new TeacherService(); });

  it('exposes the seeded teacher directory', () => {
    expect(service.getById('1')?.firstName).toBe('Olivia');
  });

  it('creates a teacher with the next employee number', () => {
    const draft: TeacherDraft = { firstName: 'Nora', lastName: 'Lee', email: 'nora.lee@northstar.edu', phone: '+1 555 010 110', department: 'Science', primarySubject: 'Biology', homeroom: 'Grade 7A', joinDate: '2026-09-01', status: 'Active' };
    const created = service.save(draft);
    expect(created.id).toBe('7');
    expect(created.employeeNumber).toBe('TCH-2026-007');
    expect(service.getById(created.id)).toEqual(created);
  });

  it('updates an existing teacher without changing their employee number', () => {
    const existing = service.getById('2')!;
    const updated = service.save({ ...existing, status: 'On leave' }, '2');
    expect(updated.employeeNumber).toBe('TCH-2026-002');
    expect(updated.status).toBe('On leave');
  });
});
