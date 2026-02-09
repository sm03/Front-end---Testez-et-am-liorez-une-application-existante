import { Component, OnInit } from '@angular/core';
import { StudentResponseDTO } from '../../../core/models/student.model';
import { StudentService } from '../../../core/service/student.service';

@Component({
  selector: 'app-student-list.component',
  imports: [],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  students: StudentResponseDTO[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe({
      next: data => this.students = data
    });
  }

}
