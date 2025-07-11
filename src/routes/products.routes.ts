import { tbValidator } from '@hono/typebox-validator'
import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { Type } from '@sinclair/typebox'

import { GetProductStoresOpenApi } from '../schema/products.schema'

import paginationMiddleware from '../middleware/pagination.middleware'
import controller from '../middleware/resolve.middleware'

import ProductController from '../controllers/product.controller'

import { Pagination } from '../types/api/Pagination'

const app = new Hono()

app.get(
  '/:id/stores',
  describeRoute(GetProductStoresOpenApi),
  paginationMiddleware,
  tbValidator('query', Pagination),
  tbValidator('param', Type.Object({ id: Type.String() })),
  controller(ProductController, 'getStores')
)

export default app
