import type { Data, Field, Fields } from "@measured/puck"
import { allLocales } from "../locale"
import { IPage } from "../data/pages"

export function createField(field: string | Field | { type: string }) {
  if (typeof field === 'string') {
    if (field === 'fullPath') {
      return { type: 'text', readOnly: true }
    } else if (field === 'locale') {
      return { 
        type: 'select',
        options: allLocales.map((locale) => ({ 
          label: locale.toUpperCase(),
          value: locale
        }))
      }
    } else {
      field = { type: field }
    }
  }
  if (field.type === 'hidden') {
    return { 
      ...field,
      type: 'custom', 
      render: () => <></>
    }
  } else {
    return { ...field, type: field.type || 'text' }
  }
}

export function fieldsBasedOnRootData(data: Data) {
  const props = data.root?.props || {}
  const fields = (data.root as { fields?: Fields })?.fields || {}
  const fieldNames = Object.keys(props).concat(Object.keys(fields))
    .filter((fieldName, index, array) => array.indexOf(fieldName) === index)
  return fieldNames.reduce((result, fieldName) => ({
    ...result,
    [fieldName]: createField(
      fields?.[fieldName] || fieldName 
    )
  }), {})
}

export function ignoreDynamicPropValues(originalData: IPage, newData: IPage) {
  return Object.keys(newData.root.props || {}).filter((propName) => 
    (originalData.root?.fields as Record<string, { dynamic?: boolean }>)?.[propName]?.dynamic !== true
  ).reduce((result, propName) => ({
    ...result,
    [propName]: newData.root.props?.[propName]
  }), {})
}