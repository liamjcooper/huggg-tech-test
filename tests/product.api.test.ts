import { describe, test, expect } from 'bun:test'
import type { Static } from '@sinclair/typebox'

import config from '../config/config'

import loadJsonData from '../src/data/load'
import ProductService from '../src/services/product.service'

import type { StoreResponse } from '../src/types/Store'
import type { BrandsData } from '../src/types/Brand'

const baseUrl = `http://localhost:${config.port}`

const get = async (endpoint: string) => {
  return fetch(`${baseUrl}${endpoint}`)
}

describe('Products API', async () => {
  const brandsData = await loadJsonData<BrandsData>('brands.json')
  const productService = new ProductService(brandsData)

  test('should return 404 for a non-existent product', async () => {
    const response = await get('/products/non-existent/stores')
    expect(response.status).toBe(404)
  })

  test('should return all stores for a product', async () => {
    const id = 'f5c72f41-972d-42b6-9ac5-51bad2afd01f'
    const stores = productService.getStores(id, { limit: '10', page: '1' })

    const response = await get(`/products/${id}/stores?page=1&limit=10`)
    expect(response.status).toBe(200)

    const data = (await response.json()) as Static<typeof StoreResponse>
    expect(data.stores).toEqual(stores.data)
    expect(data.pagination).toEqual(stores.pagination)
  })
})
