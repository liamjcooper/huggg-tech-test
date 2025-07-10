import { Type } from '@sinclair/typebox'

export const notFoundOpenApiResponse = {
  'application/json': {
    schema: Type.Object({
      error: Type.String({ example: 'Not found' }),
    }),
  },
}
