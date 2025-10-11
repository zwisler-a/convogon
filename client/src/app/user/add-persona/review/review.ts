import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {KeyValuePipe} from '@angular/common';
import {PersonaOverview} from '../../persona-overview/persona-overview';

@Component({
  selector: 'app-review',
  imports: [
    MatCardActions,
    MatCardContent,
    MatCard,
    KeyValuePipe,
    PersonaOverview
  ],
  templateUrl: './review.html',
  styleUrl: './review.css'
})
export class Review {

  @Input() data: any;

}
