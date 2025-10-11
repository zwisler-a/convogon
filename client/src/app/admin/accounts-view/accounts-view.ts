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

  constructor(private http: HttpClient) {
    this.users$ = this.http.get<any[]>('/api/user/list');
  }

  protected readonly ROUTES = ROUTES;

  shouldPay(account: any) {
    this.http.post<any[]>('/api/user/payment', {shouldPay: !account.shouldPay, userId: account.id}).subscribe(data => {
      this.users$ = this.http.get<any[]>('/api/user/list');
    });
  }

  payed(account: any) {
    this.http.post<any[]>('/api/user/payment', {payed: !account.payed, userId: account.id}).subscribe(data => {
      this.users$ = this.http.get<any[]>('/api/user/list');
    });
  }
}
