import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Persona } from "./entity/persona.entity";
import { Repository } from "typeorm";

@Injectable()
export class PersonaService {
    constructor(@InjectRepository(Persona) private personaRepository: Repository<Persona>) {
    }

    save(persona: Persona) {
        return this.personaRepository.save(persona);
    }
}