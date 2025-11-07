import {Component} from '@angular/core';
import {ItInfo} from "../persona-forms/it-info/it-info";
import {KidInfo} from "../persona-forms/kid-info/kid-info";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatStep, MatStepper} from "@angular/material/stepper";
import {NscInfo} from "../persona-forms/nsc-info/nsc-info";
import {OtInfo} from "../persona-forms/ot-info/ot-info";
import {Review} from "../add-persona/review/review";
import {ScInfo} from "../persona-forms/sc-info/sc-info";
import {TypeSelection} from "../add-persona/type-selection/type-selection";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonaStoreService} from '../../service/persona-store.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ROUTES} from '../../app.routes';
import {Persona, PersonaDto} from '../../../api';
import {
  ControlsOf,
  ItInfoForm,
  KidInfoForm,
  NpcInfoForm,
  OtInfoForm,
  PlayerCharInfoForm
} from '../persona-forms/persona-forms.types';
import {createForms} from '../persona-forms/persona-forms.utils';

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

  itInfo: FormGroup<ControlsOf<ItInfoForm>>;
  otInfo: FormGroup<ControlsOf<OtInfoForm>>;
  kidInfo: FormGroup<ControlsOf<KidInfoForm>>;
  npcInfo: FormGroup<ControlsOf<NpcInfoForm>>;
  playerCharInfo: FormGroup<ControlsOf<PlayerCharInfoForm>>;

  persona: any;


  constructor(private activatedRoute: ActivatedRoute, public personaService: PersonaStoreService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    const forms = createForms();
    this.itInfo = forms.itInfo;
    this.otInfo = forms.otInfo;
    this.kidInfo = forms.kidInfo;
    this.playerCharInfo = forms.playerCharInfo;
    this.npcInfo = forms.npcInfo;

    this.activatedRoute.params.subscribe(params => {
      const id = this.activatedRoute.snapshot.params['id'];
      this.personaService.getPersona(id).subscribe(persona => {
        this.persona = persona;
        this.type = persona.type;
        this.applyPersonaToForms(persona);

      });
    })
  }

  private applyPersonaToForms(persona: PersonaDto): void {
    // Ensure the component type is aligned with the incoming persona
    this.type = persona?.type;

    if (this.type == 'nsc') {
      this.itInfo = createForms({itCharacterNameRequired: false, itCharacterClassRequired: false}).itInfo
    }
    if (this.type == 'sc') {
      this.itInfo = createForms().itInfo
    }

    // Only fill the relevant form groups based on the type
    if (this.type === 'nsc' || this.type === 'sc') {
      this.itInfo.patchValue(persona);
      this.otInfo.patchValue(persona as any);
    }

    if (this.type === 'nsc') {
      this.npcInfo.patchValue(persona);
    }

    if (this.type === 'sc') {
      this.playerCharInfo.patchValue(persona);
    }

    if (this.type === 'kid') {
      this.kidInfo.patchValue(persona as any);
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
