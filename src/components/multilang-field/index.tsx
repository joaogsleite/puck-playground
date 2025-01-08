import { ObjectField } from '@measured/puck'
import ClientMultiLangField from './client'
import { getLocale } from '../locale-ctx/client'
import { useLocale } from '../locale-ctx/server'

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
  const localeFromServer = useLocale()
  if (localeFromServer) { // if we are on view mode (server side)
    if (children) {
      return children(field[localeFromServer])
    } else {
      return field[localeFromServer]
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
  const currentLocale = getLocale()
  const multilangField: ObjectField = {
    type: 'object',
    label: (field as { label?: string }).label,
    objectFields: {
      [currentLocale]: { 
        ...(field as ObjectField),
        label: ' '
      }
    }
  }
  return multilangField
}