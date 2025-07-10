import { Type } from '@sinclair/typebox'

import { PaginationResponse } from './api/Pagination'

export const Store = Type.Object({
  id: Type.String(),
  brand_id: Type.String(),
  latitiude: Type.String(),
  longitude: Type.String(),
  website: Type.Union([Type.String(), Type.Null()]),
  name: Type.String(),
  description: Type.String(),
  visible: Type.Number(),
  description_markdown: Type.String(),
  image: Type.String(),
  image_url: Type.String(),
})

export const StoreResponse = Type.Object({
  stores: Type.Array(Store),
  pagination: PaginationResponse
})
