import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import { Cart } from './cart.model';
import { TransactionDetail } from './transaction-detail.model';

enum StatusTransactionEnum {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

@model({settings: {strict: false}})
export class Transaction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'date',
  })
  Date?: string;

  @property({
    type: 'number',
  })
  Amout?: number;

  @belongsTo(() => Cart)
  CartId?: string;

  @hasMany(() => TransactionDetail)
  Transactiondetails: TransactionDetail[];

  @property({
    type: 'number',
    enum: Object.values(StatusTransactionEnum),
  })
  Status?: StatusTransactionEnum;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
