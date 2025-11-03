import { ChildEntity, Column } from 'typeorm';
import {Persona, PersonaType} from "./persona.entity";
import { ApiProperty } from '@nestjs/swagger';

@ChildEntity(PersonaType.SC)
export class PlayerCharacter extends Persona {

    @ApiProperty({ description: 'Address of the player character', example: '123 Main St' })
    @Column({ type: 'text', default: '' })
    address!: string;

    @ApiProperty({ description: 'Mobile number of the player character', example: '+1234567890' })
    @Column({ type: 'text', default: '' })
    mobileNumber!: string;

    @ApiProperty({ description: 'Dietary preferences', example: 'Vegetarian' })
    @Column({ type: 'text', default: '' })
    diet!: string;

    @ApiProperty({ description: 'Other diet details', example: 'No peanuts' })
    @Column({ type: 'text', default: '' })
    dietOther!: string;

    @ApiProperty({ description: 'Support preferences', example: 'Yes' })
    @Column({ type: 'text', default: '' })
    support!: string;

    @ApiProperty({ description: 'Other support details', example: 'Only on Friday' })
    @Column({ type: 'text', default: '' })
    supportOther!: string;

    @ApiProperty({ description: 'Arrival details', example: '2025-10-10 18:00' })
    @Column({ type: 'text', default: '' })
    arrival!: string;

    @ApiProperty({ description: 'Indicates if travelling with a group', example: false })
    @Column({ type: 'boolean', default: false })
    travellingWithGroup!: boolean;

    @ApiProperty({ description: 'Group name if applicable', example: 'The Adventurers', nullable: true })
    @Column({ type: 'text', nullable: true })
    groupName?: string;

    @ApiProperty({ description: 'Departure details', example: '2025-10-12 14:00' })
    @Column({ type: 'text', default: '' })
    departure!: string;

    @ApiProperty({ description: 'Accommodation information', example: 'Inn of the Crescent Moon' })
    @Column({ type: 'text', default: '' })
    accommodation!: string;

    @ApiProperty({ description: 'Character name in the game', example: 'Sir Aldric' })
    @Column({ type: 'text', default: '' })
    characterName!: string;

    @ApiProperty({ description: 'Character class', example: 'Warrior' })
    @Column({ type: 'text', default: '' })
    characterClass!: string;

    @ApiProperty({ description: 'List of character skills', example: ['Swordsmanship', 'Leadership'], nullable: true })
    @Column({ type: 'simple-json', nullable: true })
    skills?: string[];

    @ApiProperty({ description: 'Whether the character is a fighter', example: true })
    @Column({ type: 'boolean', default: false })
    fighter!: boolean;

    @ApiProperty({ description: 'Important information for the Game Master', example: 'Afraid of water' })
    @Column({ type: 'text', default: '' })
    importantInfoForGM!: string;

    @ApiProperty({ description: 'Most important aspect for the character', example: 'Protecting the kingdom' })
    @Column({ type: 'text', default: '' })
    mostImportantForCharacter!: string;

    @ApiProperty({ description: 'Information about the character’s friends', example: 'Companions from the Northern lands' })
    @Column({ type: 'text', default: '' })
    infoAboutFriends!: string;

    @ApiProperty({ description: 'Background story or lore', example: 'Born in the mountains...', nullable: true })
    @Column({ type: 'text', nullable: true })
    storyLore?: string;
}