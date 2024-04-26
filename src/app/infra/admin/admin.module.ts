import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/app/entities/admin/admin.entity';
import { AdminController } from 'src/app/api/admin/admin.controller';

@Module({
  providers: [AdminService],
  imports: [TypeOrmModule.forFeature([Admin])],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
