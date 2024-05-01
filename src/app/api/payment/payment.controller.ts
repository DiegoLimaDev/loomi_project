import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { PaymentService } from 'src/app/infra/payment/payment.service';
import { IPaymentService } from 'src/app/interfaces/payment/payment.interface';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController implements IPaymentService {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('process/:id')
  async processPayment(
    @Body('amount') amount: number,
    @Param('id') orderId: number,
  ): Promise<{ paymentStatus: string }> {
    return await this.paymentService.processPayment(amount, orderId);
  }
}
