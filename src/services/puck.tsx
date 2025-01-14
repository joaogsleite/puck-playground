import * as Puck from '@measured/puck'
import type { Config, Data } from '@measured/puck'
import { blocks, IBlocks } from '@/blocks'

const config: Config<IBlocks> = {
  components: blocks,
  root: {
    fields: {}
  }
}

export function usePuckPageCtx() {
  const { appState } = Puck.usePuck()
  return appState.data.root.props || {}
}

function fieldsBasedOnRoorProps(data: Data) {
  return Object.keys(
    data.root.props || {}
  ).reduce((result, fieldKey) => ({
    ...result,
    [fieldKey]: { type: 'text' }
  }), {})
}

export function getConfig(data: Data) {
  return {
    ...config,
    root: {
      ...config.root,
      fields: {
        ...(config.root?.fields || {}),
        ...fieldsBasedOnRoorProps(data)
      }
    }
  }
}

export default config
