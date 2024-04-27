import { Controller } from '@nestjs/common';
import { ClientService } from 'src/app/infra/client/client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}
}
