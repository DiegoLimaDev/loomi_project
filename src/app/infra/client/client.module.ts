import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/app/entities/client/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
