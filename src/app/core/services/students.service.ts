import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/Student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private apiUrl = 'http://localhost:3000/api/students';
  constructor(private http: HttpClient) {}

  list(): Observable<Student[]> {
    return this.http.get(`${this.apiUrl}/all`) as Observable<Student[]>;
  }

  find(id: number): Observable<Student> {
    return this.http.get(`${this.apiUrl}/${id}`) as Observable<Student>;
  }
}
