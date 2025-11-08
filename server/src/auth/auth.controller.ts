import {Body, Controller, Ip, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {AccountEntity} from "../account/account.entity";
import {RegisterDto} from "./dto/register.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: AuthService) {
    }

    @Post('login')
    async login(@Body('email') email: string) {
        try {
            return this.userService.signIn(email);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @ApiOperation({
        summary: 'Register a new account',
        operationId: 'register',
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved list of users.',
    })
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiBody({type: RegisterDto})
    @Post('register')
    async register(@Body() account: RegisterDto, @Ip() ip) {
        return this.userService.register(account, ip);
    }
}
