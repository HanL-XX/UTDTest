import {Entity, model, property} from '@loopback/repository';

enum Role {
  Admin = 1,
  Customer = 2,
  Agency = 3,
}

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  UserName: string;

  @property({
    type: 'string',
    required: true,
  })
  PassWord: string;

  @property({
    type: 'number',
    enum: Object.values(Role),
  })
  Role: Role;

  @property({
    type: 'string',
    required: false,
  })
  UserId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
