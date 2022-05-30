// Nestjs
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';

// Third party
import { Paginated } from 'nestjs-paginate/lib/paginate';

// Main Section

export const ApiListResponse = <TModel extends Type<any>>(
  model: TModel,
  opts?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(Paginated, model),
    ApiOkResponse({
      ...opts,
      schema: {
        allOf: [
          { $ref: getSchemaPath(Paginated) },
          {
            properties: {
              statusCode: { type: 'number', default: 200 },
              message: { type: 'string', default: '리스트 조회를 완료하였습니다' },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
