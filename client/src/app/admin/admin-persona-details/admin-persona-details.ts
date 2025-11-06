import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {PersonaStoreService} from '../../service/persona-store.service';
import {PersonaOverview} from '../../shared/persona-overview/persona-overview';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {ROUTES} from '../../app.routes';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-admin-persona-view',
  imports: [
    PersonaOverview,
    MatCard,
    MatCardContent,
    MatButton,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './admin-persona-details.html',
  styleUrl: './admin-persona-details.css'
})
export class AdminPersonaDetails {

  persona: any = {}

  constructor(private activatedRoute: ActivatedRoute, private personaService: PersonaStoreService) {
    this.activatedRoute.params.subscribe(params => {
      const id = this.activatedRoute.snapshot.params['id'];
      this.personaService.getPersona(id).subscribe(persona => this.persona = persona);
    })
  }

  protected readonly ROUTES = ROUTES;
}
