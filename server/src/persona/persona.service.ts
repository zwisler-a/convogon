import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Persona} from "./entity/persona.entity";
import {Repository} from "typeorm";
import {Cron} from "@nestjs/schedule";
import {Gauge} from "prom-client";
import {InjectMetric} from "@willsoto/nestjs-prometheus";
import {METRICS} from "../constants";

@Injectable()
export class PersonaService {
    private logger = new Logger(PersonaService.name);

    constructor(@InjectRepository(Persona) private personaRepository: Repository<Persona>,
                @InjectMetric(METRICS.PERSONAS) public personaCountGauge: Gauge<string>) {
    }

    save(persona: Persona) {
        return this.personaRepository.save(persona);
    }

    @Cron('0 * * * * *')
    async handlePersona() {
        this.personaCountGauge.set(await this.personaRepository.count());
    }

}