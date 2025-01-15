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
  const { appState, dispatch } = Puck.usePuck()
  const data = (appState.data.root.props || {})
  const setData = (values: Record<string, unknown>) => {
    const data = {
      ...appState.data,
      root: {
        ...appState.data.root,
        props: {
          ...appState.data.root.props,
          ...values
        }
      }
    }
    dispatch({ type: "setData", data })
    setTimeout(() => dispatch({ type: "setData", data }))
  }
  return [data, setData] as [Record<string, unknown>, (v: Record<string, unknown>) => void]
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
