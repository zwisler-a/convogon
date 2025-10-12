import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {Persona} from "../persona/entity/persona.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AccountEntity {
    @ApiProperty({ description: 'Unique identifier for the account', example: 'a3f8c9b0-1a2b-4e6d-b3b9-8f6a5c5a9e1d' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Email address of the account', example: 'user@example.com' })
    @Column({unique: true})
    email: string;

    @ApiProperty({ description: 'Role of the account user', example: 'admin' })
    @Column({default: 'user'})
    role: string;

    @ApiProperty({ description: 'Indicates whether the user has paid', example: true })
    @Column({default: false})
    payed: boolean;

    @ApiProperty({ description: 'Optional message associated with the account', example: 'Welcome message', required: false })
    @Column({default: '', nullable: true})
    message: string;

    @ApiProperty({ description: 'Indicates whether the user should pay', example: false })
    @Column({default: false})
    shouldPay: boolean;

    @ApiProperty({ description: 'List of personas linked to this account', type: () => [Persona] })
    @OneToMany(type => Persona, (user) => user.user)
    personas: Persona[];

    @ApiProperty({ description: 'Date the account was created', example: '2025-01-01T00:00:00Z' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Date the account was last updated', example: '2025-02-01T00:00:00Z' })
    @UpdateDateColumn()
    updatedAt: Date;
}