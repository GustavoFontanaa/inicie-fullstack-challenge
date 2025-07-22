import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  public readonly user = JSON.parse(localStorage.getItem('user') || '{}');

  public logout(): void {
    this.authService
      .logout()
      .subscribe({ next: () => this.router.navigate(['/login']) });
  }
}
