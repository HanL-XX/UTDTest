import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TransactionDetail} from '../models';
import {TransactionDetailRepository} from '../repositories';

export class TransactionDetailController {
  constructor(
    @repository(TransactionDetailRepository)
    public transactionDetailRepository : TransactionDetailRepository,
  ) {}

  @post('/transaction-details')
  @response(200, {
    description: 'TransactionDetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(TransactionDetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionDetail, {
            title: 'NewTransactionDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    transactionDetail: Omit<TransactionDetail, 'id'>,
  ): Promise<TransactionDetail> {
    return this.transactionDetailRepository.create(transactionDetail);
  }

  @get('/transaction-details/count')
  @response(200, {
    description: 'TransactionDetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TransactionDetail) where?: Where<TransactionDetail>,
  ): Promise<Count> {
    return this.transactionDetailRepository.count(where);
  }

  @get('/transaction-details')
  @response(200, {
    description: 'Array of TransactionDetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TransactionDetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TransactionDetail) filter?: Filter<TransactionDetail>,
  ): Promise<TransactionDetail[]> {
    return this.transactionDetailRepository.find(filter);
  }

  @patch('/transaction-details')
  @response(200, {
    description: 'TransactionDetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionDetail, {partial: true}),
        },
      },
    })
    transactionDetail: TransactionDetail,
    @param.where(TransactionDetail) where?: Where<TransactionDetail>,
  ): Promise<Count> {
    return this.transactionDetailRepository.updateAll(transactionDetail, where);
  }

  @get('/transaction-details/{id}')
  @response(200, {
    description: 'TransactionDetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TransactionDetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TransactionDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<TransactionDetail>
  ): Promise<TransactionDetail> {
    return this.transactionDetailRepository.findById(id, filter);
  }

  @patch('/transaction-details/{id}')
  @response(204, {
    description: 'TransactionDetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TransactionDetail, {partial: true}),
        },
      },
    })
    transactionDetail: TransactionDetail,
  ): Promise<void> {
    await this.transactionDetailRepository.updateById(id, transactionDetail);
  }

  @put('/transaction-details/{id}')
  @response(204, {
    description: 'TransactionDetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() transactionDetail: TransactionDetail,
  ): Promise<void> {
    await this.transactionDetailRepository.replaceById(id, transactionDetail);
  }

  @del('/transaction-details/{id}')
  @response(204, {
    description: 'TransactionDetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.transactionDetailRepository.deleteById(id);
  }
}
