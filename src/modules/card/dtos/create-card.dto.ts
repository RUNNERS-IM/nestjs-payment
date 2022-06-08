// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { CardEntity } from '../entities/card.entity';

// Main section
export class CreateCardDto extends PickType(PartialType(CardEntity), [
  'title',
  'cardNumber',
  'expiryYear',
  'expiryMonth',
  'birth',
  'pwd2digit',
  'cvc',
] as const) {}
