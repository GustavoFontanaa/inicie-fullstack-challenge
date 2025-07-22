import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('password_confirmation')?.value;
    return password === passwordConfirmation ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-first-access',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './first-access.component.html',
})
export class FirstAccessComponent implements OnInit {
  public form!: FormGroup;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    }, { validators: passwordsMatchValidator() });

    this.route.queryParams
      .subscribe(params => {
        if (params['email']) {
          this.form.get('email')?.setValue(params['email']);
        }
      });
  }

  public submit(): void {
    if (this.form.invalid) return;

    const payload = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      password_confirmation: this.form.get('password_confirmation')?.value,
    };

    this.authService.firstAccess(payload)
      .subscribe({
        next: (res) => {
          this.successMessage = res.message || 'Senha redefinida com sucesso.';
          this.errorMessage = null;

          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erro ao redefinir a senha.';
          this.successMessage = null;
        }
      });
  }
}
