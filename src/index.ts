import 'reflect-metadata'

import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from '@sinclair/typebox'
import { tsyringe } from '@hono/tsyringe'

import loadJsonData from './data/load'

import config from '../config/config'

import type { BrandsData } from './types/Brand'

import brandsRouter from './routes/brands.routes'
import productsRouter from './routes/products.routes'

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

app.route('/brands', brandsRouter)
app.route('/products', productsRouter)

export { app }

export default {
  port: config.port,
  fetch: app.fetch,
}
