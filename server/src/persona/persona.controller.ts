import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    Param,
    NotFoundException,
    ForbiddenException, Delete
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Persona} from "./entity/persona.entity";
import {Repository} from "typeorm";
import {AuthGuard} from "../auth/auth.guard";
import {AdminAuthGuard} from "../auth/admin-auth.guard";
import {ApiBearerAuth, ApiResponse} from "@nestjs/swagger";
import {PersonaDto} from "./dto/persona.dto";

@Controller('persona')
export class PersonaController {
    constructor(@InjectRepository(Persona) private personaRepository: Repository<Persona>) {
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    public async create(@Body() persona: Persona, @Req() req: any): Promise<Persona> {
        const userId = req.user.id;
        return this.personaRepository.save(this.personaRepository.create({...persona, user: {id: userId}}));
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    public async delete(@Param('id') id: string, @Req() req: any) {
        const userId = req.user.id;
        await this.personaRepository.delete({id: id, user: {id: userId}});
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: PersonaDto,
        isArray: true,
    })
    @UseGuards(AuthGuard)
    @Get('/own')
    public async findAll(@Req() req: any): Promise<Persona[]> {
        const userId = req.user.id;
        return this.personaRepository.find({where: {user: {id: userId}}, loadEagerRelations: true});
    }

    @ApiResponse({
        status: 200,
        type: PersonaDto,
        isArray: true,
    })
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @Get('')
    public async findAllAdmin(@Req() req: any): Promise<Persona[]> {
        return this.personaRepository.find({loadEagerRelations: true, relations: {user: true}});
    }

    @ApiResponse({
        status: 200,
        type: PersonaDto,
    })
    @ApiBearerAuth()
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