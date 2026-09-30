import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StudentScore } from '../../models/grade.model';
import { GradeService } from '../../services/grade.service';

@Component({ selector: 'app-gradebook', imports: [FormsModule], templateUrl: './gradebook.component.html', styleUrls: ['./gradebook.component.scss', '../../grades.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class GradebookComponent {
  readonly selectedAssessmentId = signal(this.gradeService.assessments()[0]?.id ?? '');
  readonly draftScores = signal<readonly StudentScore[]>(this.gradeService.scoresFor(this.selectedAssessmentId()).map((item) => ({ ...item })));
  readonly selectedAssessment = computed(() => this.gradeService.assessments().find((item) => item.id === this.selectedAssessmentId()));
  readonly entered = computed(() => this.draftScores().filter((item) => item.score !== null));
  readonly average = computed(() => { const assessment = this.selectedAssessment(); return assessment && this.entered().length ? Math.round(this.entered().reduce((total, item) => total + item.score!, 0) / this.entered().length / assessment.maxScore * 100) : 0; });
  readonly saved = signal(false);

  constructor(readonly gradeService: GradeService) {}
  changeAssessment(id: string): void { this.selectedAssessmentId.set(id); this.draftScores.set(this.gradeService.scoresFor(id).map((item) => ({ ...item }))); this.saved.set(false); }
  updateScore(id: string, value: string | number | null): void { const max = this.selectedAssessment()?.maxScore ?? 100; const parsed = value === '' || value === null ? null : Math.max(0, Math.min(max, Number(value))); this.draftScores.update((items) => items.map((item) => item.id === id ? { ...item, score: parsed } : item)); this.saved.set(false); }
  updateFeedback(id: string, feedback: string): void { this.draftScores.update((items) => items.map((item) => item.id === id ? { ...item, feedback } : item)); this.saved.set(false); }
  save(): void { this.gradeService.saveScores(this.selectedAssessmentId(), this.draftScores()); this.saved.set(true); }
  percentage(score: number | null): number | null { const assessment = this.selectedAssessment(); return score === null || !assessment ? null : Math.round(score / assessment.maxScore * 100); }
}
