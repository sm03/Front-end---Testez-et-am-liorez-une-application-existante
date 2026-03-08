import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
  title = 'etudiant-frontend';
}
