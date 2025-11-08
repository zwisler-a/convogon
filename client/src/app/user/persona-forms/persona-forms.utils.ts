import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ControlsOf, ItInfoForm, KidInfoForm, NpcInfoForm, OtInfoForm, PlayerCharInfoForm} from './persona-forms.types';

export function createForms(opts: {
  itCharacterNameRequired?: boolean,
  itCharacterClassRequired?: boolean
} = {itCharacterNameRequired: true, itCharacterClassRequired: true}) {
  const otInfo = new FormGroup<ControlsOf<OtInfoForm>>({
    firstName: new FormControl<string | null>('', {validators: [Validators.required, Validators.maxLength(1000)]}),
    lastName: new FormControl<string | null>('', {validators: [Validators.required, Validators.maxLength(1000)]}),
    address: new FormControl<string | null>('', {validators: [Validators.required, Validators.maxLength(1000)]}),
    mobileNumber: new FormControl<string | null>('', {validators: [Validators.required, Validators.maxLength(1000)]}),
    diet: new FormControl<string | null>('', {validators: Validators.required}),
    dietOther: new FormControl<string | null>('', {validators: [Validators.maxLength(2000)]}),
    support: new FormControl<string | null>('', {validators: Validators.required}),
    supportOther: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
    accommodation: new FormControl<string | null>('', {validators: Validators.required}),
    travellingWithGroup: new FormControl<boolean>(false, {validators: Validators.required}),
    groupName: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
    arrival: new FormControl<string | null>('', {validators: [Validators.required, Validators.maxLength(1000)]}),
    departure: new FormControl<string | null>('', {validators: [Validators.required, Validators.maxLength(1000)]}),
  });
  const itInfo = new FormGroup<ControlsOf<ItInfoForm>>({
    characterName: new FormControl<string | null>('', {validators: opts.itCharacterNameRequired ? [Validators.required, Validators.maxLength(1000)] : Validators.maxLength(1000)}),
    characterClass: new FormControl<string | null>('', {validators: opts.itCharacterClassRequired ? [Validators.required, Validators.maxLength(1000)] : Validators.maxLength(1000)}),
    skills: new FormControl<string[]>([], Validators.maxLength(1000)),
    fighter: new FormControl<boolean>(false),
  });
  const kidInfo = new FormGroup<ControlsOf<KidInfoForm>>({
    firstName: new FormControl<string | null>('', {validators: [Validators.required, Validators.maxLength(1000)]}),
    lastName: new FormControl<string | null>('', {validators: [Validators.required, Validators.maxLength(1000)]}),
    other: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
    birthday: new FormControl<string | Date>('' as unknown as string),
    kidCharacterInfo: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
  });
  const playerCharInfo = new FormGroup<ControlsOf<PlayerCharInfoForm>>({
    importantInfoForGM: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
    mostImportantForCharacter: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
    infoAboutFriends: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
    storyLore: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
  });
  const npcInfo = new FormGroup<ControlsOf<NpcInfoForm>>({
    interests: new FormControl<string | null>('', {validators: [Validators.maxLength(1000)]}),
  });

  return {
    npcInfo,
    itInfo,
    playerCharInfo,
    kidInfo,
    otInfo
  }
}
