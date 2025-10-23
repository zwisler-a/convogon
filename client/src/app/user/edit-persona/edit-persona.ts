import {Component} from '@angular/core';
import {ItInfo} from "../add-persona/it-info/it-info";
import {KidInfo} from "../add-persona/kid-info/kid-info";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatStep, MatStepper} from "@angular/material/stepper";
import {NscInfo} from "../add-persona/nsc-info/nsc-info";
import {OtInfo} from "../add-persona/ot-info/ot-info";
import {Review} from "../add-persona/review/review";
import {ScInfo} from "../add-persona/sc-info/sc-info";
import {TypeSelection} from "../add-persona/type-selection/type-selection";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonaService} from '../../service/persona.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ROUTES} from '../../app.routes';
import {Persona} from '../../../api';

@Component({
  selector: 'app-edit-persona',
  imports: [
    ItInfo,
    KidInfo,
    MatButton,
    MatIcon,
    MatStep,
    MatStepper,
    NscInfo,
    OtInfo,
    Review,
    ScInfo,
    RouterLink
  ],
  templateUrl: './edit-persona.html',
  styleUrl: './edit-persona.css'
})
export class EditPersona {
  type?: string = undefined;

  itInfo: FormGroup;
  otInfo: FormGroup;
  kidInfo: FormGroup;
  npcInfo: FormGroup;
  playerCharInfo: FormGroup;


  persona: any;


  constructor(private activatedRoute: ActivatedRoute, public personaService: PersonaService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.otInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      diet: ['', Validators.required],
      dietOther: [''],
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

    this.activatedRoute.params.subscribe(params => {
      const id = this.activatedRoute.snapshot.params['id'];
      this.personaService.getPersona(id).subscribe(persona => {
        this.persona = persona;
        this.type = persona.type;
        this.applyPersonaToForms(persona);

      });
    })
  }

  private applyPersonaToForms(persona: any): void {
    // Ensure the component type is aligned with the incoming persona
    this.type = persona?.type;

    // Only fill the relevant form groups based on the type
    if (this.type === 'nsc' || this.type === 'sc') {
      this.itInfo.patchValue(persona);
      this.otInfo.patchValue(persona);
    }

    if (this.type === 'nsc') {
      this.npcInfo.patchValue(persona);
    }

    if (this.type === 'sc') {
      this.playerCharInfo.patchValue(persona);
    }

    if (this.type === 'kid') {
      this.kidInfo.patchValue(persona);
    }
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
    this.personaService.updatePersona(this.persona.id, this.getPersonFromForm()).subscribe({
      next: (result) => {
        this.router.navigate(['/home']);
      },
      error: err => {
        this.snackBar.open("Persona konnte leider nicht gespeichert werden...", 'Ok');
      }
    })
  }

  protected readonly ROUTES = ROUTES;
}
