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
  return {
    ...defaultConfig,
    root: {
      ...defaultConfig.root,
      fields: {
        ...(defaultConfig.root?.fields || {}),
        ...fieldsBasedOnRootData(data)
      },
    }
  }
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
      readOnly: {
        ...originalData.root.readOnly,
        ...newData.root.readOnly
      }
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
