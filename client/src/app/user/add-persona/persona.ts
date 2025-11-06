import {Component, HostListener} from '@angular/core';
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
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {ROUTES} from '../../app.routes';

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
    Review,
    MatIconModule,
    RouterLink,
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
      dietOther: [''],
      support: ['', Validators.required],
      supportOther: [''],
      accommodation: ['', Validators.required],
      travellingWithGroup: [false, Validators.required],
      groupName: [''],
      arrival: ['', Validators.required],
      departure: ['', Validators.required],
    });
    this.itInfo = this.fb.group({
      characterName: ['', Validators.required],
      characterClass: ['', Validators.required],
      skills: [''],
      fighter: [false],
    });
    this.kidInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      other: [''],
      birthday: ['', Validators.required],
      kidCharacterInfo: [''],
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


  @HostListener('document:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
      this.fillWithFake();
    }
  }


  fillWithFake() {
    this.itInfo.patchValue({
      characterName: 'Thorin Oakenshield',
      characterClass: 'Warrior',
      skills: ['Leadership', 'Axe fighting'],
      fighter: true,
    });
    this.otInfo.setValue({
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St, Rivertown',
      mobileNumber: '5551234567',
      diet: 'nothing',
      dietOther: 'Norway',
      support: 'other',
      supportOther: 'only on saturday',
      accommodation: 'hut',
      travellingWithGroup: true,
      groupName: 'Fellowship of the Ring',
      arrival: '2025-10-10',
      departure: '2025-10-15',
    });
    this.kidInfo.setValue({
      firstName: 'Tommy',
      lastName: 'Doe',
      age: 12,
      other: 'Likes dragons',
      birthday: new Date(),
      kidCharacterInfo: '',
    });
    this.playerCharInfo.setValue({
      importantInfoForGM: 'Has secret royal bloodline.',
      mostImportantForCharacter: 'Protect his people.',
      infoAboutFriends: 'Loyal to his guildmates.',
      storyLore: 'Descendant of a long line of warriors.',
    });
    this.npcInfo.setValue({
      interests: 'Trade, diplomacy',
    });
    this.snackBar.open('Form filled with fake data', 'OK', {duration: 2000});

  }

  protected readonly ROUTES = ROUTES;

  changeType(type: string) {
    this.type = type;
    if (this.type == 'nsc') {
      this.itInfo = this.fb.group({
        characterName: [''],
        characterClass: [''],
        skills: [''],
        fighter: [false],
      });
    }
    if (this.type == 'sc') {
      this.itInfo = this.fb.group({
        characterName: ['', Validators.required],
        characterClass: ['', Validators.required],
        skills: [''],
        fighter: [false],
      });
    }
  }
}
