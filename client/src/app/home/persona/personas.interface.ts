export interface OutOfCharacterInfo {
  firstName: string;
  lastName: string;
  address: string;
  mobileNumber: string;
  diet: string;
  dietDetails?: string;
  accommodation: string;
  roommate?: string;
  arrival: string;
  departure: string;
}

export interface InCharacterInfo {
  characterName: string;
  characterClass: string;
  characterClassDetails?: string;
  skills: string[];
  fighter: boolean;
  travellingWithGroup: boolean;
  groupName?: string;
}

export interface PlayerCharacter extends OutOfCharacterInfo, InCharacterInfo {
  typ: 'sc';
  importantInfoForGM: string;
  mostImportantForCharacter: string;
  infoAboutFriends: string;
  storyLore?: string;
}

export interface NonPlayerCharacter extends OutOfCharacterInfo, InCharacterInfo {
  typ: 'nsc';
  interests: string[];
  interestsDetails?: string;
}

export interface Child {
  typ: 'kid';
  firstName: string;
  lastName: string;
  age: number;
  arrival: string;
  departure: string;
}
