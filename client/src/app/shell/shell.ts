import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    MatButton,
    RouterLink
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.css'
})
export class Shell {
  mail!: string;
  isAdmin = false;
  constructor(private authService: AuthService) {
    this.mail = authService.getUserInfo().email;
    this.isAdmin = authService.isAdmin();
  }
  logout() {
    this.authService.logout()
  }
}
