import { Module } from '@nestjs/common';

import { SapService } from './sap.service';
import { SapController } from './sap.controller';

@Module({
  imports: [],
  controllers: [SapController],
  providers: [SapService],
  exports: [SapService],
})
export class SapIntegrationModule {}
