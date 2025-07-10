import type { BrandsData } from '../types/Brand'

export default {
  getProducts: (id: string, { data, embedded: { products } }: BrandsData) => {
    const brand = data.find(b => b.id === id)
    const productIds = brand?.products ?? []
    const consolidatedProductIds = brand?.consolidated_products ?? []

    return products.filter(p => [...productIds, ...consolidatedProductIds].includes(p.id))
  }
}
