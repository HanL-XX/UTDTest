import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {TransactionDetail, TransactionDetailRelations} from '../models';

export class TransactionDetailRepository extends DefaultCrudRepository<
  TransactionDetail,
  typeof TransactionDetail.prototype.Id,
  TransactionDetailRelations
> {
  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
  ) {
    super(TransactionDetail, dataSource);
  }
}
