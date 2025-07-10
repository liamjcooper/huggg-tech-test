import type { Context } from 'hono'

import { type InjectionToken } from 'tsyringe'

export default (controller: InjectionToken, method: string) => {
  return (c: Context) => {
    const instance = c.get('resolve')(controller)

    if (!instance[method]) {
      throw new Error(`Method ${method} not found on ${String(controller)}`)
    }

    return instance[method](c)
  }
}
