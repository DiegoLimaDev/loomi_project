import { PaymentDto } from 'src/app/dto/payment/payment.dto';

export interface IPaymentService {
  processPayment(
    amount: PaymentDto,
    orderId: number,
  ): Promise<{ paymentStatus: string }>;
}
