import {Entity, model, property, hasMany } from '@loopback/repository';
import { Product } from './product.model';

@model({settings: {strict: false}})
export class Agency extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id: string;

  @property({
    type: 'string',
  })
  Name?: string;

  @property({
    type: 'string',
  })
  Address?: string;

  @property({
    type: 'string',
  })
  Email?: string;

  @property({
    type: 'string',
  })
  PhoneNumber?: string;

  @property({
    type: 'string',
  })
  Gender?: string;

  @hasMany(() => Product)
  Products: Product[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Agency>) {
    super(data);
  }
}

export interface AgencyRelations {
  // describe navigational properties here
}

export type AgencyWithRelations = Agency & AgencyRelations;
