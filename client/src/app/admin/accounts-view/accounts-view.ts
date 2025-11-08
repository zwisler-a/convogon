import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule,
} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {ROUTES} from '../../app.routes';
import {AccountStoreService} from '../account-store.service';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {BehaviorSubject, combineLatestWith, map, tap,} from 'rxjs';
import {NavigateBack} from '../../shared/navigate-back';

@Component({
  selector: 'app-accounts-view',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableModule,
    RouterLink,
    MatIconModule,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatHint,
    NavigateBack,
  ],
  templateUrl: './accounts-view.html',
  styleUrl: './accounts-view.css',
})
export class AccountsView {
  displayedColumns: string[] = ['mail', 'payed', 'playerCount'];
  users$;
  searchQuery$ = new BehaviorSubject('');
  filteredUsers$;

  _searchQuery: string = '';
  set searchQuery(searchQuery: string) {
    this._searchQuery = searchQuery;
    this.searchQuery$.next(searchQuery);
  }

  get searchQuery() {
    return this._searchQuery;
  }

  constructor(private accountService: AccountStoreService) {
    this.users$ = this.accountService.getAccounts();
    this.filteredUsers$ = this.users$.pipe(
      combineLatestWith(this.searchQuery$),
      map(([users, searchQuery]) =>
        users.filter((user) => JSON.stringify(user).includes(searchQuery))
      ),
      tap(console.log)
    );
  }

  protected readonly ROUTES = ROUTES;

  payed(account: any) {
    this.accountService.togglePayed(account).subscribe((data) => {});
  }

  getPaymentStatus(account: any) {
    if (!account.personas.length) return 'N/A';
    if (account.personas.some((p: any) => !p.paid)) return 'ausstehend';
    return 'eingegangen';
  }

  getPlayerCount(account: any): number {
    return account.personas ? account.personas.length : 0;
  }
}
