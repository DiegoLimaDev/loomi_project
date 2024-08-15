import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentDto } from 'src/app/dto/payment/payment.dto';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { PaymentService } from 'src/app/infra/payment/payment.service';
import { IPaymentService } from 'src/app/interfaces/payment/payment.interface';

@ApiBearerAuth()
@ApiTags('Payment')
@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController implements IPaymentService {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('process/:id')
  @ApiBody({ type: PaymentDto })
  @ApiParam({ name: 'id', example: 1 })
  @ApiOperation({ description: 'Processa o pagamento' })
  async processPayment(
    @Body() amount: PaymentDto,
    @Param('id') orderId: number,
  ): Promise<{ paymentStatus: string }> {
    return await this.paymentService.processPayment(amount, orderId);
  }
}
