import {Controller, Get} from "@nestjs/common";
import * as process from "node:process";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("app")
@Controller()
export class AppController {
    @ApiOperation({
        operationId: 'getVersion',
    })
    @ApiResponse({status: 200, type: String})
    @Get('/version')
    version() {
        return process.env.GIT_COMMIT_HASH || 'dev';
    }
}