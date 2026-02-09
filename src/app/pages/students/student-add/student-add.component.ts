import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/service/student.service';
import { StudentRequestDTO } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-add.component.html'
})
export class StudentAddComponent {

  studentForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  submit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const dto: StudentRequestDTO = this.studentForm.value;

    this.studentService.createStudent(dto).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: err => {
        this.errorMessage = 'Erreur lors de la création';
        this.loading = false;
      }
    });
  }
}
