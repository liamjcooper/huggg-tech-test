import { Hono } from 'hono'

import brandService from './services/brand.service'
import productService from './services/product.service'

import loadData from './data/load'
import config from '../config/config'

console.info('Starting server...')

console.info('Loading brands, products and stores into memory...')
const data = await loadData()

const app = new Hono()

app.get('/brands/:id/products', c => {
  const { id } = c.req.param()

  if (!data.data.find(b => b.id === id)) {
    return c.notFound()
  }

  return c.json({ products: brandService.getProducts(id, data) })
})

app.get('/products/:id/stores', c => {
  const { id } = c.req.param()

  if (!data.embedded.products.find(p => p.id === id)) {
    return Response.json({ error: 'Product not found' }, { status: 404 })
  }

  return Response.json({ stores: productService.getStores(id, data) })
})

export default {
  port: config.port,
  fetch: app.fetch,
}
