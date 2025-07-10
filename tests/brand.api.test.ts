import { describe, test, expect } from 'bun:test'

import config from '../config/config'

import brandService from '../src/services/brand.service'
import loadData from '../src/data/load'
import type { Product } from '../src/types/Product'

const baseUrl = `http://localhost:${config.port}`

const get = async (endpoint: string) => {
  return fetch(`${baseUrl}${endpoint}`)
}

describe('Brands API', async () => {
  const brandsData = await loadData()

  test('should return 404 for a non-existent brand', async () => {
    const response = await get('/brands/non-existent/products')

    expect(response.status).toBe(404)
  })

  test('should return all products for a brand', async () => {
    const id = '5a4e6d14-53d4-4583-bd6b-49f81b021d24'
    const products = brandService.getProducts(id, brandsData)

    const response = await get(`/brands/${id}/products`)
    const data = await response.json() as { products: Product[] }

    expect(data.products).toEqual(products)
    expect(response.status).toBe(200)
  })
})
