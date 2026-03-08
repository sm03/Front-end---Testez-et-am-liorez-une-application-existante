import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet, 
    RouterLink,
    RouterLinkActive
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  title = 'etudiant-frontend';

  logout() {
    this.authService.logout();
  }
}
