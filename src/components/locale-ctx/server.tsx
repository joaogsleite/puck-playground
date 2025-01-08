import { cache } from 'react'

const serverContext = cache(() => new Map())

export function setLocale(locale: string) {
  const global = serverContext()
  global.set('locale', locale)
}

export function useLocale() {
  const global = serverContext()
  return global.get('locale')
}
