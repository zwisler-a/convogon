import {Component, HostListener} from '@angular/core';
import {TypeSelection} from './type-selection/type-selection';
import {ItInfo} from '../persona-forms/it-info/it-info';
import {KidInfo} from '../persona-forms/kid-info/kid-info';
import {NscInfo} from '../persona-forms/nsc-info/nsc-info';
import {ScInfo} from '../persona-forms/sc-info/sc-info';
import {PersonaStoreService} from '../../service/persona-store.service';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {OtInfo} from '../persona-forms/ot-info/ot-info';
import {MatButton} from '@angular/material/button';
import {JsonPipe} from '@angular/common';
import {Review} from './review/review';
import {Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {ROUTES} from '../../app.routes';
import {createForms} from '../persona-forms/persona-forms.utils';
import {
  ControlsOf,
  ItInfoForm,
  KidInfoForm,
  NpcInfoForm,
  OtInfoForm,
  PlayerCharInfoForm
} from '../persona-forms/persona-forms.types';

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
  loading = false;

  itInfo: FormGroup<ControlsOf<ItInfoForm>>;
  otInfo: FormGroup<ControlsOf<OtInfoForm>>;
  kidInfo: FormGroup<ControlsOf<KidInfoForm>>;
  npcInfo: FormGroup<ControlsOf<NpcInfoForm>>;
  playerCharInfo: FormGroup<ControlsOf<PlayerCharInfoForm>>;

  constructor(public personaService: PersonaStoreService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    const forms = createForms();
    this.itInfo = forms.itInfo;
    this.otInfo = forms.otInfo;
    this.kidInfo = forms.kidInfo;
    this.playerCharInfo = forms.playerCharInfo;
    this.npcInfo = forms.npcInfo;
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
    this.loading = true;
    this.personaService.createPersona(this.getPersonFromForm() as any).subscribe({
      next: (result) => {
        this.loading = false;
        this.router.navigate(['/' + ROUTES.HOME]);
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
      this.itInfo = createForms({itCharacterNameRequired: false, itCharacterClassRequired: false}).itInfo
    }
    if (this.type == 'sc') {
      this.itInfo = createForms().itInfo
    }
  }
}
