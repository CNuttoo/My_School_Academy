import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({ selector: 'app-grades-shell', imports: [RouterLink, RouterLinkActive, RouterOutlet], templateUrl: './grades-shell.component.html', styleUrls: ['./grades-shell.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class GradesShellComponent { readonly sections = [{ label: 'Overview', route: '/grades', exact: true }, { label: 'Gradebook', route: '/grades/gradebook', exact: false }, { label: 'Assessments', route: '/grades/assessments', exact: false }, { label: 'Report cards', route: '/grades/report-cards', exact: false }]; }
