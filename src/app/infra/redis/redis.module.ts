import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { RedisController } from 'src/app/api/redis/redis.controller';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT) || 6379,
          password: process.env.REDIS_PASSWORD || undefined,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT', RedisService],
  controllers: [RedisController],
})
export class RedisModule {}
