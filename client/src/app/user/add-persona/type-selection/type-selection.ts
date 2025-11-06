import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-type-selection',
  imports: [
    MatCard,
    FormsModule,
    MatCardContent
  ],
  templateUrl: './type-selection.html',
  styleUrl: './type-selection.css'
})
export class TypeSelection {
  @Output() type = new EventEmitter<string>();

  constructor() {
  }
}
