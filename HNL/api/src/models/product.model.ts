import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import { Agency } from './agency.model';
import { CartDetail } from './cart-detail.model';
import { TransactionDetail } from './transaction-detail.model';
import { BillingDetail } from './billing-detail.model';

@model({settings: {strict: false}})
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
  })
  Name?: string;

  @belongsTo(() => Agency)
  AgencyId?: string;

  @hasMany(() => CartDetail)
  CartDetails: CartDetail[];

  @hasMany(() => TransactionDetail)
  TransactionDetails: TransactionDetail[];

  @hasMany(() => BillingDetail)
  BillingDetails: BillingDetail[];
  
  @property({
    type: 'string',
  })
  Description?: string;

  @property({
    type: 'number',
  })
  Price?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
