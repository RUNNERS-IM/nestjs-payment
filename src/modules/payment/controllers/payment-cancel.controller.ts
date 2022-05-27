import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { Auth, AuthUser } from '../../../decorators';
import { RoleType } from '../../../constants';
import { UserEntity } from '../../user/entities/user.entity';
import { PaymentPrepareService } from '../services/payment-prepare.service';
import { ApiPath } from '../../../constants/api-path';
import {
  PaymentCancelListResponse,
  PaymentCancelRetrieveResponse,
} from '../responses/payment-cancel.response';
import { CreatePaymentCancelDto } from '../dtos/create-payment-cancel.dto';

@Controller(ApiPath.API + 'payments/cancels')
@ApiTags(ApiTag.PAYMENT_CANCEL)
export class PaymentCancelController {
  constructor(private paymentPrepareService: PaymentPrepareService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '결제취소 생성 API',
    description: '결제취소를 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '결제취소 생성 성공시 결과 예시',
    type: PaymentCancelListResponse,
  })
  async createPrepare(
    @AuthUser() user: UserEntity,
    @Request() req,
    @Body() paymentCancelCreateDto: CreatePaymentCancelDto,
  ) {
    return [];
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '결제취소 상세 조회 API',
    description: '결제취소를 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '결제취소 상세 조회 성공시 결과 예시',
    type: PaymentCancelRetrieveResponse,
  })
  async getPaymentCancel(@AuthUser() user: UserEntity) {
    return [];
  }
}
