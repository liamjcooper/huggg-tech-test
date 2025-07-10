import { describe, test, expect } from 'bun:test'

import config from '../config/config'

import productService from '../src/services/product.service'
import loadData from '../src/data/load'
import type { Store } from '../src/types/Store'

const baseUrl = `http://localhost:${config.port}`

const get = async (endpoint: string) => {
  return fetch(`${baseUrl}${endpoint}`)
}

describe('Products API', async () => {
  const brandsData = await loadData()

  test('should return 404 for a non-existent product', async () => {
    const response = await get('/products/non-existent/stores')
    expect(response.status).toBe(404)
  })

  test('should return all stores for a product', async () => {
    const id = 'f5c72f41-972d-42b6-9ac5-51bad2afd01f'
    const stores = productService.getStores(id, brandsData)

    const response = await get(`/products/${id}/stores`)
    const data = await response.json() as { stores: Store[] }

    expect(data.stores).toEqual(stores)
    expect(response.status).toBe(200)
  })
})
