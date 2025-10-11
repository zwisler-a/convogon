import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    UnauthorizedException,
    UseGuards
} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard} from "./auth.guard";
import {AdminAuthGuard} from "./admin-auth.guard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(AuthGuard)
    @Get('status')
    async login(@Req() req: any) {
        const user = await this.userService.getUserOrFail(req.user.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            payed: user.payed,
            shouldPay: user.shouldPay,
        }
    }

    @UseGuards(AdminAuthGuard)
    @Get('list')
    async users(@Req() req: any) {
        const users = await this.userService.getAll();
        if (!users) {
            throw new UnauthorizedException();
        }
        return users;
    }

    @UseGuards(AdminAuthGuard)
    @Get(':id')
    async user(@Param('id') id: string) {
        const user = await this.userService.getUserOrFail(id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    @UseGuards(AdminAuthGuard)
    @Post('payment')
    async payment(@Body() payment: { userId: string, shouldPay: boolean, payed: boolean }) {
        const user = await this.userService.getUserOrFail(payment.userId);
        if (!user) {
            throw new NotFoundException();
        }
        user.payed = payment.payed;
        user.shouldPay = payment.shouldPay;
        return this.userService.save(user);
    }

}
