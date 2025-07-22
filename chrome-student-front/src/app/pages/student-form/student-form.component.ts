import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent implements OnInit {
  form!: FormGroup;
  editing: boolean = false;
  studentId: number | null = null;

  public constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.route.paramMap
      .subscribe(params => {
        const idParam = params.get('id');

        if (idParam) {
          this.editing = true;
          this.studentId = + idParam;
          this.loadStudent(this.studentId);
        }
      });
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.editing && this.studentId !== null) {
      this.studentService.update(this.studentId, data).subscribe(() => this.router.navigate(['/students']));
    } else {
      this.studentService.create(data).subscribe(() => this.router.navigate(['/students']));
    }
  }

  public onCancel(): void {
    this.router.navigate(['/students']);
  }

  private loadStudent(id: number): void {
    this.studentService
      .getById(id)
      .subscribe((student: { name: string; email: string }) => {
        this.form.patchValue(student);
      });
  }
}
