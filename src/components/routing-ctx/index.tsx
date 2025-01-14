import { isServer } from '@/helpers'
import * as client from './client'
import * as server from './server'

export function useRoutingCtx() {
  if (isServer()) {
    return [server.useRoutingCtx()]
  } else {
    return client.useRoutingCtx()
  }
}