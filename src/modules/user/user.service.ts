import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor() {}

  async create(createUserDto: CreateUserDto) {
    const sapId = this.generateSapId();
    const user = {
      ...createUserDto,
      sapId,
    } as const;
    this.logger.log(`Created user (SAP mode): ${user.email}`);
    return user;
  }

  private generateSapId(): string {
    return randomUUID();
  }
}
