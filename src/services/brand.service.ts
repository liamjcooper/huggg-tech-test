import type { Static } from '@sinclair/typebox'
import type { BunSQLDatabase } from 'drizzle-orm/bun-sql'
import { inject, injectable } from 'tsyringe'
import { count, eq, getTableColumns } from 'drizzle-orm'

import type { Product } from '../types/Product'
import type { PaginatedData, Pagination } from '../types/api/Pagination'

import { ERROR_CODES } from '../static/codes'
import { brandsTable, productsTable } from '../database/schema'

@injectable()
export default class BrandService {
  constructor (@inject('db') private readonly db: BunSQLDatabase) {}

  async getProducts (
    id: string,
    pagination: Static<typeof Pagination>
  ): Promise<PaginatedData<Static<typeof Product>>> {
    const page = Number(pagination.page) ?? 1
    const limit = Number(pagination.limit) ?? 10

    const brand = await this.db
      .select()
      .from(brandsTable)
      .where(eq(brandsTable.id, id))
      .limit(1)

    if (!brand[0]) {
      throw new Error(ERROR_CODES.NOT_FOUND)
    }

    // TODO: this would need to be changed to join with the brands_to_products table
    const products = await this.db
      .select({
        ...getTableColumns(productsTable),
        total_count: count(),
      })
      .from(productsTable)
      .where(eq(productsTable.brand_id, id))
      .limit(limit)
      .offset((page - 1) * limit)
      .groupBy(productsTable.id)

    return {
      data: products,
      pagination: {
        count: products[0]?.total_count ?? 0,
        page,
        limit,
      },
    }
  }
}
