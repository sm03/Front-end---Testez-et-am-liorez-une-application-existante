import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/service/student.service';
import { StudentResponseDTO } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-delete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-delete.component.html'
})
export class StudentDeleteComponent implements OnInit {

  student?: StudentResponseDTO;
  id!: number;
  loading = true;
  deleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getStudent(this.id).subscribe({
      next: s => {
        this.student = s;
        this.loading = false;
      }
    });
  }

  confirmDelete() {
    this.deleting = true;

    this.studentService.deleteStudent(this.id).subscribe({
      next: () => this.router.navigate(['/students']),
      error: () => this.deleting = false
    });
  }
}
