/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'

export function isServer() {
  return typeof window === 'undefined'
}

export function useHybrid<T>(promise: any, args: any) {
  if (isServer()) {
    return React.use(promise(args))
  } else {
    const [data, setData] = React.useState<T>()
    React.useEffect(() => {
      promise(args).then((data: any) => setData(data))
    }, [promise, args])
    return data
  }
}