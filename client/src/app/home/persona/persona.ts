import {Component} from '@angular/core';
import {TypeSelection} from './type-selection/type-selection';
import {ItInfo} from './it-info/it-info';
import {KidInfo} from './kid-info/kid-info';
import {NscInfo} from './nsc-info/nsc-info';
import {ScInfo} from './sc-info/sc-info';
import {PersonaService} from './persona.service';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OtInfo} from './ot-info/ot-info';

@Component({
  selector: 'app-persona',
  imports: [
    TypeSelection,
    ItInfo,
    KidInfo,
    NscInfo,
    ScInfo,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    OtInfo
  ],
  templateUrl: './persona.html',
  styleUrl: './persona.css'
})
export class Persona {
  itInfo: FormGroup;
  otInfo: FormGroup;
  kidInfo: FormGroup;
  npcInfo: FormGroup;
  playerCharInfo: FormGroup;

  constructor(public personaService: PersonaService, private fb: FormBuilder) {
    this.otInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: [''],
      mobileNumber: [''],
      diet: [''],
      dietDetails: [''],
      accommodation: [''],
      roommate: [''],
      arrival: [''],
      departure: [''],
    });
    this.itInfo = this.fb.group({
      characterName: [''],
      characterClass: [''],
      characterClassDetails: [''],
      skills: [''],
      fighter: [false],
      travellingWithGroup: [false],
      groupName: ['']
    })
    this.kidInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      arrival: ['', Validators.required],
      departure: ['', Validators.required],
    });
    this.playerCharInfo = this.fb.group({
      importantInfoForGM: [''],
      mostImportantForCharacter: [''],
      infoAboutFriends: [''],
      storyLore: [''],
    });
    this.npcInfo = this.fb.group({
      interests: [''],
      interestsDetails: [''],
    });
  }
}
