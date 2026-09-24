import { StudentDraft } from '../models/student.model';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    service = new StudentService();
  });

  it('exposes the seeded student directory', () => {
    expect(service.getById('1')?.firstName).toBe('Maya');
  });

  it('creates a typed student record with the next identifiers', () => {
    const draft: StudentDraft = {
      firstName: 'Ari',
      lastName: 'Taylor',
      email: 'ari.taylor@example.edu',
      grade: 'Grade 7',
      section: 'A',
      dateOfBirth: '2014-03-12',
      guardianName: 'Sam Taylor',
      guardianPhone: '+1 555 010 100',
      status: 'Active'
    };

    const created = service.save(draft);

    expect(created.id).toBe('6');
    expect(created.studentNumber).toBe('NST-2026-006');
    expect(service.getById(created.id)).toEqual(created);
  });
});
