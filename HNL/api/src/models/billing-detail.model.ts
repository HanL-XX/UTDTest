import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Product } from './product.model';
import { Billing } from './billing.model';

@model({settings: {strict: false}})
export class BillingDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @belongsTo(() => Billing)
  BillingId?: string;

  @belongsTo(() => Product)
  ProductId?: string;
  
  @property({
    type: 'string',
  })
  TransactionDetailId?: string;

  @property({
    type: 'number',
  })
  Amount?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<BillingDetail>) {
    super(data);
  }
}

export interface BillingDetailRelations {
  // describe navigational properties here
}

export type BillingDetailWithRelations = BillingDetail & BillingDetailRelations;
