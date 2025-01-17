'use client'

import { IMultilangField } from '.'
import { useRoutingCtx } from '../routing-ctx'

export default function ClientMultiLangField<T>({
  field,
  children,
}: { 
  field: IMultilangField<T>,
  children?: (locale?: T) => React.ReactNode
}) {
  const ctx = useRoutingCtx()
  if (children) {
    return children(field[ctx?.locale as string])
  } else {
    return field[ctx?.locale as string]
  }
}