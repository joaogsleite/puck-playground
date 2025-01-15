'use client'
import { usePuckPageCtx } from '@/services/puck'
import { initialCtx, IRoutingCtx } from '@/services/routing'

let ctxValue = initialCtx

export function useRoutingCtx()  {
  const [ctx] = usePuckPageCtx()
  ctxValue = ctx as IRoutingCtx
  return ctx as IRoutingCtx
}

export function getCtx() {
  return ctxValue
}
export function setCtx(value: Record<string, unknown>) {
  ctxValue = value as IRoutingCtx
}
