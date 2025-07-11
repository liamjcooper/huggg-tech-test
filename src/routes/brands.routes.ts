import { tbValidator } from '@hono/typebox-validator'
import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { Type } from '@sinclair/typebox'

import { GetBrandProductsOpenApi } from '../schema/brands.schema'

import paginationMiddleware from '../middleware/pagination.middleware'
import controller from '../middleware/resolve.middleware'

import { Pagination } from '../types/api/Pagination'

import BrandController from '../controllers/brand.controller'

const app = new Hono()

app.get(
  '/:id/products',
  describeRoute(GetBrandProductsOpenApi),
  paginationMiddleware,
  tbValidator('query', Pagination),
  tbValidator('param', Type.Object({ id: Type.String() })),
  controller(BrandController, 'getProducts')
)

export default app
