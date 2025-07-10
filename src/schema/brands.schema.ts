import { Type } from '@sinclair/typebox'
import { resolver } from 'hono-openapi/typebox'

import { paginationOpenApiParameters } from '../types/api/Pagination'
import { ProductResponse } from '../types/Product'

import { notFoundOpenApiResponse } from './404.schema'

export const GetBrandProductsOpenApi = {
  description: 'Get products for a brand',
  parameters: [
    {
      name: 'id',
      description: 'The ID of the brand',
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
          schema: resolver(ProductResponse)
        }
      }
    },
    404: {
      description: 'Brand not found',
      content: notFoundOpenApiResponse
    }
  }
}
