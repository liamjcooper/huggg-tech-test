import { describe, test, expect } from 'bun:test'

import data from './fixtures/brands.fixture'

import BrandService from '../src/services/brand.service'

describe('Brand Service', async () => {
  const brandService = new BrandService(data)

  test('should return all products for a brand', async () => {
    if (!data.data?.[0]) {
      throw new Error('No brand data found')
    }

    const products = brandService.getProducts(data.data[0].id, { limit: '10', page: '1' })

    const product1 = data.embedded.products.find(p => p.id === data.data[0]?.products[0])!
    const product2 = data.embedded.products.find(p => p.id === data.data[0]?.consolidated_products[0])!

    expect(products.data).toBeArray()
    expect(products.data.length).toBe(data.data[0].products.length + data.data[0].consolidated_products.length)
    expect(products.data).toEqual([product1, product2])
  })
})
