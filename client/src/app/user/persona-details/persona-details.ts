import {Component} from '@angular/core';
import {PersonaService} from '../../service/persona.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {JsonPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-add-persona-details',
  imports: [
    JsonPipe,
    MatButton,
    RouterLink
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
