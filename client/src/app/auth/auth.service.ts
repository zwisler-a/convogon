import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService as ApiAuthService} from '../../api/services/auth.service';
import {RegisterDto} from '../../api';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router, private authService: ApiAuthService) {
    this.token = localStorage.getItem('token');
  }

  getUserInfo() {
    if (!this.token) return {}
    const body = this.token.split('.')[1]
    return JSON.parse(atob(body));
  }

  login(email: string) {
    return this.http.post('/api/auth/login', {
      email: email,
    });
  }

  register(account: RegisterDto) {
    return this.authService.register(account);
  }

  isLoggedIn() {
    if (!this.token) {
      this.token = this.getQueryParams()['token'];
      if (this.token) {
        window.history.replaceState({}, document.title, window.location.pathname);
        localStorage.setItem('token', this.token);
        return true;
      }
    }
    return !!this.token;
  }

  getQueryParams(): Record<string, string> {
    const url = new URL(window.location.href);
    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => params[key] = value);
    return params;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAdmin() {
    if (!this.token) {
      return false;
    }
    return this.getUserInfo().role === 'admin';
  }

  getToken() {
    return this.token;
  }
}
