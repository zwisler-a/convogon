import { Component, Input } from '@angular/core';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-persona-overview',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './persona-overview.html',
  styleUrl: './persona-overview.css',
})
export class PersonaOverview {
  @Input() persona: any;

  getDietDisplayString(diet: any): string {
    if (diet == 'nothing') {
      return 'Keine Besonderheiten';
    } else if (diet == 'vegetarian') {
      return 'Vegetarisch';
    } else if (diet == 'vegan') {
      return 'Vegan';
    } else if (diet == 'other') {
      return this.persona.dietOther;
    } else {
      return 'Unbekannt';
    }
  }

  getAccommodationDisplayString(accommodation: any): string {
    if (accommodation == 'hut') {
      return 'Hütte';
    } else if (accommodation == 'tent') {
      return 'Mein Zelt / Van';
    } else if (accommodation == 'other') {
      return 'Ich übernachte außerhalb';
    } else {
      return 'Unbekannt';
    }
  }
}
