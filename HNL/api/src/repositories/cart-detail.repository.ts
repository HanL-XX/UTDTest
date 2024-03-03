import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {CartDetail, CartDetailRelations} from '../models';

export class CartDetailRepository extends DefaultCrudRepository<
  CartDetail,
  typeof CartDetail.prototype.Id,
  CartDetailRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(CartDetail, dataSource);
  }
}
