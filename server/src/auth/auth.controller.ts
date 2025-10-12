import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: AuthService) {
    }

    @Post('login')
    async login(@Body('email') email: string) {
        return this.userService.signIn(email);
    }

    @Post('register')
    async register(@Body('email') email: string) {
        return this.userService.register(email);
    }
}
