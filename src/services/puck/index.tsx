import type { Config, Data, Fields } from '@measured/puck'
import { blocks, IBlocks } from '@/blocks'

const config: Config<IBlocks> = {
  components: blocks,
  root: {
    fields: {}
  }
}

function fieldsBasedOnRootData(data: Data) {
  const props = data.root?.props || {}
  const fields = (data.root as { fields?: Fields })?.fields || {}
  const fieldNames = Object.keys(props).concat(Object.keys(fields))
    .filter((fieldName, index, array) => array.indexOf(fieldName) === index)
  return fieldNames.reduce((result, fieldName) => ({
    ...result,
    [fieldName]: fields?.[fieldName] || { type: 'text' }
  }), {})
}

export function getConfig(data: Data) {
  return {
    ...config,
    root: {
      ...config.root,
      fields: {
        ...(config.root?.fields || {}),
        ...fieldsBasedOnRootData(data)
      }
    }
  }
}

export { usePuckPageCtx } from './client'
