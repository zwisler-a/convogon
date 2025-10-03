import {Component} from '@angular/core';
import {TypeSelection} from './type-selection/type-selection';
import {PlayerInfo} from './player-info/player-info';
import {KidInfo} from './kid-info/kid-info';
import {NscInfo} from './nsc-info/nsc-info';
import {ScInfo} from './sc-info/sc-info';
import {PersonaService} from './persona.service';

@Component({
  selector: 'app-persona',
  imports: [
    TypeSelection,
    PlayerInfo,
    KidInfo,
    NscInfo,
    ScInfo
  ],
  templateUrl: './persona.html',
  styleUrl: './persona.css'
})
export class Persona {
  constructor(public personaService: PersonaService) {
  }
}
