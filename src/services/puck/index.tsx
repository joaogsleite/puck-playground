import type { Config, Data } from '@measured/puck'
import { blocks, IBlocks } from '@/blocks'
import { IPage } from '../data/pages'
import { fieldsBasedOnRootData, ignoreDynamicPropValues } from './fields'

const defaultConfig: Config<IBlocks> = {
  components: blocks,
  root: {
    fields: {},
  }
}

export function getConfig(data: Data) {
  const config: Config<IBlocks> = {
    ...defaultConfig,
    root: {
      ...defaultConfig.root,
      fields: {
        ...(defaultConfig.root?.fields || {}),
        ...fieldsBasedOnRootData(data)
      },
    }
  }
  config.root!.resolveData = () => ({
    readOnly: {
      ...Object.keys(config.root?.fields || {}).reduce((result, fieldName)=>({
        ...result,
        [fieldName]: !!(config.root?.fields?.[fieldName] as { readOnly?: boolean })?.readOnly
      }), {})
    }
  })
  return config
}

export async function savePage(path: string, originalData: IPage, newData: IPage) {
  const data: Data = {
    ...originalData,
    ...newData,
    root: {
      ...originalData.root,
      ...newData.root,
      props: {
        ...originalData.root.props,
        ...ignoreDynamicPropValues(originalData, newData),
      },
      readOnly: undefined,
    },
    content: [
      ...newData.content
    ],
    zones: {
      ...originalData.zones,
      ...newData.zones
    }
  }
  await fetch('/api/pages', {
    method: 'post',
    body: JSON.stringify({ data, path }),
  });
}

export { usePuckPageCtx } from './client'
