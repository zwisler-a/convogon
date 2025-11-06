import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {PersonaOverview} from '../../../shared/persona-overview/persona-overview';

@Component({
  selector: 'app-review',
  imports: [
    MatCardContent,
    MatCard,
    PersonaOverview
  ],
  templateUrl: './review.html',
  styleUrl: './review.css'
})
export class Review {

  @Input() data: any;

}
