import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SapService } from './sap.service';
import { SapCreateUserDto } from './sap.dto';

@ApiTags('sap')
@Controller('integration/sap')
export class SapController {
  constructor(private readonly sapService: SapService) {}

  @Post('/users')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Headers('x-api-key') apiKey: string, @Body() payload: SapCreateUserDto) {
    const expectedKey = process.env.SAP_INTEGRATION_API_KEY ?? 'sap-simulated-key';
    if (!apiKey || apiKey !== expectedKey) {
      throw new UnauthorizedException('Invalid API key');
    }
    return this.sapService.createUser(payload);
  }
}
