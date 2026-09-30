import { AcademicService } from './academic.service';

describe('AcademicService', () => {
  let service: AcademicService;
  beforeEach(() => { service = new AcademicService(); });

  it('exposes the seeded academic data', () => {
    expect(service.classrooms().length).toBe(6);
    expect(service.subjects().length).toBe(6);
    expect(service.curricula().length).toBe(3);
  });

  it('adds a classroom to the mock state', () => {
    const created = service.addClassroom({ name: 'Grade 12A', grade: 'Grade 12', section: 'A', room: 'D-201', homeroomTeacher: 'Nora Lee', studentCount: 20, capacity: 30, status: 'Active' });
    expect(created.id).toBe('7');
    expect(service.classrooms().at(-1)?.name).toBe('Grade 12A');
  });

  it('derives time when adding a scheduled lesson', () => {
    const created = service.addSchedule({ day: 'Friday', period: 2, className: 'Grade 7A', subject: 'Mathematics', teacher: 'Olivia Bennett', room: 'A-201' });
    expect(created.time).toBe('08:55–09:45');
  });
});
