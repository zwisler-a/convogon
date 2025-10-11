import {Component} from '@angular/core';
import {TypeSelection} from './type-selection/type-selection';
import {ItInfo} from './it-info/it-info';
import {KidInfo} from './kid-info/kid-info';
import {NscInfo} from './nsc-info/nsc-info';
import {ScInfo} from './sc-info/sc-info';
import {PersonaService} from '../../service/persona.service';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {OtInfo} from './ot-info/ot-info';
import {MatButton} from '@angular/material/button';
import {JsonPipe} from '@angular/common';
import {Review} from './review/review';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-persona',
  imports: [
    TypeSelection,
    ItInfo,
    KidInfo,
    NscInfo,
    ScInfo,
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    OtInfo,
    MatButton,
    JsonPipe,
    Review,
  ],
  templateUrl: './persona.html',
  styleUrl: './persona.css',
})
export class Persona {
  type?: string = undefined;

  itInfo: FormGroup;
  otInfo: FormGroup;
  kidInfo: FormGroup;
  npcInfo: FormGroup;
  playerCharInfo: FormGroup;

  constructor(public personaService: PersonaService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.otInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      diet: ['', Validators.required],
      accommodation: ['', Validators.required],
      travellingWithGroup: [false, Validators.required],
      groupName: [''],
      arrival: ['', Validators.required],
      departure: ['', Validators.required],
    });
    this.itInfo = this.fb.group({
      characterName: [''],
      characterClass: [''],
      skills: [''],
      fighter: [false],
    });
    this.kidInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      other: [''],
    });
    this.playerCharInfo = this.fb.group({
      importantInfoForGM: [''],
      mostImportantForCharacter: [''],
      infoAboutFriends: [''],
      storyLore: [''],
    });
    this.npcInfo = this.fb.group({
      interests: [''],
    });
  }

  getPersonFromForm() {
    return {
      type: this.type,
      ...(this.type == 'nsc' || this.type == 'sc' ? this.itInfo.value : {}),
      ...(this.type == 'nsc' || this.type == 'sc' ? this.otInfo.value : {}),
      ...(this.type == 'nsc' ? this.npcInfo.value : {}),
      ...(this.type == 'sc' ? this.playerCharInfo.value : {}),
      ...(this.type == 'kid' ? this.kidInfo.value : {}),
    };
  }

  createPersona() {
    this.personaService.createPersona(this.getPersonFromForm()).subscribe({
      next: (result) => {
        this.router.navigate(['/home']);
      },
      error: err => {
        this.snackBar.open("Persona konnte leider nicht erstellt werden...", 'Ok');
      }
    })
  }
}
