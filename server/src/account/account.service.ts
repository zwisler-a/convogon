import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "./account.entity";
import {Repository} from "typeorm";

@Injectable()
export class AccountService {
    constructor(@InjectRepository(AccountEntity) private accountRepo: Repository<AccountEntity>) {
    }

    async getUserOrFail(id: string) {
        return this.accountRepo.findOneOrFail({where: {id: id}, loadEagerRelations: true, relations: {personas: true}});
    }


    async getAll() {
        return this.accountRepo.find({relations: {personas: true}, loadEagerRelations: true});
    }

    save(accountEntity: AccountEntity) {
        return this.accountRepo.save(accountEntity);
    }
}