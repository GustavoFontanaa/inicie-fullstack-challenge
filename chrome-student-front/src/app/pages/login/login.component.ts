import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  protected readonly form: FormGroup;
  protected errorMessage: string | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/students']);
    }
  }

  protected submit(): void {
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/students']);
      },
      error: (err) => {
        if (err.status === 403 && err.error.first_access) {
          this.router.navigate(['/first-access'], { queryParams: { email: this.form.value.email } });
        } else {
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        }
      },
    });
  }

}
