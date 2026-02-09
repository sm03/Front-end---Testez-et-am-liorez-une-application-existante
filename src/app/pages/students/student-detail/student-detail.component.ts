import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/service/student.service';
import { StudentResponseDTO } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-detail.component.html'
})
export class StudentDetailComponent implements OnInit {

  student?: StudentResponseDTO;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getStudent(id).subscribe({
      next: s => {
        this.student = s;
        this.loading = false;
      },
      error: err => { // En cas d'erreur (ex: étudiant non trouvé), rediriger vers la liste
        console.error('Error loading student:', err);
        this.loading = false
        this.router.navigate(['/students']);
        return [];
      }
    });
  }
}
