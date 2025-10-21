import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { SapCreateUserDto } from './sap.dto';

@Injectable()
export class SapService {
  async createUser(payload: SapCreateUserDto) {
    const sapId = this.generateSapId();

    return {
      ...payload,
      sapId,
    };
  }

  private generateSapId(): string {
    return randomUUID();
  }
}
