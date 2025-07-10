import { Type as T, type Static } from '@sinclair/typebox'

const DEFAULT_LIMIT = '10'
const DEFAULT_PAGE = '1'

export const Pagination = T.Object({
  limit: T.Optional(T.String({ default: DEFAULT_LIMIT })),
  page: T.Optional(T.String({ default: DEFAULT_PAGE }))
})

export const PaginationResponse = T.Object({
  page: T.Number({ default: DEFAULT_PAGE }),
  limit: T.Number({ default: DEFAULT_LIMIT }),
  count: T.Number(),
})

export type PaginatedData<T> = {
  data: T[]
  pagination: Static<typeof PaginationResponse>
}

export const paginationOpenApiParameters = [
  {
    name: 'limit',
    description: 'The number of items to return',
    in: 'query',
    required: false,
    schema: T.String({ default: DEFAULT_LIMIT })
  },
  {
    name: 'page',
    description: 'The page number to return',
    in: 'query',
    required: false,
    schema: T.String({ default: DEFAULT_PAGE })
  },
]
