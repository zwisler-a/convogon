import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    MatButtonModule,
    RouterLink,
    MatToolbar,
    MatMenuModule,
    MatIconModule
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
