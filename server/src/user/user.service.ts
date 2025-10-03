import * as bcrypt from 'bcryptjs';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';
import {UserEntity} from "./user.entity";
import {JwtPayloadDto} from "./jwt-payload.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {
    }

    async signIn(mail: string, password: string): Promise<{ token: string }> {
        const user = await this.userRepo.findOneOrFail({where: {email: mail}});

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload: JwtPayloadDto = {
            user_id: user.id,
            role: user.role
        };
        return {token: this.jwtService.sign(payload)};
    }


    async register(mail: string, password: string): Promise<{ id: string }> {
        const existing = await this.userRepo.findOne({where: {email: mail}});
        if (existing) {
            throw new HttpException('Email already registered', HttpStatus.CONFLICT);
        }

        const hash = await bcrypt.hash(password, 12);
        const user = this.userRepo.create({email: mail, password: hash});
        await this.userRepo.save(user);
        return {id: user.id};
    }

    async getUserOrFail(id: string) {
        return this.userRepo.findOneOrFail({where: {id}});
    }
}
