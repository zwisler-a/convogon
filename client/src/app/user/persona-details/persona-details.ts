import {Component} from '@angular/core';
import {PersonaService} from '../../service/persona.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {PersonaOverview} from '../../shared/persona-overview/persona-overview';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {Persona} from '../../../api';

@Component({
  selector: 'app-add-persona-details',
  imports: [
    MatButton,
    RouterLink,
    PersonaOverview,
    MatCard,
    MatCardContent,
    MatIconModule
  ],
  templateUrl: './persona-details.html',
  styleUrl: './persona-details.css'
})
export class PersonaDetails {

  persona!: Persona;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private personaService: PersonaService) {
    this.activatedRoute.params.subscribe(params => {
      const id = this.activatedRoute.snapshot.params['id'];
      this.personaService.getPersona(id).subscribe(persona => this.persona = persona);
    })
  }


}
