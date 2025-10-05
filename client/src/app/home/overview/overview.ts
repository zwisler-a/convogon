import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {PersonaService} from '../persona/persona.service';
import {MatList, MatListItem} from '@angular/material/list';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [
    MatButton,
    RouterLink,
    MatList,
    AsyncPipe,
    MatListItem
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview {

  personas$;

  constructor(private personaService: PersonaService) {
    this.personas$ = this.personaService.getPersonas();
    console.log(this.personas$);
  }

}
