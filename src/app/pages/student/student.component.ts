import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Student } from 'src/app/core/model/Student';
import { StudentsService } from 'src/app/core/services/students.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  student: Student | undefined;

  constructor(private route: ActivatedRoute, private service: StudentsService) {
    this.route.params
      .pipe(
        switchMap((params) => {
          const studentId = params.studentId;
          return this.service.find(studentId);
        })
      )
      .subscribe((result) => {
        this.student = result;
      });
  }

  ngOnInit(): void {}
}
