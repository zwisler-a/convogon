import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';
import {AccountEntity} from "../account/account.entity";
import {JwtPayloadDto} from "./jwt-payload.dto";
import {MailService} from "../mail/mail.service";
import {mailTemplateHtml, mailTemplateText} from "../constants";
import {RegisterDto} from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AccountEntity) private userRepo: Repository<AccountEntity>,
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
        await this.mailService.sendMail(user.email, `Login für ConVogon`,
            mailTemplateText(`${process.env.URL ?? 'http://localhost:4200'}/home?token=${token}`),
            mailTemplateHtml(`${process.env.URL ?? 'http://localhost:4200'}/home?token=${token}`)
        );
    }


    async register(account: RegisterDto, ip: string): Promise<{ id: string }> {
        if (!account.acceptCodeOfConduct || !account.acceptDataPrivacy) {
            throw new BadRequestException('Code of Conduct or Data privacy is not accepted');
        }
        const existing = await this.userRepo.findOne({where: {email: account.email}});
        if (existing) {
            throw new HttpException('Email already registered', HttpStatus.CONFLICT);
        }

        const user = this.userRepo.create({
            email: account.email,
            firstName: account.firstName,
            lastName: account.lastName,
            acceptedCodeOfConduct: account.acceptCodeOfConduct,
            acceptedDataPrivacy: account.acceptDataPrivacy,
            ip: ip
        });
        await this.userRepo.save(user);
        await this.signIn(account.email);
        return {id: user.id};
    }

    async getUserOrFail(id: string) {
        return this.userRepo.findOneOrFail({where: {id}, relations: {personas: true}});
    }
}
