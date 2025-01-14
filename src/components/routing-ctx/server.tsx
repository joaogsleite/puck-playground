import { initialCtx, IRoutingCtx } from '@/services/routing'
import { cache } from 'react'

const serverContext = cache(() => new Map())
const KEY = 'routingCtx'

export function setRoutingCtx(newValue: IRoutingCtx) {
  const global = serverContext()
  const currentValue = global.get(KEY) || initialCtx
  global.set(KEY, { ...currentValue, ...newValue })
}

export function useRoutingCtx() {
  const global = serverContext()
  return global.get(KEY)
}