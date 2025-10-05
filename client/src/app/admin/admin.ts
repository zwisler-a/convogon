import {Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatList, MatListItem} from "@angular/material/list";
import {RouterLink} from '@angular/router';
import {PersonaService} from '../service/persona.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  imports: [
    AsyncPipe,
    MatIconModule,
    MatList,
    MatListItem,
    RouterLink
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  personas$;

  constructor(private personaService: PersonaService) {
    this.personas$ = this.personaService.getAllPersonas();
  }

}
