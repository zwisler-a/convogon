import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PersonaService} from '../../service/persona.service';
import {AdminAccountService} from '../admin-account.service';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {ROUTES} from '../../app.routes';
import {MatIconModule} from '@angular/material/icon';
import {MatChip} from '@angular/material/chips';

@Component({
  selector: 'app-account-view',
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
    MatHeaderCellDef,
    RouterLink,
    MatIconModule,
    MatChip
  ],
  templateUrl: './account-view.html',
  styleUrl: './account-view.css'
})
export class AccountView {
  account!: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'paid','actions'];
  id!: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private accountService: AdminAccountService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.accountService.getAccount(this.id).subscribe(persona => this.account = persona);
    })
  }


  shouldPay(account: any) {
    this.accountService.toggleShouldPay(account).subscribe(data => {
      this.accountService.getAccount(this.id).subscribe(persona => this.account = persona);
    });
  }

  payed(account: any) {
    this.accountService.togglePayed(account).subscribe(data => {
      this.accountService.getAccount(this.id).subscribe(persona => this.account = persona);
    });
  }

  protected readonly ROUTES = ROUTES;
}
