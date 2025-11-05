import {Module} from "@nestjs/common";
import {MailService} from "./mail.service";
import {makeCounterProvider} from "@willsoto/nestjs-prometheus";
import {METRICS} from "../constants";


@Module({
    imports: [],
    controllers: [],
    providers: [
        MailService,
        makeCounterProvider({
            name: METRICS.MAIL_SEND,
            help: "Number of mails sent",
        }),
    ],
    exports: [MailService]
})
export class MailModule {
}