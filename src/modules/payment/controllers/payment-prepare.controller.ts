import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { Auth, AuthUser } from '../../../decorators';
import { RoleType } from '../../../constants';
import { UserEntity } from '../../user/entities/user.entity';
import { PaymentPrepareService } from '../services/payment-prepare.service';
import { ApiPath } from '../../../constants/api-path';
import { PaymentService } from '../services/payment.service';
import {
  PaymentPrepareCreateResponse,
  PaymentPrepareRetrieveResponse,
} from '../responses/payment-prepare.response';
import { CreatePaymentPrepareDto } from '../dtos/create-payment-prepare.dto';

@Controller(ApiPath.API + 'payments/prepares')
@ApiTags(ApiTag.PAYMENT_PREPARE)
export class PaymentPrepareController {
  constructor(
    private paymentPrepareService: PaymentPrepareService,
    private paymentService: PaymentService,
  ) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '결제사전등록 생성 API',
    description: '결제사전등록을 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '결제사전등록 생성 성공시 결과 예시',
    type: PaymentPrepareCreateResponse,
  })
  async createPrepare(
    @AuthUser() user: UserEntity,
    @Request() req,
    @Body() createPaymentPrepareDto: CreatePaymentPrepareDto,
  ) {
    // Create PaymentPrepare
    const paymentPrepare = await this.paymentPrepareService.create({
      buyerId: user.id,
      ...createPaymentPrepareDto,
    });

    // Iamport 로직 필요

    // Return PaymentPrepare
    return new PaymentPrepareCreateResponse(paymentPrepare);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '결제예정금액 사전등록 상세조회 API',
    description: '결제예정금액 사전등록을 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '결제예정금액 사전등록 상세조회 성공시 결과 예시',
    type: PaymentPrepareRetrieveResponse,
  })
  async getPaymentPrepare(@AuthUser() user: UserEntity, @Request() req, @Param('id') id: Uuid) {
    return [];
  }
}
