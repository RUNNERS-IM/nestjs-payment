// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Response
import {
  CreateResponse,
  ListResponse,
  RetrieveResponse,
  UpdateResponse,
} from '../../../constants/response';

// Entity
import { PaymentCancelEntity } from '../entities/payment-cancel.entity';

// Main section
export class PaymentCancelCreateResponse extends CreateResponse<PaymentCancelEntity> {
  @ApiProperty({ type: PaymentCancelEntity })
  data?: PaymentCancelEntity; // 결과 데이터
}
export class PaymentCancelListResponse extends ListResponse<PaymentCancelEntity> {
  @ApiProperty({ type: [PaymentCancelEntity] })
  data?: PaymentCancelEntity[]; // 결과 데이터
}
export class PaymentCancelRetrieveResponse extends RetrieveResponse<PaymentCancelEntity> {
  @ApiProperty({ type: PaymentCancelEntity })
  data?: PaymentCancelEntity; // 결과 데이터
}
export class PaymentCancelUpdateResponse extends UpdateResponse<PaymentCancelEntity> {
  @ApiProperty({ type: PaymentCancelEntity })
  data?: PaymentCancelEntity; // 결과 데이터
}
