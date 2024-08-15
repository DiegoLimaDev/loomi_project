import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ClientDomain } from 'src/app/entities/client/client.domain';
import { UserDomain } from 'src/app/entities/user/user.domain';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { RolesGuard } from 'src/app/infra/auth/guards/role.guard';
import { ClientService } from 'src/app/infra/client/client.service';
import { IClientService } from 'src/app/interfaces/client/client.interface';

@ApiBearerAuth()
@ApiTags('Client')
@Controller('client')
@UseGuards(JwtAuthGuard)
export class ClientController implements IClientService {
  constructor(private clientService: ClientService) {}

  @Get(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Get em um cliente por id' })
  async getOne(@Param('id') id: number): Promise<ClientDomain> {
    return await this.clientService.getOne(id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @ApiOperation({ description: 'Get em todos os clientes' })
  async getAll(): Promise<ClientDomain[]> {
    return await this.clientService.getAll();
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Edita um cliente' })
  async edit(
    @Param(':id') id: number,
    @Body() client: ClientDomain,
  ): Promise<{ deleted: boolean }> {
    return await this.clientService.edit(id, client);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Deleta um cliente' })
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return await this.clientService.delete(id);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Deleta um cliente de forma lógica' })
  @ApiParam({ name: 'id', example: 1 })
  async deleteLogical(id: number): Promise<{ deleted: boolean }> {
    return await this.clientService.deleteLogical(id);
  }

  @Get('byUser')
  @ApiOperation({ description: 'Encontra o cliente ligado ao usuário' })
  @UseGuards(RolesGuard)
  async getOneByFkUserId(@Body() user: UserDomain): Promise<ClientDomain> {
    return await this.clientService.getOneByFkUserId(user);
  }
}
