import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatInput, MatLabel} from "@angular/material/input";
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router, RouterLink} from '@angular/router';
import {ROUTES} from '../../app.routes';
import {MatFormField} from '@angular/material/form-field';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSlideToggle,
    MatCheckbox,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form: FormGroup;

  isMailSend = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      data: [false, [Validators.required, (control:FormControl) => control.value]],
      coc: [false, [Validators.required, (control:FormControl) => control.value]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.authService.login(this.form.get('email')?.value).subscribe({
      next: (res: any) => {
        this.router.navigate(['/' + ROUTES.LOGIN_SEND]);
      },
      error: (res: any) => {
        this.snackBar.open("Es existiert kein Benutzer mit dieser E-Mail Adresse", 'error');
      }
    })
  }

  register(ev: any) {
    ev.preventDefault();
    this.authService.register(this.form.get('email')?.value).subscribe((res: any) => {
      this.snackBar.open("Account wurde registriert", 'OK', {})
      this.router.navigate(['/' + ROUTES.LOGIN_SEND]);
    })
  }

  protected readonly ROUTES = ROUTES;
}
