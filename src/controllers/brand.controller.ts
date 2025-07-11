import type { Context } from 'hono'
import { injectable } from 'tsyringe'
import type { Static } from '@sinclair/typebox'

import BrandService from '../services/brand.service'

import { ERROR_CODES } from '../static/codes'

import type { PaginatedData } from '../types/api/Pagination'

import type { Product } from '../types/Product'

@injectable()
export default class BrandController {
  constructor (private readonly brandService: BrandService) {}

  async getProducts (c: Context) {
    const { id } = c.req.param()
    const { limit = '10', page = '1' } = c.req.query()

    console.log(`Getting products for brand: ${id}`)

    let products: PaginatedData<Static<typeof Product>>

    try {
      products = await this.brandService.getProducts(id!, { limit, page })
      console.log(products)
    } catch (error) {
      console.error(`Error getting products for brand: ${id}`, error)

      if (error instanceof Error && error.message === ERROR_CODES.NOT_FOUND) {
        return c.notFound()
      } else {
        return c.json({ error: 'Internal server error' }, 500)
      }
    }

    console.log(`Found ${products.products.length} products for brand: ${id}`)

    return c.json({ products })
  }
}
