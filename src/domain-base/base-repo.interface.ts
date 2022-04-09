import { DeepPartial, FindConditions, FindManyOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntityModel } from './base-entity-model';

export interface IBaseRepository<T extends BaseEntityModel> {
  create(data: T | any): Promise<T>;

  insertMany(data: DeepPartial<T>[]): Promise<any>;

  findOneById(id: any): Promise<T>;

  findByIds(ids: any[]): Promise<T[]>;

  findOne(filterCondition: any): Promise<T>;

  findWithOptions(relations: FindManyOptions<T>): Promise<T[]>;

  findAndCountWithOptions(
    relations: FindManyOptions<T>,
  ): Promise<[T[], number]>;

  findWithConditions(relations: FindConditions<T>): Promise<T[]>;

  findAndCountWithConditons(
    relations: FindConditions<T>,
  ): Promise<[T[], number]>;

  deleteById(id: any): Promise<number>;

  delete(condition: FindConditions<T>): Promise<number>;

  deleteByIdSoftly(id: any): Promise<number>;

  deleteSoftly(condition: FindConditions<T>): Promise<number>;

  updateById(id: any, update: QueryDeepPartialEntity<T>): Promise<number>;

  update(
    condition: FindConditions<T>,
    update: QueryDeepPartialEntity<T>,
  ): Promise<number>;
}
