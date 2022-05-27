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
import { PaymentEntity } from '../entities/payment.entity';

// Main section
export class PaymentCreateResponse extends CreateResponse<PaymentEntity> {
  @ApiPropertyOptional({ type: PaymentEntity })
  data?: PaymentEntity; // 결과 데이터
}
export class PaymentListResponse extends ListResponse<PaymentEntity> {
  @ApiPropertyOptional({ type: [PaymentEntity], isArray: true })
  data?: PaymentEntity[]; // 결과 데이터
}
export class PaymentUpdateResponse extends UpdateResponse<PaymentEntity> {
  @ApiPropertyOptional({ type: PaymentEntity })
  data?: PaymentEntity; // 결과 데이터
}
export class PaymentRetrieveResponse extends RetrieveResponse<PaymentEntity> {
  @ApiPropertyOptional({ type: PaymentEntity })
  data?: PaymentEntity; // 결과 데이터
}
