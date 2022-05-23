// Nestjs
import { Controller, Get, HttpCode, HttpStatus, Param, Request } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { SellerService } from '../services/seller.service';
import { Auth, AuthUser } from '../../../decorators';
import { RoleType } from '../../../constants';
import { UserEntity } from '../entities/user.entity';
import { PaymentService } from '../../payment/services/payment.service';
import { ApiPath } from '../../../constants/api-path';
import {
  PaymentListResponse,
  PaymentRetrieveResponse,
} from '../../payment/responses/payment.response';
import { PaymentEntity } from '../../payment/entities/payment.entity';

@Controller(ApiPath.API + 'sellers')
@ApiTags(ApiTag.SELLER)
export class SellerController {
  constructor(private sellerService: SellerService, private paymentService: PaymentService) {}

  @Get('payments')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '결제 리스트조회 성공시 결과 예시', type: PaymentListResponse })
  async getPayments(@AuthUser() user: UserEntity, @Request() req) {
    const payments: PaymentEntity[] = await this.paymentService.getSellerPayments(user.buyer.id);
    return new PaymentListResponse(payments);
  }

  @Get('payments/:paymentId')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: '결제 상세조회 성공시 결과 예시', type: PaymentRetrieveResponse })
  async getPayment(
    @AuthUser() user: UserEntity,
    @Request() req,
    @Param('paymentId') paymentId: Uuid,
  ) {
    const payment: PaymentEntity = await this.paymentService.getSellerPayment(
      paymentId,
      user.buyer.id,
    );
    return new PaymentRetrieveResponse(payment);
  }
}
