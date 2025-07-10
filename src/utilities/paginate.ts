import type { Static } from '@sinclair/typebox'

import type { Pagination, PaginationResponse } from '../types/api/Pagination'

export default <T>(
  data: any[],
  pagination: Static<typeof Pagination>
): { data: T[]; pagination: Static<typeof PaginationResponse> } => {
  if (!pagination.page || !pagination.limit) {
    return {
      data,
      pagination: {
        page: 1,
        limit: Number(pagination.limit),
        count: data.length,
      },
    }
  }

  const start = (Number(pagination.page) - 1) * Number(pagination.limit)
  const end = start + Number(pagination.limit)

  return {
    data: data.slice(start, end),
    pagination: {
      page: Number(pagination.page),
      limit: Number(pagination.limit),
      count: data.length,
    },
  }
}
