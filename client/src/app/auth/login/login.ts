import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ROUTES} from '../../app.routes';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form: FormGroup;

  isMailSend = false;
  disableLogin = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.disableLogin = true;
    this.authService.login(this.form.get('email')?.value).subscribe({
      next: (res: any) => {
        this.router.navigate(['/' + ROUTES.LOGIN_SEND]);
      },
      error: (res: any) => {
        this.snackBar.open("Es existiert kein Benutzer mit dieser E-Mail Adresse", 'error');
        this.disableLogin = false;
      },
      complete: () => this.disableLogin = false
    })
  }

  protected readonly ROUTES = ROUTES;
}
