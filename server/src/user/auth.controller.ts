import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from './user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {
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
