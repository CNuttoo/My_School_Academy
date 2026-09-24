
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../core/models/navigation-item.model';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
    selector: 'app-sidebar', imports: [RouterLink, RouterLinkActive], templateUrl: './sidebar.component.html', styleUrls: ['./sidebar.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input() open = false;
  @Output() readonly navigate = new EventEmitter<void>();
  readonly items: readonly NavigationItem[];
  constructor(navigationService: NavigationService) { this.items = navigationService.items; }
}
