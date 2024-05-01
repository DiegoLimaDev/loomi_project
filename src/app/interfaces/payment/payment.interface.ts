export interface IPaymentService {
  processPayment(
    amount: number,
    orderId: number,
  ): Promise<{ paymentStatus: string }>;
}
