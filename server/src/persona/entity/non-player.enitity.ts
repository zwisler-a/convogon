import {ChildEntity, Column} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {Persona, PersonaType} from "./persona.entity";

@ChildEntity(PersonaType.NSC)
export class NonPlayerCharacter extends Persona {

    @ApiProperty({ description: 'Address'})
    @Column({ type: 'text', default: '' })
    address!: string;

    @ApiProperty()
    @Column({ type: 'text', default: '' })
    mobileNumber!: string;

    @ApiProperty()
    @Column({ type: 'text', default: '' })
    diet!: string;

    @ApiProperty()
    @Column({ type: 'text', default: '' })
    dietOther!: string;

    @ApiProperty({ description: 'Arrival details of the non-player character', example: '2025-10-10 18:00' })
    @Column({ type: 'text', default: '' })
    arrival!: string;

    @ApiProperty({ description: 'Indicates if travelling with a group', example: false })
    @Column({ type: 'boolean', default: false })
    travellingWithGroup!: boolean;

    @ApiProperty({ description: 'Group name if applicable', example: 'NPC Guild', nullable: true })
    @Column({ type: 'text', nullable: true })
    groupName?: string;

    @ApiProperty({ description: 'Departure details of the non-player character', example: '2025-10-12 14:00' })
    @Column({ type: 'text', default: '' })
    departure!: string;

    @ApiProperty({ description: 'Accommodation information', example: 'Castle quarters' })
    @Column({ type: 'text', default: '' })
    accommodation!: string;

    @ApiProperty({ description: 'Character name', example: 'Elder Bran' })
    @Column({type: 'text', default: ''})
    characterName!: string;

    @ApiProperty({ description: 'Character class or role', example: 'Merchant' })
    @Column({type: 'text', default: ''})
    characterClass!: string;

    @ApiProperty({ description: 'List of character skills', example: ['Negotiation', 'Bartering'], nullable: true })
    @Column({type: 'simple-json', nullable: true})
    skills?: string[];

    @ApiProperty({ description: 'Whether the character is a fighter', example: false })
    @Column({type: 'boolean', default: false})
    fighter!: boolean;

    @ApiProperty({ description: 'List of character interests', example: ['Trade', 'Music'], nullable: true })
    @Column({type: 'simple-json', nullable: true})
    interests?: string[];

}