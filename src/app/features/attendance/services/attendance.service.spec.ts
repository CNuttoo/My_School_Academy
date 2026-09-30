import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;
  beforeEach(() => { service = new AttendanceService(); });

  it('creates a present draft for an unsubmitted class and date', () => {
    const draft = service.createDraft('2026-09-26', 'Grade 7A');
    expect(draft.length).toBe(5);
    expect(draft.every((item) => item.status === 'Present')).toBeTrue();
  });

  it('calculates attendance status totals', () => {
    const session = service.getSession('2026-09-25', 'Grade 8C')!;
    const counts = service.counts(session.records);
    expect(counts.present).toBe(3);
    expect(counts.absent).toBe(1);
    expect(counts.excused).toBe(1);
  });

  it('saves and retrieves an attendance register', () => {
    const draft = service.createDraft('2026-09-26', 'Grade 9A');
    service.saveSession('2026-09-26', 'Grade 9A', [{ ...draft[0], status: 'Late' }, ...draft.slice(1)]);
    expect(service.getSession('2026-09-26', 'Grade 9A')?.records[0].status).toBe('Late');
  });
});
