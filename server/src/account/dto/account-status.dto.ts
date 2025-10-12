import {ApiProperty} from "@nestjs/swagger";

export class AccountStatusDto {
    @ApiProperty()
    payed: boolean;
    @ApiProperty()
    shouldPay: boolean;
    @ApiProperty()
    message: string;
}