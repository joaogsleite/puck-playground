'use client'
import { defaultLocale } from '@/services/locale'
import { createContext, useContext, useState } from 'react'

let currentLocale = defaultLocale

export function getLocale() {
  return currentLocale
}

type LocaleCtx = [string, (locale: string) => void]

const Ctx = createContext([defaultLocale, null as unknown] as LocaleCtx)

export function useLocale() {
  return useContext(Ctx)
}

export default function LocaleProvider({ 
  children
}: { 
  children: (locale: string) => React.ReactNode 
}) {
  const [locale, setState] = useState(defaultLocale)
  const setLocale = (locale: string) => {
    setState(locale)
    currentLocale = locale
  }
  return <Ctx.Provider value={[locale, setLocale]}>
    {children(locale)}
  </Ctx.Provider>
}