import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-header', imports: [RouterLink], templateUrl: './header.component.html', styleUrls: ['./header.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() readonly menuClick = new EventEmitter<void>();
  constructor(private readonly authService: AuthService, private readonly router: Router) {}
  signOut(): void { this.authService.signOut(); void this.router.navigate(['/login']); }
}
