import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GradeService } from '../../services/grade.service';

@Component({ selector: 'app-grades-overview', imports: [RouterLink], templateUrl: './grades-overview.component.html', styleUrls: ['./grades-overview.component.scss', '../../grades.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class GradesOverviewComponent {
  readonly graded = computed(() => this.gradeService.assessments().filter((item) => item.status === 'Graded'));
  readonly open = computed(() => this.gradeService.assessments().filter((item) => item.status === 'Open').length);
  readonly enteredScores = computed(() => this.gradeService.scores().filter((item) => item.score !== null));
  readonly overallAverage = computed(() => { const percentages = this.enteredScores().map((score) => { const assessment = this.gradeService.assessments().find((item) => item.id === score.assessmentId)!; return score.score! / assessment.maxScore * 100; }); return percentages.length ? Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length) : 0; });
  readonly recent = computed(() => this.gradeService.assessments().slice(0, 4));
  constructor(readonly gradeService: GradeService) {}
}
