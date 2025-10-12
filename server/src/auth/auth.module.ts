import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {AccountEntity} from "../account/account.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "../constants";
import {AuthGuard} from "./auth.guard";
import {AdminAuthGuard} from "./admin-auth.guard";
import {MailModule} from "../mail/mail.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity]),
        JwtModule.register({secret: jwtSecret}),
        MailModule
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, AdminAuthGuard],
    exports: [AuthGuard, AuthService, AdminAuthGuard, JwtModule.register({secret: jwtSecret})]
})
export class AuthModule {
}