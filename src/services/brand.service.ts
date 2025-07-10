import type { Static } from '@sinclair/typebox'
import { inject, injectable } from 'tsyringe'

import type { BrandsData } from '../types/Brand'
import type { Product } from '../types/Product'
import type { Pagination } from '../types/api/Pagination'

import paginate from '../utilities/paginate'

import { ERROR_CODES } from '../static/codes'

@injectable()
export default class BrandService {
  constructor (@inject('brands') private readonly brands: BrandsData) {}

  getProducts (id: string, pagination: Static<typeof Pagination>) {
    const {
      data,
      embedded: { products },
    } = this.brands

    if (!data.find((p) => p.id === id)) {
      throw new Error(ERROR_CODES.NOT_FOUND)
    }

    const brand = data.find((b) => b.id === id)
    const productIds = brand?.products ?? []
    const consolidatedProductIds = brand?.consolidated_products ?? []

    const filteredProducts = products.filter((p) =>
      [...productIds, ...consolidatedProductIds].includes(p.id)
    )

    return paginate<Static<typeof Product>>(filteredProducts, pagination)
  }
}
