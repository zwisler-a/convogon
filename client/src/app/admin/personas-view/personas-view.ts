import {Component, inject} from '@angular/core';
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
  MatTableModule
} from "@angular/material/table";
import {ROUTES} from '../../app.routes';
import {MatIconModule} from '@angular/material/icon';
import {AdminAccountService} from '../admin-account.service';
import {map, Observable, take} from 'rxjs';
import {RouterLink} from '@angular/router';
import {PersonaDto} from '../../../api';

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
    RouterLink
  ],
  templateUrl: './personas-view.html',
  styleUrl: './personas-view.css'
})
export class PersonasView {

  displayedColumns: string[] = ['firstName', 'lastName', 'type', 'payed'];
  protected readonly ROUTES = ROUTES;

  private adminAccountService: AdminAccountService = inject(AdminAccountService);
  personas$: Observable<PersonaDto[]> = this.adminAccountService.getAccounts().pipe(
    map(accounts => accounts.flatMap(account => account.personas as any as PersonaDto[]))
  );

  csvDownload() {
    this.personas$.pipe(take(1)).subscribe(personas => {
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
    });
  }
}
