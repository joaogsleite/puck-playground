import { isServer, useHybrid } from '@/helpers'
import * as server from './server'

export function getProduct(id?: string) {
  if (!id) return Promise.resolve()
  if (isServer()) return server.getProduct(id)
  else return fetch(`/api/products/${id}`).then((res) => res.json())
}

export function useProduct(id?: string) {
  return useHybrid(getProduct, id)
}