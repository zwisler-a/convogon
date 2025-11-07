import {FormControl} from '@angular/forms';

export interface OtInfoForm {
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  mobileNumber: string | null;
  diet: string | null;
  dietOther: string | null;
  support: string | null;
  supportOther: string | null;
  accommodation: string | null;
  travellingWithGroup: boolean | null;
  groupName: string | null;
  arrival: string | null;
  departure: string | null;
}

export interface ItInfoForm {
  characterName: string | null;
  characterClass: string | null;
  skills: string[] | null;
  fighter: boolean | null;
}

export interface KidInfoForm {
  firstName: string | null;
  lastName: string | null;
  other: string | null;
  birthday: string | Date | null;
  kidCharacterInfo: string | null;
}

export interface NpcInfoForm {
  interests: string | null;
}

export interface PlayerCharInfoForm {
  importantInfoForGM: string | null;
  mostImportantForCharacter: string | null;
  infoAboutFriends: string | null;
  storyLore: string | null;
}

export type ControlsOf<T> = { [K in keyof T]: FormControl<T[K]> };
