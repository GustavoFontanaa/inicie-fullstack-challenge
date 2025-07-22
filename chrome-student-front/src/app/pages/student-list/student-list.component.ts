import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  public students: any[] = [];
  public currentUserId!: number;

  public constructor(
    private studentService: StudentService,
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.loadStudents();
  }

  public deleteStudent(id: number): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.studentService.delete(id).subscribe(() => this.loadStudents());
    }
  }

  public editStudent(id: number): void {
    this.router.navigate(['/students', id, 'edit']);
  }

  private loadStudents(): void {
    this.studentService
      .getAll()
      .subscribe((res: any) => {
        this.students = res;
      });
  }
}
