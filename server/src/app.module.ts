import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from "./user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "./constants";

@Module({
    imports: [UserModule, JwtModule.register({secret: jwtSecret})],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
