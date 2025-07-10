import type { Static } from '@sinclair/typebox'

import type { Product } from './Product'
import type { Store } from './Store'

export interface Brand {
  id: string
  created_at: string
  updated_at: string
  name: string
  internal_name: string
  logo: string
  colour: string
  success: string
  share: string
  weight: number
  deleted_at: string | null
  expiry: number
  website: string | null
  integration_id: number
  user_id: string
  email: string | null
  vat: number
  faq: string | null
  description: string
  redeem: string | null
  location_text: string
  map_pin_url: string
  consolidated: number
  default_location_description_markdown: string
  products: string[]
  consolidated_products: string[]
  stores: string[]
  logo_url: string
}

export interface BrandsData {
  current_page: number
  data: Brand[]
  from: number
  last_page: number
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
  embedded: {
    products: Static<typeof Product>[]
    stores: Static<typeof Store>[]
  }
}
