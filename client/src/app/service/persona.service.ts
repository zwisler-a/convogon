import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import {Persona} from '../../api';

@Injectable({providedIn: 'root'})
export class PersonaService {

  constructor(private http: HttpClient) {
  }


  createPersona(persona: any) {
    return this.http.post('/api/persona', persona);
  }

  getPersonas() {
    return this.http.get<Persona[]>('/api/persona/own').pipe(map(response => response));
  }


  getAllPersonas() {
    return this.http.get<any[]>('/api/persona').pipe(map(response => response));
  }

  getPersona(id: string) {
    return this.http.get<Persona>('/api/persona/' + id).pipe(map(response => response));
  }

  delete(id: string) {
    return this.http.delete('/api/persona/' + id).pipe(map(response => response));
  }

  updatePersona(id: string, persona: any) {
    return this.http.put('/api/persona', {...{id}, ...persona});
  }
}
