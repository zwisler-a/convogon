import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {ROUTES} from '../../app.routes';
import {AdminAccountService} from '../admin-account.service';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {BehaviorSubject, combineLatestWith, map, tap, withLatestFrom, zip, zipWith} from 'rxjs';

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
  ],
  templateUrl: './accounts-view.html',
  styleUrl: './accounts-view.css'
})
export class AccountsView {

  displayedColumns: string[] = ['mail', 'shouldPay', 'payed', 'actions'];
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


  constructor(private accountService: AdminAccountService) {
    this.users$ = this.accountService.getAccounts();
    this.filteredUsers$ = this.users$.pipe(
      combineLatestWith(this.searchQuery$),
      map(([users, searchQuery]) => users.filter(user => JSON.stringify(user).includes(searchQuery))),
      tap(console.log)
    );
  }

  protected readonly ROUTES = ROUTES;

  shouldPay(account: any) {
    this.accountService.toggleShouldPay(account).subscribe(data => {

    });
  }

  payed(account: any) {
    this.accountService.togglePayed(account).subscribe(data => {

    });
  }
}
