import { Injectable } from '@nestjs/common';
import { RandomPercentage } from 'src/app/utils/random.util';
import { Stripe } from 'stripe';
import { OrderService } from '../order/order.service';
import { OrderStatus } from 'src/app/entities/order/order.domain';
import { IPaymentService } from 'src/app/interfaces/payment/payment.interface';
import { ProductService } from '../product/product.service';
import { OrderItemsService } from '../order-items/order-items.service';
import { PaymentDto } from 'src/app/dto/payment/payment.dto';

@Injectable()
export class PaymentService implements IPaymentService {
  private stripe: Stripe;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private orderItemsService: OrderItemsService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_KEY);
  }

  async processPayment(
    amount: PaymentDto,
    orderId: number,
  ): Promise<{ paymentStatus: string }> {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: 'tok_visa',
      },
    });

    const confirm = RandomPercentage.generatePercentage();

    const order = await this.orderService.getOne(orderId);

    if (confirm) {
      await this.orderService.edit(orderId, {
        ...order,
        status: OrderStatus.Confirmed,
      });

      const orderItems = await this.orderItemsService.getItemsInOrder(order.id);

      orderItems.forEach(async (item) => {
        const product = await this.productService.getOneByName(item.itemName);
        await this.productService.edit(product.id, {
          ...product,
          stock: product.stock - item.qty,
        });
      });
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount.amount,
      currency: 'brl',
      payment_method: paymentMethod.id,
      confirm,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    });

    const confirmPayment = await this.stripe.paymentIntents.retrieve(
      paymentIntent.id,
    );
    if (confirmPayment.status === 'succeeded') {
      return { paymentStatus: 'approved' };
    } else {
      return { paymentStatus: 'denied' };
    }
  }
}
