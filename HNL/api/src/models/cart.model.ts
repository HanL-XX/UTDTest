import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import { Customer } from './customer.model';
import { CartDetail } from './cart-detail.model';

enum StatusCartEnum {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

@model({settings: {strict: false}})
export class Cart extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @belongsTo(() => Customer)
  CustomerId?: string;

  @hasMany(() => CartDetail)
  CartDetails: CartDetail[];
  
  @property({
    type: 'number',
  })
  Amount?: number;

  @property({
    type: 'number',
    enum: Object.values(StatusCartEnum),
  })
  StatusCart?: StatusCartEnum;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
