import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/service/student.service';
import { StudentRequestDTO } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-edit.component.html'
})
export class StudentEditComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  loading = true;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.studentService.getStudent(this.id).subscribe({
      next: student => {
        this.form.patchValue(student);
        this.loading = false;
      },
      error: err => { // En cas d'erreur (ex: étudiant non trouvé), rediriger vers la liste
        console.error('Error loading student:', err);
        this.router.navigate(['/students']);
        return [];
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      console.error('Formulaire invalide');
      this.router.navigate(['/students']);
      return;
    }

    this.saving = true;
    const dto: StudentRequestDTO = this.form.value;

    this.studentService.updateStudent(this.id, dto).subscribe({
      next: () => this.router.navigate(['/students', this.id]),
      error: () => this.saving = false
    });
  }
}
