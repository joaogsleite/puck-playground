import { isServer, useHybrid } from '@/helpers'
import * as server from './server'

export function getProduct(id?: number) {
  if (!id) return Promise.resolve()
  if (isServer()) return server.getProduct(id)
  else return fetch(`/api/products/${id}`).then((res) => res.json())
}

export function useProduct(id?: number) {
  return useHybrid(getProduct, id)
}