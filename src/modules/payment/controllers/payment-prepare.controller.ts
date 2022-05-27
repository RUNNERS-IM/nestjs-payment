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
  PaymentPrepareListResponse,
  PaymentPrepareRetrieveResponse,
} from '../responses/payment-prepare.response';
import { CreatePaymentPrepareDto } from '../dtos/create-payment-prepare.dto';
import { PaymentPrepareEntity } from '../entities/payment-prepare.entity';

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
    summary: '사전결제 생성 API',
    description: '사전결제을 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '사전결제 생성 성공시 결과 예시',
    type: PaymentPrepareCreateResponse,
  })
  async createPrepare(
    @AuthUser() user: UserEntity,
    @Request() req,
    @Body() createPaymentPrepareDto: CreatePaymentPrepareDto,
  ) {
    // Create PaymentPrepare
    const paymentPrepare: PaymentPrepareEntity = await this.paymentPrepareService.create({
      buyerId: user.id,
      ...createPaymentPrepareDto,
    });

    // Return PaymentPrepare
    return new PaymentPrepareCreateResponse(paymentPrepare);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '사전결제 리스트 조회 API',
    description: '사전결제 리스트를 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '사전결제 리스트 조회 성공시 결과 예시',
    type: PaymentPrepareListResponse,
  })
  async getPaymentPrepares(@AuthUser() user: UserEntity, @Request() req) {
    const paymentPrepares: PaymentPrepareEntity[] = await this.paymentPrepareService.find({
      buyerId: user.id,
    });
    return new PaymentPrepareListResponse(paymentPrepares);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '사전결제 상세 조회 API',
    description: '사전결제를 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '사전결제 상세 조회 성공시 결과 예시',
    type: PaymentPrepareRetrieveResponse,
  })
  async getPaymentPrepare(@AuthUser() user: UserEntity, @Request() req, @Param('id') id: Uuid) {
    const paymentPrepare: PaymentPrepareEntity = await this.paymentPrepareService.findOne({
      buyerId: user.id,
      id,
    });
    return new PaymentPrepareRetrieveResponse(paymentPrepare);
  }
}
