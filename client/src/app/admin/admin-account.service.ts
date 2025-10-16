import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AccountService } from '../../api';
import { Confirm } from '../core/confirm/confirm';
import { ConfirmDialogService } from '../core/confirm/confirm.service';

@Injectable({ providedIn: 'root' })
export class AdminAccountService {
  private reload$ = new BehaviorSubject(void 0);
  private account$ = this.reload$.pipe(
    switchMap(() => this.accountService.getAllAccounts())
  );

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private confirm: ConfirmDialogService
  ) {}

  toggleShouldPay(account: any) {
    return this.accountService
      .updateAccountStatus({
        shouldPay: !account.shouldPay,
        userId: account.id,
      })
      .pipe(tap((res) => this.reload$.next(void 0)));
  }

  togglePayed(account: any) {
    return this.confirm.confirm('Confirm').pipe(
      switchMap((confirmed) => {
        if (confirmed) {
          return this.accountService
            .updateAccountStatus({ payed: true, userId: account.id })
            .pipe(tap((res) => this.reload$.next(void 0)));
        } else {
          throw new Error('Not confirmed');
        }
      })
    );
  }

  getAccounts() {
    return this.account$.pipe();
  }

  getAccount(id: string) {
    return this.accountService.getAccountById(id).pipe();
  }
}
