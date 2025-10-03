import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
  }

  login(email: string, password: string) {
    return this.http.post('/api/auth/login', {
      email: email,
      password: password,
    }).subscribe((res: any) => {
      this.token = res.token;
      localStorage.setItem("token", res.token);
      this.router.navigate(['/'])
    })
  }

  register(email: string, password: string) {
    this.http.post('/api/auth/register', {
      email: email,
      password: password,
    }).subscribe((res: any) => {
      if (res.id) {
        this.router.navigate(['/login'])
      }
    })
  }

  isLoggedIn() {
    return !!this.token;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
