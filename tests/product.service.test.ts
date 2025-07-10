import { describe, test, expect } from 'bun:test'

import data from './fixtures/brands.fixture'
import ProductService from '../src/services/product.service'

describe('Product Service', async () => {
  const productService = new ProductService(data)

  test('should return all stores for a product', async () => {
    if (!data.embedded.products[0] || !data.embedded.products[0]) {
      throw new Error('No product data found')
    }

    const stores = productService.getStores(data.embedded.products[0].id, { limit: '10', page: '1' })
    const brands = data.data.filter(b => b.products.includes(data.embedded.products[0]!.id))
    const relatedStores = data.embedded.stores.filter(s => brands.some(b => b.stores.includes(s.id)))

    expect(stores.data).toBeArray()
    expect(stores.data.length).toBe(relatedStores.length)
    expect(stores.data).toEqual(relatedStores)
  })
})
