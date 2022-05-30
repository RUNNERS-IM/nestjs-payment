import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { PaymentService } from '../services/payment.service';
import { ApiPath } from '../../../constants/api-path';
import { Auth, AuthUser } from '../../../decorators';
import { RoleType } from '../../../constants';
import { UserEntity } from '../../user/entities/user.entity';
import {
  PaymentCreateResponse,
  PaymentListResponse,
  PaymentRetrieveResponse,
} from '../responses/payment.response';
import { PaymentEntity } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { CreateCardPaymentDto } from '../dtos/create-card-payment.dto';
import { IamportService } from '../../../shared/services/iamport.service';
import { PaymentPrepareService } from '../services/payment-prepare.service';
import { CardService } from '../../card/services/card.service';

@Controller(ApiPath.API + 'payments')
@ApiTags(ApiTag.PAYMENT)
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private paymentPrepareService: PaymentPrepareService,
    private cardService: CardService,
    private readonly iamportService: IamportService,
  ) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '일반 결제 API',
    description: `
일반 결제하는 API 입니다.
<h1>절차</h1>
<p>
사전결제 생성 -> 일반 결제 -> 정보 등록 (일반결제 API)
<p>
<h1>일반결제 개발 가이드</h1>
<p>
<a href="https://docs.iamport.kr/implementation/payment">아임포트 일반결제 연동</a>
<a href="https://github.com/iamport/iamport-manual/blob/master/%EC%9D%B8%EC%A6%9D%EA%B2%B0%EC%A0%9C/sample/uplus.md">토스 일반결제 연동</a>
<a href="https://github.com/iamport/iamport-manual/blob/master/%EC%9D%B8%EC%A6%9D%EA%B2%B0%EC%A0%9C/sample/kakao.md">카카오페이 일반결제 연동</a>
<a href="https://github.com/iamport/iamport-manual/blob/master/%EC%9D%B8%EC%A6%9D%EA%B2%B0%EC%A0%9C/sample/kakao.md">네이버페이 일반결제 연동</a>
</p>
`,
  })
  @ApiOkResponse({
    description: '일반 결제 성공시 결과 예시',
    type: PaymentCreateResponse,
  })
  async createPayment(@AuthUser() user: UserEntity, @Body() createPaymentDto: CreatePaymentDto) {
    const buyerId = user.id;

    // Create card
    const payment: PaymentEntity = await this.paymentService.create({
      buyerId: buyerId,
      ...createPaymentDto,
    });

    // Return Card
    return new PaymentCreateResponse(payment);
  }

  @Post('card')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '카드 결제 API',
    description: '카드 결제하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '카드 결제 성공시 결과 예시',
    type: PaymentCreateResponse,
  })
  async createCardPayment(
    @AuthUser() user: UserEntity,
    @Body() createCardPaymentDto: CreateCardPaymentDto,
  ) {
    // Variable section
    const buyerId = user.id;

    // Pay (Iamport)
    const payment: PaymentEntity = await this.paymentService.create({
      buyerId: buyerId,
      ...createCardPaymentDto,
    });

    // Return Card
    return new PaymentCreateResponse(payment);
  }

  @Get('bought')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '구매한 결제내역 리스트 조회 API',
    description: '구매한 결제내역 리스트 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '구매한 결제내역 리스트 조회 성공시 결과 예시',
    type: PaymentListResponse,
  })
  async getBoughtPayments(@AuthUser() user: UserEntity) {
    const payments: PaymentEntity[] = await this.paymentService.find({ buyerId: user.id });
    return new PaymentListResponse(payments);
  }

  @Get('bought/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '구매한 결제내역 상세 조회 API',
    description: '구매한 결제내역 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '구매한 결제내역 상세 조회 성공시 결과 예시',
    type: PaymentRetrieveResponse,
  })
  async getBoughtPayment(@AuthUser() user: UserEntity, @Request() req, @Param('id') id: Uuid) {
    const payment: PaymentEntity = await this.paymentService.findOneOrFail({
      buyerId: user.id,
      id: id,
    });
    return new PaymentRetrieveResponse(payment);
  }

  @Get('sold')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '판매한 결제내역 상세 조회 API',
    description: '판매한 결제내역 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '판매한 결제내역 리스트 조회 성공시 결과 예시',
    type: PaymentRetrieveResponse,
  })
  async getSoldPayments(@AuthUser() user: UserEntity, @Request() req) {
    const payments: PaymentEntity[] = await this.paymentService.find({ sellerId: user.id });
    return new PaymentListResponse(payments);
  }

  @Get('sold/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '판매한 결제내역 상세 조회 API',
    description: '판매한 결제내역 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '판매한 결제 상세 조회 성공시 결과 예시',
    type: PaymentRetrieveResponse,
  })
  async getSoldPayment(@AuthUser() user: UserEntity, @Request() req, @Param('id') id: Uuid) {
    const payment: PaymentEntity = await this.paymentService.findOneOrFail({
      sellerId: user.id,
      id: id,
    });
    return new PaymentRetrieveResponse(payment);
  }
}
