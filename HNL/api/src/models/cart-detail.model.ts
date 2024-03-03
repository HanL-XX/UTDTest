import {Entity, belongsTo, model, property} from '@loopback/repository';
import { Product } from './product.model';
import { Cart } from './cart.model';

enum StatusCartDetailEnum {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

@model({settings: {strict: false}})
export class CartDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @belongsTo(() => Cart)
  CartId?: string;

  @belongsTo(() => Product)
  ProductIds?: string;

  @property({
    type: 'number',
    enum: Object.values(StatusCartDetailEnum),
  })
  StatusDetail?: StatusCartDetailEnum;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CartDetail>) {
    super(data);
  }
}

export interface CartDetailRelations {
  // describe navigational properties here
}

export type CartDetailWithRelations = CartDetail & CartDetailRelations;
