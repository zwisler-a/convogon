import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "./auth.controller";
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "../constants";
import {MailService} from "./mail.service";
import {AuthGuard} from "./auth.guard";
import {AdminAuthGuard} from "./admin-auth.guard";
import {UserController} from "./user.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({secret: jwtSecret})
    ],
    controllers: [AuthController, UserController],
    providers: [UserService, MailService, AuthGuard, AdminAuthGuard],
    exports: [AuthGuard, UserService, AdminAuthGuard]
})
export class UserModule {
}