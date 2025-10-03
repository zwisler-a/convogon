import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthController} from "./auth.controller";
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "../constants";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({secret: jwtSecret})
    ],
    controllers: [AuthController],
    providers: [UserService],
})
export class UserModule {
}