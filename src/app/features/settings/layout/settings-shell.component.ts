import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({ selector: 'app-settings-shell', imports: [RouterLink, RouterLinkActive, RouterOutlet], templateUrl: './settings-shell.component.html', styleUrls: ['./settings-shell.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class SettingsShellComponent { readonly sections = [{ label: 'Overview', route: '/settings', exact: true }, { label: 'School profile', route: '/settings/school', exact: false }, { label: 'Users', route: '/settings/users', exact: false }, { label: 'Roles & permissions', route: '/settings/roles', exact: false }]; }
