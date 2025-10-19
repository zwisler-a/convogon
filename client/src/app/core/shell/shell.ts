import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {HttpClient} from '@angular/common/http';
import {interval, startWith, switchMap} from 'rxjs';
import {AccountService} from '../../../api';
import {ROUTES} from '../../app.routes';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    MatButtonModule,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    MatDivider,
    Footer
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.css'
})
export class Shell {
  mail!: string;
  isAdmin = false;
  showPaymentMissing = false;
  showPaymentReceived = false;

  constructor(private authService: AuthService, private accountService: AccountService) {
    this.mail = authService.getUserInfo().email;
    this.isAdmin = authService.isAdmin();
    interval(10000).pipe(
      startWith(''),
      switchMap(() => this.accountService.getAccountStatus())
    ).subscribe((res: any) => {
      this.showPaymentMissing = res.shouldPay && !res.payed;
      this.showPaymentReceived = res.shouldPay && res.payed;
    });

  }

  logout() {
    this.authService.logout()
  }

  protected readonly ROUTES = ROUTES;
}
