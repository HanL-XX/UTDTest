import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import { TransactionDetail } from './transaction-detail.model';
import { BillingDetail } from './billing-detail.model';

enum StatusBillinglEnum {
  Approved = 1,
  Rejected = 2,
}

@model({settings: {strict: false}})
export class Billing extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @belongsTo(() => TransactionDetail)
  TransactionId?: string;

  @hasMany(() => BillingDetail)
  BillingDetails: BillingDetail[];

  @property({
    type: 'number',
  })
  Amount?: number;

  @property({
    type: 'number',
    enum: Object.values(StatusBillinglEnum),
  })
  PaymentStatus?: StatusBillinglEnum;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Billing>) {
    super(data);
  }
}

export interface BillingRelations {
  // describe navigational properties here
}

export type BillingWithRelations = Billing & BillingRelations;
