import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { redisDto } from 'src/app/dto/redis/redis.dto';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { RedisService } from 'src/app/infra/redis/redis.service';

@ApiBearerAuth()
@ApiTags('redis')
@Controller('cache')
@UseGuards(JwtAuthGuard)
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @ApiBody({ type: redisDto })
  @ApiOperation({ description: 'Envia uma chave valor ao redis' })
  @Post('set')
  async setCache(@Body() data: { key: string; value: string }) {
    await this.redisService.set(data.key, data.value);
    return { success: true };
  }

  @ApiParam({ name: 'key', example: '1' })
  @ApiOperation({ description: 'get de um valor no redis' })
  @Get('get/:key')
  async getCache(@Param('key') key: string) {
    const value = await this.redisService.get(key);
    return { key, value };
  }
}
