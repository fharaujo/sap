import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../common/http/http-client.service';
import { randomUUID } from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly http: HttpClientService,
    private readonly config: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const sapId = this.generateSapId();
    const user = {
      ...createUserDto,
      sapId,
    } as const;
    this.logger.log(`Created user (SAP mode): ${user.email}`);

    const base = this.config.get<string>('USER_API_BASE');
    if (base) {
      try {
        await this.http.post(`${base}/users`, user);
      } catch (err) {
        this.logger.warn(`Failed to sync user to external API: ${user.email}`);
      }
    }
    return user;
  }

  private generateSapId(): string {
    return randomUUID();
  }
}
