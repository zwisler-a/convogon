import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from "./user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "./constants";
import {PersonaModule} from "./persona/persona.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        UserModule,
        JwtModule.register({secret: jwtSecret}),
        PersonaModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            autoLoadEntities: true,
            synchronize: true,
        }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
