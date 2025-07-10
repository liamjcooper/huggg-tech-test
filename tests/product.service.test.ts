import { describe, test, expect } from 'bun:test'

import productService from '../src/services/product.service'
import data from './fixtures/brands.fixture'

describe('Product Service', async () => {
  test('should return all stores for a product', async () => {
    if (!data.embedded.products[0] || !data.embedded.products[0]) {
      throw new Error('No product data found')
    }

    const stores = productService.getStores(data.embedded.products[0].id, data)
    const brands = data.data.filter(b => b.products.includes(data.embedded.products[0]!.id))
    const relatedStores = data.embedded.stores.filter(s => brands.some(b => b.stores.includes(s.id)))

    expect(stores).toBeArray()
    expect(stores.length).toBe(relatedStores.length)
    expect(stores).toEqual(relatedStores)
  })
})
