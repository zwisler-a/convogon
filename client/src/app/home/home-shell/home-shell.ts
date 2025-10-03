import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from '../../auth/service/auth.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home-shell',
  imports: [
    RouterOutlet,
    MatButton
  ],
  templateUrl: './home-shell.html',
  styleUrl: './home-shell.css'
})
export class HomeShell {
  constructor(private authService: AuthService) { }
  logout() {
    this.authService.logout()
  }
}
