import { describe, test, expect } from 'bun:test'
import type { Static } from '@sinclair/typebox'

import config from '../config/config'

import loadJsonData from '../src/data/load'
import BrandService from '../src/services/brand.service'

import type { BrandsData } from '../src/types/Brand'
import type { ProductResponse } from '../src/types/Product'

const baseUrl = `http://localhost:${config.port}`

const get = async (endpoint: string) => {
  return fetch(`${baseUrl}${endpoint}`)
}

describe('Brands API', async () => {
  const brandsData = await loadJsonData<BrandsData>('brands.json')

  test('should return 404 for a non-existent brand', async () => {
    const response = await get('/brands/non-existent/products')

    expect(response.status).toBe(404)
  })

  test('should return all products for a brand', async () => {
    const id = brandsData.data[0]?.id

    if (!id) {
      throw new Error('No brand data found')
    }

    const products = new BrandService(brandsData).getProducts(id, {
      limit: '10',
      page: '1',
    })

    const response = await get(`/brands/${id}/products?page=1&limit=10`)
    expect(response.status).toBe(200)

    const data = (await response.json()) as Static<typeof ProductResponse>
    expect(data.products).toEqual(products.data)
    expect(data.pagination).toEqual(products.pagination)
  })
})
