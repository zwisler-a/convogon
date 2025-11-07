import {Module} from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "./constants";
import {PersonaModule} from "./persona/persona.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountModule} from "./account/account.module";
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {PrometheusModule} from "@willsoto/nestjs-prometheus";
import {ScheduleModule} from "@nestjs/schedule";
import {AppController} from "./app.controller";

@Module({
    imports: [
        AuthModule,
        PrometheusModule.register({
            global: true,
            customMetricPrefix: 'convogon',
        }),
        JwtModule.register({secret: jwtSecret}),
        PersonaModule,
        AccountModule,
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db/db.sqlite',
            autoLoadEntities: true,
            synchronize: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
            exclude: ['/metrics']
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
