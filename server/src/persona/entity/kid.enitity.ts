import {ChildEntity, Column} from 'typeorm';
import {Persona, PersonaType} from "./persona.entity";

@ChildEntity(PersonaType.KID)
export class Kid extends Persona {
    @Column({type: 'integer', nullable: true})
    age?: number;

    @Column({type: 'text', nullable: true})
    other?: string;
}