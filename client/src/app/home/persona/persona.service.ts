import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PersonaService {

  public type: 'nsc' | 'sc' | 'kid' | undefined;

  start() {
    this.type = undefined
  }


}
