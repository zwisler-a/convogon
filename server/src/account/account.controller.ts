import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { AccountService } from './account.service';
import { AccountStatusDto } from './dto/account-status.dto';
import { AccountEntity } from './account.entity';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get account status',
    description: 'Returns payment status for the authenticated user.',
    operationId: 'getAccountStatus',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user payment status.',
    type: AccountStatusDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('status')
  async status(@Req() req: any): Promise<AccountStatusDto> {
    const user = await this.accountService.getUserOrFail(req.user.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      payed: !(user.personas?.some((persona) => !persona.paid) ?? false),
      shouldPay: user.personas.length > 0,
      message: user.message,
    };
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Returns a list of all registered users (admin only).',
    operationId: 'getAllAccounts',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of users.',
    type: AccountEntity,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('list')
  async getAllAccounts(@Req() req: any) {
    const users = await this.accountService.getAll();
    if (!users) {
      throw new UnauthorizedException();
    }
    return users;
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Fetch a single user by their unique ID (admin only).',
    operationId: 'getAccountById',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user',
    example: 'a3f8c9b0-1a2b-4e6d-b3b9-8f6a5c5a9e1d',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user details.',
    type: AccountEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    const user = await this.accountService.getUserOrFail(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user payment info',
    description: 'Update payment and billing status of a user (admin only).',
    operationId: 'updateAccountStatus',
  })
  @ApiBody({
    schema: {
      properties: {
        userId: {
          type: 'string',
          example: 'a3f8c9b0-1a2b-4e6d-b3b9-8f6a5c5a9e1d',
        },
        shouldPay: { type: 'boolean', example: true },
        payed: { type: 'boolean', example: false },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated payment information.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('payment')
  async payment(
    @Body() payment: { userId: string; shouldPay: boolean; payed: boolean },
  ) {
    const user = await this.accountService.getUserOrFail(payment.userId);
    if (!user) {
      throw new NotFoundException();
    }
    user.personas.forEach((persona) => {
      persona.paid = payment.payed;
      if (!persona.paymentTimestamp)
        persona.paymentTimestamp = new Date();
    });
    return this.accountService.save(user);
  }
}
