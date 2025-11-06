import {ChildEntity, Column} from 'typeorm';
import {Persona, PersonaType} from "./persona.entity";
import {ApiProperty} from "@nestjs/swagger";

@ChildEntity(PersonaType.KID)
export class Kid extends Persona {

    @ApiProperty()
    @Column({type: 'date', nullable: true})
    birthday?: Date;

    @ApiProperty()
    @Column({type: 'text', nullable: true})
    other?: string;

    @ApiProperty()
    @Column({type: 'text', nullable: true})
    kidCharacterInfo?: string;
}