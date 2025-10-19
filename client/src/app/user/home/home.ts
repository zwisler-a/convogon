import {Component} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {PersonaService} from '../../service/persona.service';
import {MatList, MatListItem} from '@angular/material/list';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {ConfirmDialogService} from '../../core/confirm/confirm.service';
import { SiteHeader } from '../../shared/site-header/site-header';

@Component({
  selector: 'app-home',
  imports: [
    SiteHeader,
    MatButton,
    RouterLink,
    MatList,
    AsyncPipe,
    MatListItem,
    MatIconModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatCardSubtitle
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  personas$;

  constructor(private personaService: PersonaService, private confirmService: ConfirmDialogService) {
    this.personas$ = this.personaService.getPersonas();
  }

  delete(id: string) {
    this.confirmService.confirm('').subscribe((confirm) => {
      if (confirm) {
        this.personaService.delete(id).subscribe(() => {
          this.personas$ = this.personaService.getPersonas();
        });
      }
    })
  }
}
