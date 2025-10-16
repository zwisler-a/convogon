import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Persona} from "./entity/persona.entity";
import {Kid} from "./entity/kid.enitity";
import {PlayerCharacter} from "./entity/player.enitity";
import {NonPlayerCharacter} from "./entity/non-player.enitity";
import {PersonaController} from "./persona.controller";
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "../constants";
import { PersonaService } from './persona.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Persona, Kid, PlayerCharacter, NonPlayerCharacter]),
        AuthModule,
        JwtModule.register({secret: jwtSecret})],
    controllers: [PersonaController],
    providers: [PersonaService],
    exports: [PersonaService]
})
export class PersonaModule {
}
