import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {ROUTES} from '../../app.routes';

@Component({
  selector: 'app-login-send',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    ReactiveFormsModule,
    MatButton,
    MatCardActions,
    RouterLink
  ],
  templateUrl: './login-send.html',
  styleUrl: './login-send.css'
})
export class LoginSend {

  protected readonly ROUTES = ROUTES;
}
