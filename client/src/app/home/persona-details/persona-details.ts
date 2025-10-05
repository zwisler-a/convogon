import {Component} from '@angular/core';
import {PersonaService} from '../persona/persona.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-persona-details',
  imports: [
    JsonPipe
  ],
  templateUrl: './persona-details.html',
  styleUrl: './persona-details.css'
})
export class PersonaDetails {

  persona: any = {}

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private personaService: PersonaService) {
    this.activatedRoute.params.subscribe(params => {
      const id = this.activatedRoute.snapshot.params['id'];
      this.personaService.getPersona(id).subscribe(persona => this.persona = persona);
    })
  }


}
