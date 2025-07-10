import type { Context } from 'hono'
import { injectable } from 'tsyringe'
import type { Static } from '@sinclair/typebox'

import ProductService from '../services/product.service'

import type { Store } from '../types/Store'

import { ERROR_CODES } from '../static/codes'
import type { PaginatedData } from '../types/api/Pagination'

@injectable()
export default class ProductController {
  constructor (private readonly productService: ProductService) {}

  getStores (c: Context) {
    const { id } = c.req.param()
    const { limit = '10', page = '1' } = c.req.query()

    console.log(`Getting stores for product: ${id}`)

    let stores: PaginatedData<Static<typeof Store>>

    try {
      stores = this.productService.getStores(id!, { limit, page })
    } catch (error) {
      console.error(`Error getting stores for product: ${id}`, error)

      if (error instanceof Error && error.message === ERROR_CODES.NOT_FOUND) {
        return c.notFound()
      } else {
        return c.json({ error: 'Internal server error' }, 500)
      }
    }

    console.log(`Found ${stores.data.length} stores for product: ${id}`)

    return c.json({ stores: stores.data, pagination: stores.pagination })
  }
}
