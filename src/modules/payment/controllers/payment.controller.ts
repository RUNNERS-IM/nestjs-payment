import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { PaymentService } from '../services/payment.service';
import { ApiPath } from '../../../constants/api-path';

@Controller(ApiPath.API + 'payments')
@ApiTags(ApiTag.PAYMENT)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // @Get()
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse()
  // async getPayments(@AuthUser() user: UserEntity) {
  //   // return this.paymentService.findAll()
  // }
  //
  // @Get(':id')
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse()
  // async getPayment(@AuthUser() user: UserEntity) {
  //   console.log('getPayment');
  //   // return this.paymentService.find(id)
  // }
  //
  // @Post()
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse()
  // async createPayment(@AuthUser() user: UserEntity) {
  //   console.log('createPayment');
  //   // return this.paymentService.create({})
  // }
}
