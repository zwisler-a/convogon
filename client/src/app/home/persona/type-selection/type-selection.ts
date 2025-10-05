import {Component, EventEmitter, Output} from '@angular/core';
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
    FormsModule
  ],
  templateUrl: './type-selection.html',
  styleUrl: './type-selection.css'
})
export class TypeSelection {
  @Output() type = new EventEmitter<string>();

  constructor() {
  }
}
