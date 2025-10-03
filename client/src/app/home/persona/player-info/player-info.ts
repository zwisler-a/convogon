import { Component } from '@angular/core';
import {MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-player-info',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './player-info.html',
  styleUrl: './player-info.css'
})
export class PlayerInfo {

}
