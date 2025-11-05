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
    MatCheckbox,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form: FormGroup;

  disableRegister = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      data: [false, [Validators.required, (control: FormControl) => control.value]],
      coc: [false, [Validators.required, (control: FormControl) => control.value]],
    });
  }

  register(ev: any) {
    ev.preventDefault();
    this.disableRegister = true;
    this.authService.register(this.form.get('email')?.value).subscribe((res: any) => {
      this.snackBar.open("Account wurde registriert", 'OK', {})
      this.router.navigate(['/' + ROUTES.LOGIN_SEND]);
    }, (err) => this.disableRegister = false, () => this.disableRegister = false);
  }

  protected readonly ROUTES = ROUTES;
}
