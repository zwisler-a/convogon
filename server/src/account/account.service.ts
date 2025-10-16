import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "./account.entity";
import {Repository} from "typeorm";
import { PersonaService } from "src/persona/persona.service";

@Injectable()
export class AccountService {
    constructor(@InjectRepository(AccountEntity) private accountRepo: Repository<AccountEntity>, private personaService: PersonaService) {
    }

    async getUserOrFail(id: string) {
        return this.accountRepo.findOneOrFail({where: {id: id}, loadEagerRelations: true, relations: {personas: true}});
    }


    async getAll() {
        return this.accountRepo.find({relations: {personas: true}, loadEagerRelations: true});
    }

    async save(accountEntity: AccountEntity) {
        await Promise.all(accountEntity.personas.map(persona => this.personaService.save(persona)));
        return this.accountRepo.save(accountEntity);
    }
}