// server/src/add-persona/add-persona.base.ts
import {Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne} from 'typeorm';
import {UserEntity} from "../../user/user.entity";

export enum PersonaType {
    SC = 'sc',
    NSC = 'nsc',
    KID = 'kid',
}

@Entity('personas')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Persona {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(type => UserEntity, user => user.id)
    user!: UserEntity;

    @Column({ type: 'varchar' })
    type!: string;

    @Column({ type: 'text' })
    firstName!: string;

    @Column({ type: 'text', default: '' })
    lastName!: string;

}