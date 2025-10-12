import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountEntity} from "./account.entity";
import {AccountController} from "./account.controller";
import {AuthModule} from "../auth/auth.module";
import {AccountService} from "./account.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity]),
        AuthModule
    ],
    controllers: [AccountController],
    providers: [AccountService],
    exports: []
})
export class AccountModule {
}