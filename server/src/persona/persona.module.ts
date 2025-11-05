import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Persona} from "./entity/persona.entity";
import {Kid} from "./entity/kid.enitity";
import {PlayerCharacter} from "./entity/player.enitity";
import {NonPlayerCharacter} from "./entity/non-player.enitity";
import {PersonaController} from "./persona.controller";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret, METRICS} from "../constants";
import {PersonaService} from './persona.service';
import {makeGaugeProvider} from "@willsoto/nestjs-prometheus";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        TypeOrmModule.forFeature([Persona, Kid, PlayerCharacter, NonPlayerCharacter]),
        AuthModule,
        JwtModule.register({secret: jwtSecret})
    ],
    controllers: [PersonaController],
    providers: [PersonaService,
        makeGaugeProvider({
            name: METRICS.PERSONAS,
            help: "number of personas in the database",
        })
    ],
    exports: [PersonaService]
})
export class PersonaModule {
}
