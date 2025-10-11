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
import {AccountService} from '../account.service';

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
  ],
  templateUrl: './accounts-view.html',
  styleUrl: './accounts-view.css'
})
export class AccountsView {

  displayedColumns: string[] = ['mail', 'shouldPay', 'payed', 'actions'];
  users$;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.users$ = this.accountService.getAccounts();
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
