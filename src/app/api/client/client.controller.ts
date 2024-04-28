import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ClientDomain } from 'src/app/entities/client/client.domain';
import { UserDomain } from 'src/app/entities/user/user.domain';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { ClientService } from 'src/app/infra/client/client.service';
import { IClientService } from 'src/app/interfaces/client/client.interface';

@Controller('client')
@UseGuards(JwtAuthGuard)
export class ClientController implements IClientService {
  constructor(private clientService: ClientService) {}

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<ClientDomain> {
    return await this.clientService.getOne(id);
  }

  @Get()
  async getAll(): Promise<ClientDomain[]> {
    return await this.clientService.getAll();
  }

  @Patch(':id')
  async edit(
    @Param(':id') id: number,
    @Body() client: ClientDomain,
  ): Promise<{ deleted: boolean }> {
    return await this.clientService.edit(id, client);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return await this.clientService.delete(id);
  }

  @Delete(':id')
  async deleteLogical(id: number): Promise<{ deleted: boolean }> {
    return await this.clientService.deleteLogical(id);
  }

  @Get('byUser')
  async getOneByFkUserId(@Body() user: UserDomain): Promise<ClientDomain> {
    return await this.clientService.getOneByFkUserId(user);
  }
}
