import {Injectable, Logger} from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    private logger: Logger = new Logger('MailService');
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST || '127.0.0.1',
            port: parseInt(process.env.MAIL_PORT || '1025'),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        this.transporter.on('error', err => {
            this.logger.error(err);
        })
    }

    async sendMail(to: string, subject: string, text: string, html?: string) {
        this.logger.debug(`Sending mail to mail ${to}: ${subject}`);
        const info = await this.transporter.sendMail({
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to,
            subject,
            text,
            html
        });
        console.log(info);
    }
}