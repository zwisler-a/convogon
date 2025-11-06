import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    Param,
    NotFoundException,
    ForbiddenException, Delete, Put
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Persona} from "./entity/persona.entity";
import {Repository} from "typeorm";
import {AuthGuard} from "../auth/auth.guard";
import {AdminAuthGuard} from "../auth/admin-auth.guard";
import {ApiBearerAuth, ApiResponse, ApiOperation, ApiTags, ApiParam, ApiBody, ApiOkResponse} from "@nestjs/swagger";
import {PersonaDto} from "./dto/persona.dto";

@ApiTags('Persona')
@Controller('persona')
export class PersonaController {
    constructor(@InjectRepository(Persona) private personaRepository: Repository<Persona>) {
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        operationId: 'createPersona',
        summary: 'Create a persona',
        description: 'Creates a new persona owned by the authenticated user.'
    })
    @ApiBody({type: PersonaDto})
    @ApiResponse({status: 201, type: PersonaDto, description: 'Persona created successfully.'})
    @Post()
    public async create(@Body() persona: Persona, @Req() req: any): Promise<Persona> {
        const userId = req.user.id;
        return this.personaRepository.save(this.personaRepository.create({...persona, user: {id: userId}}));
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        operationId: 'updatePersona',
        summary: 'Update a persona',
        description: 'Updates an existing persona belonging to the authenticated user.'
    })
    @ApiBody({type: PersonaDto})
    @ApiResponse({status: 200, type: PersonaDto, description: 'Updated persona.'})
    @Put()
    public async update(@Body() persona: Persona, @Req() req: any): Promise<Persona> {
        const userId = req.user.id;
        const personaId = persona.id;
        if (!personaId) {
            throw new NotFoundException("personaId is required");
        }
        const oldPersona = await this.personaRepository.findOneOrFail({where: {id: personaId, user: {id: userId}}});
        const newPersona = {...oldPersona, ...persona, ...{id: personaId}};
        return this.personaRepository.save(newPersona);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiOperation({
        operationId: 'deletePersona',
        summary: 'Delete a persona',
        description: 'Deletes a persona by id if it belongs to the authenticated user.'
    })
    @ApiParam({name: 'id', type: String, description: 'Persona ID'})
    @ApiResponse({status: 200, description: 'Persona deleted.'})
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
    @ApiOperation({
        operationId: 'getOwnPersonas',
        summary: 'List my personas',
        description: 'Returns all personas owned by the authenticated user.'
    })
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
    @ApiOperation({
        operationId: 'getAllPersonas',
        summary: 'Admin: list all personas',
        description: 'Returns all personas with user relation. Requires admin role.'
    })
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
    @ApiOperation({
        operationId: 'getPersona',
        summary: 'Get a persona by id',
        description: 'Returns one persona by id if requester is the owner or an admin.'
    })
    @ApiParam({name: 'id', type: String, description: 'Persona ID'})
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