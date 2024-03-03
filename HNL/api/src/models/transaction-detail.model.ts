import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import { Product } from './product.model';
import { CartDetail } from './cart-detail.model';
import { Transaction } from './transaction.model';

enum StatusTransactionDetailEnum {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

@model({settings: {strict: false}})
export class TransactionDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @belongsTo(() => Product)
  ProductId?: string;
  
  @belongsTo(() => CartDetail)
  CartDetailId?: string;

  @belongsTo(() => Transaction)
  TransactionId?: string;

  @property({
    type: 'number',
  })
  Quantity?: number;

  @property({
    type: 'number',
  })
  UnitPrice?: number;

  @property({
    type: 'number',
  })
  Subtotal?: number;

  @property({
    type: 'number',
    enum: Object.values(StatusTransactionDetailEnum),
  })
  Status?: StatusTransactionDetailEnum;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TransactionDetail>) {
    super(data);
  }
}

export interface TransactionDetailRelations {
  // describe navigational properties here
}

export type TransactionDetailWithRelations = TransactionDetail & TransactionDetailRelations;
