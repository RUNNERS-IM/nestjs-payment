import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { TranslationService } from '../../../shared/services/translation.service';
import { CardService } from '../services/card.service';
import { ApiPath } from '../../../constants/api-path';

@Controller(ApiPath.API + 'users')
@ApiTags(ApiTag.CARD)
export class CardController {
  constructor(
    private userService: CardService,
    private readonly translationService: TranslationService,
  ) {}
}
