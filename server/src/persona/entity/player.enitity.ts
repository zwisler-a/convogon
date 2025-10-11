import { ChildEntity, Column } from 'typeorm';
import {Persona, PersonaType} from "./persona.entity";

@ChildEntity(PersonaType.SC)
export class PlayerCharacter extends Persona {

    @Column({ type: 'text', default: '' })
    address!: string;

    @Column({ type: 'text', default: '' })
    mobileNumber!: string;

    @Column({ type: 'text', default: '' })
    diet!: string;

    @Column({ type: 'text', default: '' })
    dietOther!: string;

    @Column({ type: 'text', default: '' })
    arrival!: string;

    @Column({ type: 'boolean', default: false })
    travellingWithGroup!: boolean;

    @Column({ type: 'text', nullable: true })
    groupName?: string;

    @Column({ type: 'text', default: '' })
    departure!: string;

    @Column({ type: 'text', default: '' })
    accommodation!: string;



    @Column({ type: 'text', default: '' })
    characterName!: string;

    @Column({ type: 'text', default: '' })
    characterClass!: string;

    @Column({ type: 'simple-json', nullable: true })
    skills?: string[];

    @Column({ type: 'boolean', default: false })
    fighter!: boolean;

    @Column({ type: 'text', default: '' })
    importantInfoForGM!: string;

    @Column({ type: 'text', default: '' })
    mostImportantForCharacter!: string;

    @Column({ type: 'text', default: '' })
    infoAboutFriends!: string;

    @Column({ type: 'text', nullable: true })
    storyLore?: string;
}