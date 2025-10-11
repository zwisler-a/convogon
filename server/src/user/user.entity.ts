import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {Persona} from "../persona/entity/persona.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column({default: 'user'})
    role: string;

    @Column({default: false})
    payed: boolean;

    @Column({default: '', nullable: true})
    message: string;

    @Column({default: false})
    shouldPay: boolean;

    @OneToMany(type => Persona, (user) => user.user)
    persona: Persona[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}