import {Component, inject} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {PersonaStoreService} from '../../service/persona-store.service';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {ConfirmDialogService} from '../../core/confirm/confirm.service';
import {SiteHeader} from '../../shared/site-header/site-header';
import {MatTooltip} from '@angular/material/tooltip';
import {Loading} from '../../shared/loading/loading';
import {ROUTES} from '../../app.routes';

@Component({
  selector: 'app-home',
  imports: [
    SiteHeader,
    MatButton,
    RouterLink,
    AsyncPipe,
    MatIconModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatIconButton,
    MatCardSubtitle,
    MatTooltip,
    Loading
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {


  private personaService: PersonaStoreService = inject(PersonaStoreService);
  private confirmService: ConfirmDialogService = inject(ConfirmDialogService);

  personas$ = this.personaService.getPersonas();

  delete(id: string) {
    this.confirmService.confirm('Person löschen', 'Möchtest du diese:n Spieler:in wirklich löschen?').subscribe((confirm) => {
      if (confirm) {
        this.personaService.delete(id).subscribe(() => {
          this.personas$ = this.personaService.getPersonas();
        });
      }
    });
  }

  protected readonly ROUTES = ROUTES;
}
