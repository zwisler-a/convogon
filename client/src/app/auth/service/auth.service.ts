import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
  }

  login(email: string) {
    return this.http.post('/api/auth/login', {
      email: email,
    });
  }

  register(email: string) {
    return this.http.post('/api/auth/register', {
      email: email,
    });
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

  getToken() {
    return this.token;
  }
}
