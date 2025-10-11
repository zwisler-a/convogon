import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PersonaService} from '../../service/persona.service';
import {AccountService} from '../account.service';
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
    MatIconModule
  ],
  templateUrl: './account-view.html',
  styleUrl: './account-view.css'
})
export class AccountView {
  account!: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'actions'];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private accountService: AccountService) {
    this.activatedRoute.params.subscribe(params => {
      const id = this.activatedRoute.snapshot.params['id'];
      this.accountService.getAccount(id).subscribe(persona => this.account = persona);
    })
  }

  protected readonly ROUTES = ROUTES;
}
