export type AssessmentType = 'Quiz' | 'Assignment' | 'Midterm' | 'Final' | 'Project';
export type AssessmentStatus = 'Draft' | 'Open' | 'Graded';
export type ReportStatus = 'Draft' | 'Published';

export interface Assessment {
  readonly id: string;
  readonly title: string;
  readonly subject: string;
  readonly className: string;
  readonly type: AssessmentType;
  readonly maxScore: number;
  readonly weight: number;
  readonly dueDate: string;
  readonly status: AssessmentStatus;
}

export interface StudentScore {
  readonly id: string;
  readonly assessmentId: string;
  readonly studentId: string;
  readonly studentName: string;
  readonly score: number | null;
  readonly feedback: string;
}

export interface SubjectResult { readonly subject: string; readonly average: number; readonly grade: string; }

export interface ReportCard {
  readonly id: string;
  readonly studentId: string;
  readonly studentName: string;
  readonly className: string;
  readonly term: string;
  readonly average: number;
  readonly grade: string;
  readonly status: ReportStatus;
  readonly generatedAt: string;
  readonly results: readonly SubjectResult[];
}

export type AssessmentDraft = Omit<Assessment, 'id'>;
