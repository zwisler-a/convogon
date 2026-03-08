import {AfterViewInit, Component, DestroyRef, inject, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {ROUTES} from '../../app.routes';
import {MatIconModule} from '@angular/material/icon';
import {AccountStoreService} from '../account-store.service';
import {map, take} from 'rxjs';
import {RouterLink} from '@angular/router';
import {PersonaDto} from '../../../api';
import {NavigateBack} from '../../shared/navigate-back';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-personas-view',
  imports: [
    FormsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconModule,
    MatRow,
    MatRowDef,
    MatTableModule,
    RouterLink,
    NavigateBack,
    MatSortModule,
  ],
  templateUrl: './personas-view.html',
  styleUrl: './personas-view.css'
})
export class PersonasView implements AfterViewInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'type', 'payed'];
  protected readonly ROUTES = ROUTES;
  dataSource = new MatTableDataSource<PersonaDto>([]);

  @ViewChild(MatSort) sort!: MatSort;

  private adminAccountService: AccountStoreService = inject(AccountStoreService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.adminAccountService.getAccounts().pipe(
      map(accounts => accounts.flatMap(account => account.personas as any as PersonaDto[])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(personas => {
      this.dataSource.data = personas;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'payed':
          return (item as any).payed ? 1 : 0;
        default:
          return (item as any)[property] ?? '';
      }
    };
    this.dataSource.sort = this.sort;
  }

  csvDownload() {
    const personas = this.dataSource.data;
    const fields: (keyof PersonaDto)[] = [
      'id',
      'userId',
      'type',
      'firstName',
      'lastName',
      'address',
      'mobileNumber',
      'diet',
      'dietOther',
      'arrival',
      'travellingWithGroup',
      'groupName',
      'departure',
      'support',
      'supportOther',
      'accommodation',
      'characterName',
      'characterClass',
      'skills',
      'fighter',
      'importantInfoForGM',
      'mostImportantForCharacter',
      'infoAboutFriends',
      'storyLore',
      'interests',
      'birthday',
      'other',
      'kidCharacterInfo'
    ];

    const header = fields as string[];

    const toCell = (val: unknown) => {
      if (val === null || val === undefined) return '';
      if (Array.isArray(val)) return val.map(v => (v == null ? '' : String(v))).join('; ');
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
    };

    const escape = (val: unknown) => {
      const s = toCell(val);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };

    const rows = personas.map(p => fields.map(f => escape((p as any)[f])));

    const csv = [header, ...rows]
      .map(r => r.join(','))
      .join('\n');

    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personas_${new Date().toISOString().slice(0, 10)}.csv`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
