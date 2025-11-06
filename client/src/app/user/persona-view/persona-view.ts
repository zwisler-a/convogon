import {Component, inject} from '@angular/core';
import {PersonaStoreService} from '../../service/persona-store.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {PersonaOverview} from '../../shared/persona-overview/persona-overview';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {Persona, PersonaDto} from '../../../api';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged, switchMap, shareReplay } from 'rxjs/operators';
import {Loading} from '../../shared/loading/loading';
import {AsyncPipe} from '@angular/common';
import {ROUTES} from '../../app.routes';

@Component({
  selector: 'app-add-persona-view',
  imports: [
    MatButton,
    RouterLink,
    PersonaOverview,
    MatCard,
    MatCardContent,
    MatIconModule,
    Loading,
    AsyncPipe
  ],
  templateUrl: './persona-view.html',
  styleUrl: './persona-view.css'
})
export class PersonaView {

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly personaService = inject(PersonaStoreService);

  readonly persona$: Observable<PersonaDto> = this.route.paramMap.pipe(
    map(params => params.get('id')!),
    distinctUntilChanged(),
    switchMap(id => this.personaService.getPersona(id)),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  protected readonly ROUTES = ROUTES;
}
