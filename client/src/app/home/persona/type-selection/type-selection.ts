import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {PersonaService} from '../persona.service';

@Component({
  selector: 'app-type-selection',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatRadioGroup,
    MatRadioButton,
    FormsModule
  ],
  templateUrl: './type-selection.html',
  styleUrl: './type-selection.css'
})
export class TypeSelection {
  constructor(public personaService: PersonaService) {
  }
}
