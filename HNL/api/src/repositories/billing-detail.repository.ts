import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {BillingDetail, BillingDetailRelations} from '../models';

export class BillingDetailRepository extends DefaultCrudRepository<
  BillingDetail,
  typeof BillingDetail.prototype.Id,
  BillingDetailRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(BillingDetail, dataSource);
  }
}
