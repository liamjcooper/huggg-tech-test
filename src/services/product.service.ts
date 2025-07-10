import type { Static } from '@sinclair/typebox'
import { injectable, inject } from 'tsyringe'

import type { BrandsData } from '../types/Brand'
import type { Store } from '../types/Store'
import type { Pagination } from '../types/api/Pagination'

import paginate from '../utilities/paginate'

import { ERROR_CODES } from '../static/codes'

@injectable()
export default class ProductService {
  constructor (@inject('brands') private readonly brands: BrandsData) {}

  getStores (id: string, pagination: Static<typeof Pagination>) {
    const {
      data,
      embedded: { stores, products },
    } = this.brands

    if (!products.find((p) => p.id === id)) {
      throw new Error(ERROR_CODES.NOT_FOUND)
    }

    const relatedBrands = data.filter((b) =>
      [...new Set(b.products)].includes(id)
    )
    const relatedStoreIds = [
      ...new Set(relatedBrands.flatMap((b) => [...new Set(b.stores)])),
    ]

    return paginate<Static<typeof Store>>(
      stores.filter((s) => relatedStoreIds.includes(s.id)),
      pagination
    )
  }
}
