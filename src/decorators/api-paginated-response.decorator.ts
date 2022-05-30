// Nestjs
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';

// Third party
import { Paginated } from 'nestjs-paginate/lib/paginate';

// Main Section

export const ApiPaginatedResponse = <TModel extends Type<any>>(
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
              message: { type: 'string', default: '리스트 및 페이지 조회를 완료하였습니다' },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                properties: {
                  itemsPerPage: { type: 'number', default: 20 },
                  totalItems: { type: 'number', default: 1000 },
                  currentPage: { type: 'number', default: 1 },
                  totalPages: { type: 'number', default: 1 },
                  sortBy: { type: 'array', default: ['id', 'DESC'] },
                  searchBy: { type: 'array', default: 'title' },
                  search: { type: 'string', default: '가나다' },
                  filter: { type: 'array', default: [] },
                },
              },
              links: {
                properties: {
                  first: {
                    type: 'string',
                    default:
                      'https://admin.labcode.kr/adm/v1/entity?page=1&limit=20&sortBy=id:DESC&search=가나다',
                  },
                  previous: {
                    type: 'string',
                    default:
                      'https://admin.labcode.kr/adm/v1/entity?page=5&limit=20&sortBy=id:DESC&search=가나다',
                  },
                  current: {
                    type: 'string',
                    default:
                      'https://admin.labcode.kr/adm/v1/entity?page=6&limit=20&sortBy=id:DESC&search=가나다',
                  },
                  next: {
                    type: 'string',
                    default:
                      'https://admin.labcode.kr/adm/v1/entity?page=7&limit=20&sortBy=id:DESC&search=가나다',
                  },
                  last: {
                    type: 'string',
                    default:
                      'https://admin.labcode.kr/adm/v1/entity?page=50&limit=20&sortBy=id:DESC&search=가나다',
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};
