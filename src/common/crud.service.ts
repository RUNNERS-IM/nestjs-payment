// Nestjs
import { Injectable, NotFoundException } from '@nestjs/common';

// Typeorm
import { BaseEntity, DeepPartial, FindConditions, FindManyOptions, Repository } from 'typeorm';

// Core
import { Paginated } from 'nestjs-paginate/lib/paginate';

// Dto
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { ICrudService } from './abstract-crud.service';
import { Optional } from '../types';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

// Main section

@Injectable()
export class CrudService<T extends BaseEntity> implements ICrudService<T> {
  private readonly entityName = this.genericRepository.metadata.targetName;

  constructor(private readonly genericRepository: Repository<T>) {}

  public async search(where, query: PaginateQuery): Promise<Paginated<T>> {
    // Return section
    return paginate(query, this.genericRepository, {
      sortableColumns: ['id'],
      searchableColumns: ['title'],
      where: where,
    });
  }

  // Find
  public async find(optionsOrConditions?: FindManyOptions<T> | FindConditions<T>): Promise<T[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.genericRepository.find(optionsOrConditions as any);
  }

  public async findOne(
    idOrOptionsOrConditions?: string | number | FindOneOptions<T> | FindConditions<T>,
    maybeOptions?: FindOneOptions<T>,
  ): Promise<Optional<T>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.genericRepository.findOne(idOrOptionsOrConditions as any, maybeOptions);
  }

  public async findOneOrFail(
    idOrOptionsOrConditions?: string | number | FindOneOptions<T> | FindConditions<T>,
    maybeOptions?: FindOneOptions<T>,
  ): Promise<Optional<T>> {
    try {
      return await this.genericRepository.findOneOrFail(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        idOrOptionsOrConditions as any,
        maybeOptions,
      );
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  // Get
  async getAll(): Promise<T[]> {
    return await this.genericRepository.find();
  }

  async getOne(id: number): Promise<T> {
    return await this.genericRepository.findOne(id);
  }

  // Create
  async create(entity: DeepPartial<T>) {
    return await this.genericRepository.create(entity).save();
  }

  async createBulk(entities: DeepPartial<T>[]): Promise<T[]> {
    const results = [];

    for (const entity of entities) {
      const instance: T = await this.create(entity);

      results.push(instance);
    }
    return results;
  }

  // Update
  async update(id: number | string, entity: DeepPartial<T>): Promise<T> {
    // Variable Section
    const instance = await this.genericRepository.findOne(id);

    // Update
    if (instance) {
      return await this.genericRepository.save(Object.assign(instance, entity));
    } else {
      throw new NotFoundException(id);
    }
  }

  // Find or create
  async findOneOrCreate(entity: DeepPartial<T>) {
    // Variable section
    let instance: T = await this.genericRepository.findOne({ where: entity });

    // Create
    if (!instance) {
      instance = await this.create(entity);
      console.log(instance, ' is created.');
    }

    // Return section
    return instance;
  }

  async findOrCreateBulk(entities: DeepPartial<T>[]): Promise<T[]> {
    const instances: T[] = [];

    // Get or create
    for (const entity of entities) {
      const instance: T = await this.findOneOrCreate(entity);
      instances.push(instance);
    }

    // Result section
    return instances;
  }

  // Crate or update
  async createOrUpdate(entity: DeepPartial<T>) {
    // Variable Section
    let instance: T;
    let entityId: number;

    // Set instance
    if (entity['id']) {
      entityId = entity['id'];
      instance = await this.getOne(entity['id'] as number);
      delete entity['id'];
    }

    // Create or update
    if (!instance) {
      instance = await this.create(entity);
      console.log(instance, ' is created.');
    } else {
      instance = await this.update(entityId, entity);
    }

    // Return section
    return instance;
  }

  async createOrUpdateBulk(entities: DeepPartial<T>[]): Promise<T[]> {
    const results = [];

    for (const entity of entities) {
      const instance: T = await this.createOrUpdate(entity);
      results.push(instance);
    }
    return results;
  }

  // Delete
  async delete(id: number | string): Promise<T> {
    const item = await this.genericRepository.findOne(id);
    await this.genericRepository.delete(id);
    return item;
  }
}
