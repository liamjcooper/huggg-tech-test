import type { BrandsData } from '../types/Brand'

export default {
  getStores: (id: string, { data, embedded: { stores } }: BrandsData) => {
    const relatedBrands = data.filter(b => [...new Set(b.products)].includes(id))
    const relatedStoreIds = [...new Set(relatedBrands.flatMap(b => [...new Set(b.stores)]))]

    return stores.filter(s => relatedStoreIds.includes(s.id))
  }
}
