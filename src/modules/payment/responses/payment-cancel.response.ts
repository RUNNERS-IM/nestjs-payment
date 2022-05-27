// Nestjs
import { ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiPropertyOptional({ type: PaymentCancelEntity })
  data?: PaymentCancelEntity; // 결과 데이터
}
export class PaymentCancelListResponse extends ListResponse<PaymentCancelEntity> {
  @ApiPropertyOptional({ type: [PaymentCancelEntity], isArray: true })
  data?: PaymentCancelEntity[]; // 결과 데이터
}
export class PaymentCancelRetrieveResponse extends RetrieveResponse<PaymentCancelEntity> {
  @ApiPropertyOptional({ type: PaymentCancelEntity })
  data?: PaymentCancelEntity; // 결과 데이터
}
export class PaymentCancelUpdateResponse extends UpdateResponse<PaymentCancelEntity> {
  @ApiPropertyOptional({ type: PaymentCancelEntity })
  data?: PaymentCancelEntity; // 결과 데이터
}
