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
import { CardEntity } from '../entities/card.entity';

// Main section
export class CardCreateResponse extends CreateResponse<CardEntity> {
  @ApiPropertyOptional({ type: CardEntity })
  data?: CardEntity; // 결과 데이터
}
export class CardListResponse extends ListResponse<CardEntity> {
  @ApiPropertyOptional({ type: [CardEntity], isArray: true })
  data?: CardEntity[]; // 결과 데이터
}
export class CardRetrieveResponse extends RetrieveResponse<CardEntity> {
  @ApiPropertyOptional({ type: CardEntity })
  data?: CardEntity; // 결과 데이터
}
export class CardUpdateResponse extends UpdateResponse<CardEntity> {
  @ApiPropertyOptional({ type: CardEntity })
  data?: CardEntity; // 결과 데이터
}
