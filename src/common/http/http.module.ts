import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { HttpClientService } from './http-client.service';

@Module({
  imports: [ConfigModule, AxiosHttpModule],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpModule {}
