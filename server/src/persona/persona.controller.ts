import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    Param,
    NotFoundException,
    ForbiddenException
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Persona} from "./entity/persona.entity";
import {Repository} from "typeorm";
import {AuthGuard} from "../user/auth.guard";
import {AdminAuthGuard} from "../user/admin-auth.guard";

@Controller('persona')
export class PersonaController {
    constructor(@InjectRepository(Persona) private personaRepository: Repository<Persona>) {
    }

    @UseGuards(AuthGuard)
    @Post()
    public async create(@Body() persona: Persona, @Req() req: any): Promise<Persona> {
        const userId = req.user.id;
        return this.personaRepository.save(this.personaRepository.create({...persona, user: {id: userId}}));
    }

    @UseGuards(AuthGuard)
    @Get('/own')
    public async findAll(@Req() req: any): Promise<Persona[]> {
        const userId = req.user.id;
        return this.personaRepository.find({where: {user: {id: userId}}, loadEagerRelations: true});
    }

    @UseGuards(AdminAuthGuard)
    @Get('')
    public async findAllAdmin(@Req() req: any): Promise<Persona[]> {
        return this.personaRepository.find({loadEagerRelations: true, relations: {user: true}});
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    public async findOne(@Req() req: any, @Param('id') id: string): Promise<Persona> {
        const persona = await this.personaRepository.findOne({
            where: {id: id},
            relations: {user: true},
            loadEagerRelations: true
        });
        if (!persona) {
            throw new NotFoundException('Persona not found');
        }

        const user = req.user;
        if (user.role !== 'admin' && persona.user.id !== user.id) {
            throw new ForbiddenException('Access denied');
        }

        return persona;
    }


}