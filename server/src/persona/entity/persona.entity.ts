import {Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne} from 'typeorm';
import {AccountEntity} from "../../account/account.entity";
import {ApiProperty} from '@nestjs/swagger';

export enum PersonaType {
    SC = 'sc',
    NSC = 'nsc',
    KID = 'kid',
}

@Entity('personas')
@TableInheritance({column: {type: 'varchar', name: 'type'}})
export class Persona {
    @ApiProperty({description: 'Unique identifier of the persona', example: 'uuid-string'})
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ApiProperty({description: 'User that owns this persona', type: () => AccountEntity})
    @ManyToOne(type => AccountEntity, user => user.id)
    user!: AccountEntity;

    @ApiProperty({description: 'Type of persona', enum: PersonaType})
    @Column({type: 'varchar'})
    type!: string;

    @ApiProperty({description: 'First name of the persona', example: 'John'})
    @Column({type: 'text'})
    firstName!: string;

    @ApiProperty({description: 'Last name of the persona', example: 'Doe', default: ''})
    @Column({type: 'text', default: ''})
    lastName!: string;

    @ApiProperty({description: 'Payment status', example: false, default: false})
    @Column({default: false})
    paid!: boolean;

    @ApiProperty({description: 'Payment timestamp', example: null, default: null, nullable: true})
    @Column({type: 'date', nullable: true, default: null})
    paymentTimestamp!: Date | null;

}