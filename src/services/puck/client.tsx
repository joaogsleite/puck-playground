'use client'
import { usePuck } from "@measured/puck"

export function usePuckPageCtx() {
  const { appState, dispatch } = usePuck()
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