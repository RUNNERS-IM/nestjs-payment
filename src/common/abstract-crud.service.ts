// Typeorm
import { DeepPartial } from 'typeorm';

// Third party
import { Paginated } from 'nestjs-paginate/lib/paginate';
import { PaginateQuery } from 'nestjs-paginate';

// Main section
export interface ICrudService<T> {
  search(filter, query: PaginateQuery): Promise<Paginated<T>>;

  getAll(): Promise<T[]>;

  getOne(id: number): Promise<T>;

  update(id: string, entity: DeepPartial<T>): Promise<T>;

  create<E extends DeepPartial<T>>(entity: E): Promise<T>;

  delete(id: string): Promise<T>;
}
