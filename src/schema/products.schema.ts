import { Type } from '@sinclair/typebox'
import { resolver } from 'hono-openapi/typebox'

import { paginationOpenApiParameters } from '../types/api/Pagination'
import { StoreResponse } from '../types/Store'

import { notFoundOpenApiResponse } from './404.schema'

export const GetProductStoresOpenApi = {
  description: 'Get stores for a product',
  parameters: [
    {
      name: 'id',
      description: 'The ID of the product',
      in: 'path',
      required: true,
      schema: Type.String({ format: 'uuid' })
    },
    ...paginationOpenApiParameters
  ],
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: resolver(StoreResponse)
        }
      }
    },
    404: {
      description: 'Product not found',
      content: notFoundOpenApiResponse
    }
  },
}
