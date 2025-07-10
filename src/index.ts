import 'reflect-metadata'

import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from '@sinclair/typebox'
import { tsyringe } from '@hono/tsyringe'

import loadJsonData from './data/load'

import config from '../config/config'

import type { BrandsData } from './types/Brand'
import { Pagination } from './types/api/Pagination'

import paginationMiddleware from './middleware/pagination.middleware'
import controller from './middleware/resolve.middleware'

import { GetBrandProductsOpenApi } from './schema/brands.schema'
import { GetProductStoresOpenApi } from './schema/products.schema'

import BrandController from './controllers/brand.controller'
import ProductController from './controllers/product.controller'

console.info('Starting server...')

console.info('Loading brands, products and stores into memory...')
console.time('loadData Time')
let data: BrandsData
try {
  data = await loadJsonData<BrandsData>('brands.json')
} catch (error) {
  console.error('Error loading data:', error)
  process.exit(1)
}
console.timeEnd('loadData Time')

const app = new Hono()

app.use('*', tsyringe((container) => {
  container.register('brands', { useValue: data })
}))

app.notFound((c) => c.json({ error: 'Not found' }, 404))

app.get(
  '/brands/:id/products',
  describeRoute(GetBrandProductsOpenApi),
  paginationMiddleware,
  tbValidator('query', Pagination),
  tbValidator('param', Type.Object({ id: Type.String() })),
  controller(BrandController, 'getProducts')
)

app.get(
  '/products/:id/stores',
  describeRoute(GetProductStoresOpenApi),
  paginationMiddleware,
  tbValidator('query', Pagination),
  tbValidator('param', Type.Object({ id: Type.String() })),
  controller(ProductController, 'getStores')
)

export { app }

export default {
  port: config.port,
  fetch: app.fetch,
}
