'use client'

import { IMultilangField } from '.'
import { useLocale } from '../locale-ctx/client'

export default function ClientMultiLangField<T>({
  field,
  children,
}: { 
  field: IMultilangField<T>,
  children?: (locale?: T) => React.ReactNode
}) {
  const [locale] = useLocale()
  if (children) {
    return children(field[locale])
  } else {
    return field[locale]
  }
}