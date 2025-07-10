import { describe, test, expect } from 'bun:test'

import brandService from '../src/services/brand.service'
import data from './fixtures/brands.fixture'
import type { Product } from '../src/types/Product'

describe('Brand Service', async () => {
  test('should return all products for a brand', async () => {
    if (!data.data?.[0]) {
      throw new Error('No brand data found')
    }

    const products = brandService.getProducts(data.data[0].id, data)

    const product1 = data.embedded.products.find(p => p.id === data.data[0]?.products[0])!
    const product2 = data.embedded.products.find(p => p.id === data.data[0]?.consolidated_products[0])!

    expect(products).toBeArray()
    expect(products.length).toBe(data.data[0].products.length + data.data[0].consolidated_products.length)
    expect(products).toEqual([product1, product2])
  })
})
