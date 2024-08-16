import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { RedisService } from 'src/app/infra/redis/redis.service';

@Controller('cache')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post('set')
  async setCache(@Body() data: { key: string; value: string }) {
    await this.redisService.set(data.key, data.value);
    return { success: true };
  }

  @Get('get/:key')
  async getCache(@Param('key') key: string) {
    const value = await this.redisService.get(key);
    return { key, value };
  }
}
