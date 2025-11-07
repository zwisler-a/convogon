import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';

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

    @Post('register')
    async register(@Body('email') email: string) {
        return this.userService.register(email);
    }
}
