'use client'
import { usePuckPageCtx } from '@/services/puck'
import { initialCtx, IRoutingCtx } from '@/services/routing'

let ctxValue = initialCtx

export function useRoutingCtx(): [IRoutingCtx, (v: Partial<IRoutingCtx>) => void]  {
  const [ctx, setCtx] = usePuckPageCtx()
  return [ctx as IRoutingCtx, setCtx]
}

export function getCtx() {
  return ctxValue
}
export function setCtx(value: Record<string, unknown>) {
  ctxValue = value as IRoutingCtx
}
