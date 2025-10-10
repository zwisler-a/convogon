import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {UserService} from "./user.service";
import {JwtPayloadDto} from "./jwt-payload.dto";
import {jwtSecret} from "../constants";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload: JwtPayloadDto = await this.jwtService.verifyAsync(token, {
                secret: jwtSecret,
            });
            request['user'] = await this.userService.getUserOrFail(payload.user_id);
            if (request['user'].role != 'admin') throw new UnauthorizedException();
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
