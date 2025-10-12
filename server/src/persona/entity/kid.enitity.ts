import {ChildEntity, Column} from 'typeorm';
import {Persona, PersonaType} from "./persona.entity";
import {ApiProperty} from "@nestjs/swagger";

@ChildEntity(PersonaType.KID)
export class Kid extends Persona {

    @ApiProperty()
    @Column({type: 'integer', nullable: true})
    age?: number;

    @ApiProperty()
    @Column({type: 'text', nullable: true})
    other?: string;
}