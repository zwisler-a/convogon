import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PersonaService {

  constructor(private http: HttpClient) {
  }


  createPersona(persona: any) {
    return this.http.post('/api/persona', persona);
  }

  getPersonas() {
    return this.http.get<any[]>('/api/persona').pipe(map(response => response));
  }

  getPersona(id: string) {
    return this.getPersonas().pipe(map(response => response.find(persona => persona.id === id)));
  }
}
