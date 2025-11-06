import {Injectable} from '@angular/core';
import {PersonaDto, PersonaService} from '../../api';
import {Observable, shareReplay, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PersonaStoreService {

  constructor(private personaService: PersonaService) {
  }

  private personas$?: Observable<PersonaDto[]>;
  private allPersonas$?: Observable<PersonaDto[]>;
  private personaCache = new Map<string, Observable<PersonaDto>>();

  private invalidateCaches(ids: string[] = []) {
    this.personas$ = undefined;
    this.allPersonas$ = undefined;
    ids.forEach(id => this.personaCache.delete(id));
  }

  createPersona(persona: PersonaDto) {
    return this.personaService.createPersona(persona).pipe(
      tap(() => this.invalidateCaches())
    );
  }

  getPersonas(forceRefresh = false) {
    if (!this.personas$ || forceRefresh) {
      this.personas$ = this.personaService.getOwnPersonas().pipe(shareReplay(1));
    }
    return this.personas$;
  }

  getAllPersonas(forceRefresh = false) {
    if (!this.allPersonas$ || forceRefresh) {
      this.allPersonas$ = this.personaService.getAllPersonas().pipe(shareReplay(1));
    }
    return this.allPersonas$;
  }

  getPersona(id: string, forceRefresh = false) {
    if (!this.personaCache.has(id) || forceRefresh) {
      const cached$ = this.personaService.getPersona(id).pipe(shareReplay(1));
      this.personaCache.set(id, cached$);
    }
    return this.personaCache.get(id)!;
  }

  delete(id: string) {
    return this.personaService.deletePersona(id).pipe(
      tap(() => this.invalidateCaches([id]))
    );
  }

  updatePersona(id: string, persona: any) {
    return this.personaService.updatePersona({ ...{ id }, ...persona }).pipe(
      tap(() => this.invalidateCaches([id]))
    );
  }
}
