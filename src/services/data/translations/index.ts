import { isServer, useHybrid } from '@/helpers'
import * as server from './server'

export function getTranslations(locale: string) {
  if (isServer()) return server.getTranslations(locale)
  else return fetch(`/api/translations/${locale}`).then((res) => res.json())
}

export function useTranslations(locale: string) {
  return useHybrid(getTranslations, locale) || {}
}