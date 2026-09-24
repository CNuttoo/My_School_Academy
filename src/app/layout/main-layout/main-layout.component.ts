
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-main-layout', imports: [RouterOutlet, SidebarComponent, HeaderComponent, BreadcrumbComponent], templateUrl: './main-layout.component.html', styleUrls: ['./main-layout.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  sidebarOpen = false;
  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar(): void { this.sidebarOpen = false; }
}
