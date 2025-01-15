import { ObjectField } from '@measured/puck'
import ClientMultiLangField from './client'
import { useRoutingCtx } from '../routing-ctx/server'
import { getCtx } from '../routing-ctx/client'

export interface IMultilangField<T> {
  [locale: string]: T
}

export function MultilangField<T>({ 
  field,
  children,
}: { 
  field: IMultilangField<T>,
  children?: (locale?: T) => React.ReactNode,
}) {
  const ctxFromServer = useRoutingCtx()
  if (ctxFromServer) { // if we are on view mode (server side)
    if (children) {
      return children(field[ctxFromServer.locale])
    } else {
      return field[ctxFromServer.locale]
    }
  } else { // if we are on edit mode (client side)
    return (
      <ClientMultiLangField field={field}>
        {children}
      </ClientMultiLangField>
    )
  }  
}

export function multilangFieldConfig(field: unknown) {
  const { locale } = getCtx()
  const multilangField: ObjectField = {
    type: 'object',
    label: (field as { label?: string }).label,
    objectFields: {
      [locale]: { 
        ...(field as ObjectField),
        label: ' '
      }
    }
  }
  return multilangField
}