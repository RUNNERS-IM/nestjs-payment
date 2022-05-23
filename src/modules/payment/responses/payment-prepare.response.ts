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
import { PaymentPrepareEntity } from '../entities/payment-prepare.entity';

// Main section
export class PaymentPrepareCreateResponse extends CreateResponse<PaymentPrepareEntity> {
  @ApiProperty({ type: PaymentPrepareEntity })
  data?: PaymentPrepareEntity; // 결과 데이터
}
export class PaymentPrepareListResponse extends ListResponse<PaymentPrepareEntity> {
  @ApiProperty({ type: [PaymentPrepareEntity] })
  data?: PaymentPrepareEntity[]; // 결과 데이터
}
export class PaymentPrepareRetrieveResponse extends RetrieveResponse<PaymentPrepareEntity> {
  @ApiProperty({ type: PaymentPrepareEntity })
  data?: PaymentPrepareEntity; // 결과 데이터
}
export class PaymentPrepareUpdateResponse extends UpdateResponse<PaymentPrepareEntity> {
  @ApiProperty({ type: PaymentPrepareEntity })
  data?: PaymentPrepareEntity; // 결과 데이터
}
