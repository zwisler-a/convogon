import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, switchMap, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AccountService {
  private reload$ = new BehaviorSubject(void 0);
  private account$ = this.reload$.pipe(
    switchMap(account => this.http.get<any[]>('/api/user/list'))
  )

  constructor(private http: HttpClient) {
  }

  toggleShouldPay(account: any) {
    return this.http.post<any[]>('/api/user/payment', {shouldPay: !account.shouldPay, userId: account.id}).pipe(
      tap(res => this.reload$.next(void 0))
    );
  }

  togglePayed(account: any) {
    return this.http.post<any[]>('/api/user/payment', {payed: !account.payed, userId: account.id}).pipe(
      tap(res => this.reload$.next(void 0))
    );
  }

  getAccounts() {
    return this.account$.pipe();
  }

  getAccount(id: string) {
    return this.http.get<any[]>('/api/user/' + id);
  }

}
