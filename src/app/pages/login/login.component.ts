import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { UserService } from '../../core/service/user.service';
import { Login } from '../../core/models/login';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    MaterialModule
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(private router: Router,
    private authService: AuthService
  ) {} // Injection du Router pour la navigation
  // et du AuthService pour gérer l'authentification

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        login: ['', Validators.required],
        password: ['', Validators.required]
      },
    );
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginUser: Login = {
      login: this.loginForm.get('login')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.userService.login(loginUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      (x) => {
        console.log('Login successful:', x);
        const responseBody = JSON.parse(JSON.stringify(x));
        console.log('Parsed response body:', responseBody);

        if(responseBody.access_token === undefined) {
          console.error('Login failed: No access token in response');
          this.authService.logout(); // Nettoyage de session éventuellement périmée
          this.router.navigate(['/login']);
          return;
        }

        // Sauvegarde du token dans le service d'authentification
        this.authService.saveToken(responseBody.access_token); 
        this.router.navigate(['/students']);
      },
    );
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}