import * as bcrypt from 'bcryptjs';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';
import {UserEntity} from "./user.entity";
import {JwtPayloadDto} from "./jwt-payload.dto";
import {MailService} from "./mail.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private jwtService: JwtService,
        private mailService: MailService,
    ) {
    }

    async signIn(mail: string) {
        const user = await this.userRepo.findOneOrFail({where: {email: mail}});
        const payload: JwtPayloadDto = {
            user_id: user.id,
            role: user.role,
            email: user.email
        };
        const token = this.jwtService.sign(payload);
        this.mailService.sendMail(user.email, `Login`, `Open: http://localhost:4200/home?token=${token}`);
    }


    async register(mail: string): Promise<{ id: string }> {
        const existing = await this.userRepo.findOne({where: {email: mail}});
        if (existing) {
            throw new HttpException('Email already registered', HttpStatus.CONFLICT);
        }

        const user = this.userRepo.create({email: mail});
        await this.userRepo.save(user);
        this.signIn(mail);
        return {id: user.id};
    }

    async getUserOrFail(id: string) {
        return this.userRepo.findOneOrFail({where: {id}});
    }

    async getAll() {
        return this.userRepo.find();
    }

    save(user: UserEntity) {
        return this.userRepo.save(user);
    }
}
