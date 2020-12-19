import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/core/model/Student';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  students: Student[] = [];

  constructor(private service: StudentsService, private router: Router) {
    this.service.list().subscribe((results) => {
      this.students = results;
    });
  }

  navigate(student: Student): void {
    this.router.navigate([student.id]);
  }
}
