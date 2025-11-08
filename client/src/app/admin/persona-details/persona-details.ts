import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PersonaStoreService} from '../../service/persona-store.service';
import {PersonaOverview} from '../../shared/persona-overview/persona-overview';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ROUTES} from '../../app.routes';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {Loading} from '../../shared/loading/loading';
import {Observable, of} from 'rxjs';
import {PersonaDto} from '../../../api';
import {catchError, distinctUntilChanged, map, shareReplay, switchMap} from 'rxjs/operators';
import {NavigateBack} from '../../shared/navigate-back';

@Component({
  selector: 'app-admin-persona-view',
  imports: [
    PersonaOverview,
    MatCard,
    MatCardContent,
    MatButton,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    Loading,
    NavigateBack
  ],
  templateUrl: './persona-details.html',
  styleUrl: './persona-details.css'
})
export class PersonaDetails {

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly personaService = inject(PersonaStoreService);

  readonly persona$: Observable<PersonaDto | null> = this.route.paramMap.pipe(
    map(params => params.get('id')!),
    distinctUntilChanged(),
    switchMap(id => this.personaService.getPersona(id, true)),
    shareReplay({ bufferSize: 1, refCount: true }),
    catchError((error: Error) => of(null))
  );

  protected readonly ROUTES = ROUTES;

  navigateBack() {
    window.history.back();
  }
}
