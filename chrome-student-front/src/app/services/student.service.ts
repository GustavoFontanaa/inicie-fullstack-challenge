import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly api: string = 'http://localhost:8000/api/students';

  constructor(private readonly http: HttpClient) { }

  public getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.api);
  }

  public getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.api}/${id}`);
  }

  public create(data: Student): Observable<Student> {
    return this.http.post<Student>(this.api, data);
  }

  public update(id: number, data: Student): Observable<Student> {
    return this.http.put<Student>(`${this.api}/${id}`, data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
