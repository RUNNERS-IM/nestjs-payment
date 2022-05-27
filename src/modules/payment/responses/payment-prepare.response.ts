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
import { PaymentPrepareEntity } from '../entities/payment-prepare.entity';

// Main section
export class PaymentPrepareCreateResponse extends CreateResponse<PaymentPrepareEntity> {
  @ApiPropertyOptional({ type: PaymentPrepareEntity })
  data?: PaymentPrepareEntity; // 결과 데이터
}
export class PaymentPrepareListResponse extends ListResponse<PaymentPrepareEntity> {
  @ApiPropertyOptional({ type: [PaymentPrepareEntity], isArray: true })
  data?: PaymentPrepareEntity[]; // 결과 데이터
}
export class PaymentPrepareRetrieveResponse extends RetrieveResponse<PaymentPrepareEntity> {
  @ApiPropertyOptional({ type: PaymentPrepareEntity })
  data?: PaymentPrepareEntity; // 결과 데이터
}
export class PaymentPrepareUpdateResponse extends UpdateResponse<PaymentPrepareEntity> {
  @ApiPropertyOptional({ type: PaymentPrepareEntity })
  data?: PaymentPrepareEntity; // 결과 데이터
}
