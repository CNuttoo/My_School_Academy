import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SettingsService } from '../../services/settings.service';

@Component({ selector: 'app-settings-overview', imports: [RouterLink], templateUrl: './settings-overview.component.html', styleUrls: ['./settings-overview.component.scss', '../../settings.shared.scss'], changeDetection: ChangeDetectionStrategy.OnPush })
export class SettingsOverviewComponent {
  readonly activeUsers = computed(() => this.settingsService.users().filter((item) => item.status === 'Active').length);
  readonly administrators = computed(() => this.settingsService.users().filter((item) => this.settingsService.roleName(item.roleId) === 'Administrator').length);
  constructor(readonly settingsService: SettingsService) {}
}
