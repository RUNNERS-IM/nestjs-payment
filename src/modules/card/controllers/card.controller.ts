import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiTag } from '../../../constants/api-tag';
import { CardService } from '../services/card.service';
import { ApiPath } from '../../../constants/api-path';
import { Auth, AuthUser } from '../../../decorators';
import { RoleType } from '../../../constants';
import { UserEntity } from '../../user/entities/user.entity';
import { CardEntity } from '../entities/card.entity';
import {
  CardCreateResponse,
  CardListResponse,
  CardRetrieveResponse,
  CardUpdateResponse,
} from '../responses/card.response';
import { CreateCardDto } from '../dtos/create-card.dto';
import { ApiListResponse } from '../../../decorators/api-list-response.decorator';

@Controller(ApiPath.API + 'cards')
@ApiTags(ApiTag.CARD)
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '카드 생성 API',
    description: '카드 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '카드 생성 성공시 결과 예시',
    type: CardCreateResponse,
  })
  async createCard(@AuthUser() user: UserEntity, @Body() createCardDto: CreateCardDto) {
    // Create card
    const card: CardEntity = await this.cardService.create({ userId: user.id, ...createCardDto });

    // Return Card
    return new CardCreateResponse(card);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '카드 리스트 조회 API',
    description: '카드 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(CardEntity, { description: '카드 리스트 조회 성공시 결과 예시' })
  async getCards(@AuthUser() user: UserEntity) {
    // Create card
    const cards: CardEntity[] = await this.cardService.find({ userId: user.id });

    // Return Card
    return new CardListResponse(cards);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '카드 상세 조회 API',
    description: '카드 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '카드 상세 조회 성공시 결과 예시',
    type: CardRetrieveResponse,
  })
  async getCard(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Create card
    const card: CardEntity = await this.cardService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return Card
    return new CardRetrieveResponse(card);
  }

  @Patch(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '카드 부분 수정 API',
    description: '카드 부분 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '카드 부분 수정 성공시 결과 예시',
    type: CardUpdateResponse,
  })
  async partialUpdateCard(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Get card
    const card: CardEntity = await this.cardService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return Card
    return new CardUpdateResponse(card);
  }

  @Put(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '카드 전체 수정 API',
    description: '카드 전체 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '카드 전체 수정 성공시 결과 예시',
    type: CardUpdateResponse,
  })
  async updateCard(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Get card
    const card: CardEntity = await this.cardService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return Card
    return new CardUpdateResponse(card);
  }
}
