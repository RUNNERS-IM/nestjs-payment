// Nestjs
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Type section
declare type Column<T> = Extract<keyof T, string>;
declare type Order<T> = [Column<T>, 'ASC' | 'DESC'];
declare type SortBy<T> = Order<T>[];

// Class section
export class Response<T> {
  constructor(data, message?, statusCode?: number, errors?) {
    this.data = data;
    if (statusCode) this.statusCode = statusCode;
    if (message) this.message = message;
    if (errors) this.errors = errors;
  }

  @ApiProperty({ default: 200 })
  statusCode = 200; // HTTP 상태 코드

  @ApiPropertyOptional({ default: '완료되었습니다.' })
  message?: string = '완료되었습니다.'; // 상세 메세지

  @ApiPropertyOptional()
  data?: T | T[]; // 결과 데이터

  @ApiPropertyOptional()
  errors?: any; // 에러 내역
}

export class PaginatedListBaseResponse<T> {
  constructor(paginatedData, message?, statusCode?, errors?) {
    this.data = paginatedData.data;
    this.meta = paginatedData.meta;
    this.links = paginatedData.links;

    if (statusCode) this.statusCode = statusCode;
    if (message) this.message = message;
    if (errors) this.errors = errors;
  }

  @ApiProperty({ default: 200 })
  statusCode = 200; // HTTP 상태 코드

  @ApiPropertyOptional({ default: '리스트 조회를 완료하였습니다.' })
  message?: string = '리스트 조회를 완료하였습니다.'; // 상세 메세지

  @ApiPropertyOptional()
  data: T[];

  @ApiProperty()
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: SortBy<T>;
    searchBy: Column<T>[];
    search: string;
    filter?: {
      [column: string]: string | string[];
    };
  };

  @ApiProperty()
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };

  errors?: any; // 에러 내역
}

export class ListResponse<T> extends Response<T> {
  @ApiPropertyOptional({ default: '리스트 조회를 완료하였습니다.' })
  message?: string = '리스트 조회를 완료하였습니다.'; // 상세 메세지

  @ApiPropertyOptional()
  data?: T[]; // 결과 데이터
}

export class RetrieveResponse<T> extends Response<T> {
  @ApiPropertyOptional({ default: '상세 조회를 완료하였습니다.' })
  message?: string = '객체 상세 조회를 완료하였습니다.'; // 상세 메세지

  @ApiPropertyOptional()
  data?: T; // 결과 데이터
}

export class CreateResponse<T> extends Response<T> {
  @ApiProperty({ default: 201 })
  statusCode: number = 201; // HTTP 상태 코드

  @ApiPropertyOptional({ default: '생성을 완료하였습니다.' })
  message?: string = '객체 생성을 완료하였습니다.'; // 상세 메세지

  @ApiPropertyOptional()
  data?: T; // 결과 데이터
}

export class UpdateResponse<T> extends Response<T> {
  @ApiPropertyOptional({ default: '수정을 완료하였습니다.' })
  message?: string = '객체 수정을 완료하였습니다.'; // 상세 메세지

  @ApiPropertyOptional()
  data?: T; // 결과 데이터
}

export class DeleteResponse<T> extends Response<T> {
  @ApiProperty({ default: 204 })
  statusCode: number = 204; // HTTP 상태 코드

  @ApiPropertyOptional({ default: '객체 삭제를 완료하였습니다.' })
  message?: string = '객체 삭제를 완료하였습니다.'; // 상세 메세지
}
