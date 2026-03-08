import {AfterViewInit, Component, DestroyRef, inject, ViewChild} from '@angular/core';
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
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {ROUTES} from '../../app.routes';
import {AccountStoreService} from '../account-store.service';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {BehaviorSubject, combineLatestWith, map,} from 'rxjs';
import {NavigateBack} from '../../shared/navigate-back';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
    MatSortModule,
  ],
  templateUrl: './accounts-view.html',
  styleUrl: './accounts-view.css',
})
export class AccountsView implements AfterViewInit {
  displayedColumns: string[] = ['mail', 'payed', 'playerCount'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;

  private destroyRef = inject(DestroyRef);
  private searchQuery$ = new BehaviorSubject('');

  _searchQuery: string = '';
  set searchQuery(searchQuery: string) {
    this._searchQuery = searchQuery;
    this.searchQuery$.next(searchQuery);
  }

  get searchQuery() {
    return this._searchQuery;
  }

  constructor(private accountService: AccountStoreService) {
    this.accountService.getAccounts().pipe(
      combineLatestWith(this.searchQuery$),
      map(([users, searchQuery]) =>
        users.filter((user) => JSON.stringify(user).includes(searchQuery))
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(users => {
      this.dataSource.data = users;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'mail': return item.email ?? '';
        case 'payed': return this.getPaymentStatus(item);
        case 'playerCount': return this.getPlayerCount(item);
        default: return item[property] ?? '';
      }
    };
    this.dataSource.sort = this.sort;
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
