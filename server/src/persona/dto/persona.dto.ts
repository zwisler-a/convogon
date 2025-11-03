import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export enum PersonaType {
    SC = 'sc',
    NSC = 'nsc',
    KID = 'kid',
}

export class PersonaDto {
    // Base
    @ApiProperty({description: 'Unique identifier of the persona', example: 'uuid-string'})
    id!: string;

    @ApiProperty({description: 'Owner auth ID', example: 'uuid-auth'})
    userId!: string;

    @ApiProperty({description: 'Type of persona', enum: PersonaType})
    type!: PersonaType;

    @ApiProperty({description: 'First name', example: 'John'})
    firstName!: string;

    @ApiPropertyOptional({description: 'Last name', example: 'Doe'})
    lastName?: string;

    // Shared across SC/NSC
    @ApiPropertyOptional({description: 'Address', example: '123 Main St'})
    address?: string;

    @ApiPropertyOptional({description: 'Mobile number', example: '+1234567890'})
    mobileNumber?: string;

    @ApiPropertyOptional({description: 'Diet', example: 'Vegetarian'})
    diet?: string;

    @ApiPropertyOptional({description: 'Other diet details', example: 'No peanuts'})
    dietOther?: string;

    @ApiPropertyOptional({description: 'Arrival details', example: '2025-10-10 18:00'})
    arrival?: string;

    @ApiPropertyOptional({description: 'Travelling with a group', example: false})
    travellingWithGroup?: boolean;

    @ApiPropertyOptional({description: 'Group name', example: 'The Adventurers', nullable: true})
    groupName?: string | null;

    @ApiPropertyOptional({description: 'Departure details', example: '2025-10-12 14:00'})
    departure?: string;

    @ApiPropertyOptional({description: 'Support', example: 'Yes'})
    support?: string;

    @ApiPropertyOptional({description: 'Other support details', example: 'Only on Friday'})
    supportOther?: string;

    @ApiPropertyOptional({description: 'Accommodation', example: 'Inn of the Crescent Moon'})
    accommodation?: string;

    @ApiPropertyOptional({description: 'Character name', example: 'Sir Aldric'})
    characterName?: string;

    @ApiPropertyOptional({description: 'Character class', example: 'Warrior'})
    characterClass?: string;

    @ApiPropertyOptional({
        description: 'Skills',
        example: ['Swordsmanship', 'Leadership'],
        type: [String],
        nullable: true
    })
    skills?: string[] | null;

    @ApiPropertyOptional({description: 'Is fighter', example: true})
    fighter?: boolean;

    // SC-only
    @ApiPropertyOptional({description: 'Important info for GM', example: 'Afraid of water'})
    importantInfoForGM?: string;

    @ApiPropertyOptional({description: 'Most important aspect', example: 'Protecting the kingdom'})
    mostImportantForCharacter?: string;

    @ApiPropertyOptional({description: 'Info about friends', example: 'Companions from the Northern lands'})
    infoAboutFriends?: string;

    @ApiPropertyOptional({description: 'Story / lore', example: 'Born in the mountains...', nullable: true})
    storyLore?: string | null;

    // NSC-only
    @ApiPropertyOptional({description: 'Interests', example: ['Trade', 'Music'], type: [String], nullable: true})
    interests?: string[] | null;

    // Kid-only
    @ApiPropertyOptional({description: 'Age', example: 9, nullable: true})
    age?: number | null;

    @ApiPropertyOptional({description: 'Other', example: 'Likes dragons', nullable: true})
    other?: string | null;
}