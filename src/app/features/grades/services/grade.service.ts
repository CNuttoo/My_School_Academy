import { Injectable, signal } from '@angular/core';

import { Assessment, AssessmentDraft, ReportCard, ReportStatus, StudentScore } from '../models/grade.model';

const STUDENTS = [
  { id: '10A-1', name: 'Maya Chen', className: 'Grade 10A' }, { id: '10A-2', name: 'Amelia Brooks', className: 'Grade 10A' }, { id: '10A-3', name: 'Liam Clark', className: 'Grade 10A' }, { id: '10A-4', name: 'Chloe Lewis', className: 'Grade 10A' }, { id: '10A-5', name: 'Ben Harris', className: 'Grade 10A' },
  { id: '9A-1', name: 'Noah Williams', className: 'Grade 9A' }, { id: '9A-2', name: 'Ella King', className: 'Grade 9A' }, { id: '9A-3', name: 'Jack Wright', className: 'Grade 9A' }
] as const;

const ASSESSMENTS: readonly Assessment[] = [
  { id: '1', title: 'Algebra Unit Test', subject: 'Mathematics', className: 'Grade 10A', type: 'Quiz', maxScore: 40, weight: 15, dueDate: '2026-09-18', status: 'Graded' },
  { id: '2', title: 'Forces and Motion Lab', subject: 'General Science', className: 'Grade 10A', type: 'Project', maxScore: 50, weight: 20, dueDate: '2026-09-22', status: 'Graded' },
  { id: '3', title: 'Literary Analysis Essay', subject: 'English Language', className: 'Grade 10A', type: 'Assignment', maxScore: 100, weight: 20, dueDate: '2026-09-30', status: 'Open' },
  { id: '4', title: 'Geometry Quiz', subject: 'Mathematics', className: 'Grade 9A', type: 'Quiz', maxScore: 30, weight: 10, dueDate: '2026-09-20', status: 'Graded' },
  { id: '5', title: 'Term 1 Midterm', subject: 'World History', className: 'Grade 10A', type: 'Midterm', maxScore: 100, weight: 25, dueDate: '2026-10-08', status: 'Draft' }
];

function scores(assessmentId: string, className: string, values: readonly (number | null)[]): StudentScore[] {
  return STUDENTS.filter((student) => student.className === className).map((student, index) => ({ id: `${assessmentId}-${student.id}`, assessmentId, studentId: student.id, studentName: student.name, score: values[index] ?? null, feedback: '' }));
}

const SCORES: readonly StudentScore[] = [
  ...scores('1', 'Grade 10A', [36, 31, 39, 28, 34]), ...scores('2', 'Grade 10A', [44, 40, 47, 38, 42]), ...scores('3', 'Grade 10A', [null, null, null, null, null]), ...scores('4', 'Grade 9A', [27, 24, 29]), ...scores('5', 'Grade 10A', [null, null, null, null, null])
];

const REPORTS: readonly ReportCard[] = [
  { id: '1', studentId: '10A-1', studentName: 'Maya Chen', className: 'Grade 10A', term: 'Term 1 · 2026–2027', average: 89, grade: 'A', status: 'Published', generatedAt: '2026-09-23', results: [{ subject: 'Mathematics', average: 90, grade: 'A' }, { subject: 'General Science', average: 88, grade: 'A' }] },
  { id: '2', studentId: '10A-2', studentName: 'Amelia Brooks', className: 'Grade 10A', term: 'Term 1 · 2026–2027', average: 79, grade: 'B', status: 'Draft', generatedAt: '2026-09-23', results: [{ subject: 'Mathematics', average: 78, grade: 'B' }, { subject: 'General Science', average: 80, grade: 'B' }] }
];

@Injectable({ providedIn: 'root' })
export class GradeService {
  private readonly assessmentsState = signal(ASSESSMENTS);
  private readonly scoresState = signal(SCORES);
  private readonly reportsState = signal(REPORTS);
  readonly assessments = this.assessmentsState.asReadonly();
  readonly scores = this.scoresState.asReadonly();
  readonly reports = this.reportsState.asReadonly();
  readonly students = STUDENTS;

  addAssessment(draft: AssessmentDraft): Assessment {
    const id = this.nextId(this.assessments()); const assessment = { ...draft, id };
    this.assessmentsState.update((items) => [...items, assessment]);
    this.scoresState.update((items) => [...items, ...scores(id, draft.className, [])]);
    return assessment;
  }

  scoresFor(assessmentId: string): readonly StudentScore[] { return this.scores().filter((item) => item.assessmentId === assessmentId); }
  saveScores(assessmentId: string, updated: readonly StudentScore[]): void {
    const updatedIds = new Set(updated.map((item) => item.id));
    this.scoresState.update((items) => [...items.filter((item) => item.assessmentId !== assessmentId || !updatedIds.has(item.id)), ...updated]);
    if (updated.length && updated.every((item) => item.score !== null)) this.assessmentsState.update((items) => items.map((item) => item.id === assessmentId ? { ...item, status: 'Graded' } : item));
  }

  generateReport(studentId: string, term: string, status: ReportStatus): ReportCard {
    const student = STUDENTS.find((item) => item.id === studentId)!;
    const results = this.assessments().filter((assessment) => assessment.className === student.className && assessment.status === 'Graded').map((assessment) => {
      const entry = this.scores().find((score) => score.assessmentId === assessment.id && score.studentId === studentId);
      const average = entry?.score === null || entry?.score === undefined ? 0 : Math.round(entry.score / assessment.maxScore * 100);
      return { subject: assessment.subject, average, grade: this.letterGrade(average) };
    });
    const average = results.length ? Math.round(results.reduce((total, item) => total + item.average, 0) / results.length) : 0;
    const report: ReportCard = { id: this.nextId(this.reports()), studentId, studentName: student.name, className: student.className, term, average, grade: this.letterGrade(average), status, generatedAt: '2026-09-25', results };
    this.reportsState.update((items) => [report, ...items]); return report;
  }

  letterGrade(score: number): string { if (score >= 80) return 'A'; if (score >= 70) return 'B'; if (score >= 60) return 'C'; if (score >= 50) return 'D'; return 'F'; }
  private nextId(items: readonly { readonly id: string }[]): string { return String(Math.max(0, ...items.map((item) => Number(item.id))) + 1); }
}
