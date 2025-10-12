import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, switchMap, tap} from 'rxjs';
import {AccountService} from '../../api';

@Injectable({providedIn: 'root'})
export class AdminAccountService {
  private reload$ = new BehaviorSubject(void 0);
  private account$ = this.reload$.pipe(
    switchMap(() => this.accountService.getAllAccounts())
  )

  constructor(private http: HttpClient, private accountService: AccountService) {
  }

  toggleShouldPay(account: any) {
    return this.accountService.updateAccountStatus({shouldPay: !account.shouldPay, userId: account.id}).pipe(
      tap(res => this.reload$.next(void 0))
    );
  }

  togglePayed(account: any) {
    return this.accountService.updateAccountStatus({payed: !account.payed, userId: account.id}).pipe(
      tap(res => this.reload$.next(void 0))
    );
  }

  getAccounts() {
    return this.account$.pipe();
  }

  getAccount(id: string) {
    return this.accountService.getAccountById(id).pipe();
  }

}
