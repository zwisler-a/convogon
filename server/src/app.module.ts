import {Module} from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "./constants";
import {PersonaModule} from "./persona/persona.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountModule} from "./account/account.module";
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";

@Module({
    imports: [
        AuthModule,
        JwtModule.register({secret: jwtSecret}),
        PersonaModule,
        AccountModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db/db.sqlite',
            autoLoadEntities: true,
            synchronize: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
