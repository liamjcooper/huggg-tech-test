import { createMiddleware } from 'hono/factory'

export default createMiddleware(async (c, next) => {
  const { limit, page } = c.req.query()

  if ((!!limit && isNaN(Number(limit))) || (!!page && isNaN(Number(page)))) {
    return c.json({ error: 'Invalid limit or page' }, 400)
  }

  await next()
})
