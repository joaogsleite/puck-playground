'use client'

import { usePuckPageCtx } from '@/services/puck'
import { IMultilangField } from '.'

export default function ClientMultiLangField<T>({
  field,
  children,
}: { 
  field: IMultilangField<T>,
  children?: (locale?: T) => React.ReactNode
}) {
  const [ctx] = usePuckPageCtx()
  if (children) {
    return children(field[ctx?.locale as string])
  } else {
    return field[ctx.locale as string]
  }
}