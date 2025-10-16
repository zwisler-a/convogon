import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Confirm} from './confirm';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {
  }

  confirm(message: string, p0?: string): Observable<boolean> {
    const dialogRef: MatDialogRef<Confirm> = this.dialog.open(Confirm, {
      width: '300px',
      data: {message}
    });
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed().pipe(map(result => !!result));
  }
}
