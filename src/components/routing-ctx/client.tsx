/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { usePuckPageCtx } from '@/services/puck'
import { initialCtx, IRoutingCtx } from '@/services/routing'
import { createContext, useCallback, useContext, useState } from 'react'

const Ctx = createContext(
  [initialCtx, null as unknown] as [IRoutingCtx, (v: Partial<IRoutingCtx>) => void]
)
let ctxValue = initialCtx

export function useRoutingCtx(): [IRoutingCtx, (v: Partial<IRoutingCtx>) => void]  {
  const ctx = useContext(Ctx)
  const puckCtx = usePuckPageCtx()
  return [{ ...ctx[0], ...puckCtx}, ctx[1]]
}

export function getCtx() {
  return ctxValue
}

export default function RoutingProvider({ 
  children,
  value = initialCtx
}: { 
  children: React.ReactNode | ((ctx: IRoutingCtx) => React.ReactNode),
  value?: Partial<IRoutingCtx>
}) {
  const [v, setState] = useState({ ...initialCtx, ...value } as IRoutingCtx)
  const setCtx = useCallback((value: Partial<IRoutingCtx>) => {
    setState((prev) => {
      const newCtx = { ...prev, ...value } as IRoutingCtx
      ctxValue = newCtx
      return newCtx
    })
  }, [])
  return <Ctx.Provider value={[v, setCtx]}>
    {typeof children === 'function' ? children(v) : children }
  </Ctx.Provider>
}