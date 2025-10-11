import {Component} from '@angular/core';
import {PersonaService} from '../service/persona.service';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {AsyncPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    MatIconModule,
    MatTableModule,
    AsyncPipe,
    MatButton,
    RouterLink
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  displayedColumns: string[] = ['mail', 'firstName', 'lastName', 'actions'];
  personas$;

  constructor(private personaService: PersonaService) {
    this.personas$ = this.personaService.getAllPersonas();
  }

}
