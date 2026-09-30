import { GradeService } from './grade.service';

describe('GradeService', () => {
  let service: GradeService;
  beforeEach(() => { service = new GradeService(); });

  it('assigns letter grades from percentage scores', () => {
    expect(service.letterGrade(85)).toBe('A'); expect(service.letterGrade(72)).toBe('B'); expect(service.letterGrade(45)).toBe('F');
  });

  it('adds an assessment and score rows for the selected class', () => {
    const assessment = service.addAssessment({ title: 'Biology Quiz', subject: 'General Science', className: 'Grade 10A', type: 'Quiz', maxScore: 20, weight: 10, dueDate: '2026-10-01', status: 'Open' });
    expect(assessment.id).toBe('6'); expect(service.scoresFor(assessment.id).length).toBe(5);
  });

  it('marks an assessment graded when all scores are entered', () => {
    const entries = service.scoresFor('3').map((item) => ({ ...item, score: 80 })); service.saveScores('3', entries);
    expect(service.assessments().find((item) => item.id === '3')?.status).toBe('Graded');
  });

  it('generates a report card from graded assessments', () => {
    const report = service.generateReport('10A-1', 'Term 1 · 2026–2027', 'Draft');
    expect(report.studentName).toBe('Maya Chen'); expect(report.results.length).toBe(2); expect(report.grade).toBe('A');
  });
});
