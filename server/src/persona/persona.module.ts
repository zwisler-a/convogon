import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Persona} from "./entity/persona.entity";
import {Kid} from "./entity/kid.enitity";
import {PlayerCharacter} from "./entity/player.enitity";
import {NonPlayerCharacter} from "./entity/non-player.enitity";
import {PersonaController} from "./persona.controller";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "../constants";

@Module({
    imports: [
        TypeOrmModule.forFeature([Persona, Kid, PlayerCharacter, NonPlayerCharacter]),
        UserModule,
        JwtModule.register({secret: jwtSecret})],
    controllers: [PersonaController],
    providers: [],
})
export class PersonaModule {
}
